"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Text3D, Environment } from "@react-three/drei";
import { Suspense } from "react";
import {
  Smartphone,
  Home,
  Car,
  Zap,
  Brain,
  Eye,
  Upload,
  Bell,
  Shield,
  ArrowRight,
  Play,
  Sparkles
} from "lucide-react";
import Button from "@/components/ui/Button";
import { APP_CONFIG } from "@/lib/constants";

// 3D Floating Warranty Items Component
const FloatingWarrantyItems = () => {
  const items = [
    { icon: Smartphone, position: [-3, 2, 0], color: "#0066FF", label: "iPhone" },
    { icon: Home, position: [3, 1, -2], color: "#00FFFF", label: "Appliances" },
    { icon: Car, position: [-2, -1, 2], color: "#6366F1", label: "Tesla" },
    { icon: Zap, position: [2, -2, 1], color: "#EC4899", label: "Electronics" },
  ];

  return (
    <>
      {items.map((item, index) => (
        <Float
          key={index}
          speed={1.5 + index * 0.5}
          rotationIntensity={0.5}
          floatIntensity={0.8}
          position={item.position}
        >
          <mesh>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial 
              color={item.color} 
              transparent 
              opacity={0.8}
              emissive={item.color}
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {/* Glow effect */}
          <mesh position={[0, 0, 0]} scale={1.2}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshBasicMaterial 
              color={item.color} 
              transparent 
              opacity={0.1}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Central AI Brain */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#00FFFF" 
            transparent 
            opacity={0.6}
            emissive="#00FFFF"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* AI Brain Core */}
        <mesh position={[0, 0, 0]} scale={0.7}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial 
            color="#0066FF" 
            transparent 
            opacity={0.8}
            wireframe
          />
        </mesh>
      </Float>
      
      {/* Orbiting Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float
          key={`particle-${i}`}
          speed={3 + i * 0.1}
          rotationIntensity={2}
          floatIntensity={2}
          position={[
            Math.sin(i * 0.5) * 5,
            Math.cos(i * 0.3) * 3,
            Math.sin(i * 0.7) * 4
          ]}
        >
          <mesh scale={0.1}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial 
              color={i % 2 === 0 ? "#00FFFF" : "#0066FF"} 
              transparent 
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

// AI Eye Tracker Component
const AIEyeTracker = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x: x * 20, y: y * 20 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div 
      className="absolute top-20 right-20 w-16 h-16 hidden lg:block"
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <div className="relative w-full h-full">
        {/* Outer eye */}
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-blue to-primary-cyan opacity-20 animate-pulse" />
        
        {/* Inner eye */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-cyan shadow-lg shadow-primary-cyan/50">
          {/* Pupil */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neutral-900" />
        </div>
        
        {/* Scanning lines */}
        <motion.div
          className="absolute inset-0 border-2 border-primary-cyan rounded-full opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

// Typing Text Effect Component
const TypingText = ({ texts, className = "" }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className="inline-block w-0.5 h-6 bg-primary-cyan ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  );
};

// Mini Demo Animation Component
const MiniDemoAnimation = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: Upload, text: "Upload Receipt", color: "text-primary-blue" },
    { icon: Brain, text: "AI Processing", color: "text-primary-cyan" },
    { icon: Bell, text: "Smart Reminders", color: "text-primary-purple" },
    { icon: Shield, text: "Protected", color: "text-accent-green" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-4 p-4 bg-neutral-800/30 backdrop-blur-sm rounded-xl border border-neutral-700/50">
      {steps.map((stepItem, index) => (
        <motion.div
          key={index}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-500 ${
            index === step 
              ? "bg-white/10 scale-110" 
              : "opacity-50"
          }`}
          animate={{
            scale: index === step ? 1.1 : 1,
            opacity: index === step ? 1 : 0.5,
          }}
        >
          <stepItem.icon 
            className={`w-5 h-5 ${stepItem.color}`} 
          />
          <span className="text-sm font-medium text-white">
            {stepItem.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const typingTexts = [
    "Never miss a warranty again",
    "Track all your warranties",
    "AI-powered protection",
    "Smart reminder system"
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 via-transparent to-primary-cyan/10" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-cyan rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* AI Eye Tracker */}
      <AIEyeTracker />

      {/* 3D Scene */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <FloatingWarrantyItems />
            <Environment preset="night" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-blue/20 border border-primary-blue/30 rounded-full text-primary-cyan text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Warranty Management</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="gradient-text">Smart Warranty</span>
                <br />
                <span className="text-white">Management for</span>
                <br />
                <TypingText 
                  texts={typingTexts}
                  className="text-primary-cyan"
                />
              </motion.h1>

              <motion.p
                className="text-xl text-neutral-300 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Upload receipts, track warranties, get smart reminders, and never lose money on expired coverage again. 
                AI-powered protection for all your valuable items.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                href="/demo"
                className="text-lg px-8 py-4"
              >
                Try Live Demo
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                icon={<Play className="w-5 h-5" />}
                href="#video"
                className="text-lg px-8 py-4"
              >
                Watch Video
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {[
                { value: "50K+", label: "Users" },
                { value: "1.2M+", label: "Items Tracked" },
                { value: "$2.5M+", label: "Money Saved" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Demo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Mini Demo Animation */}
            <div className="relative z-10">
              <MiniDemoAnimation />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-primary-blue/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-cyan/20 rounded-full blur-xl animate-pulse" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-primary-cyan rounded-full mt-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
