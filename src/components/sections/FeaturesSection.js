"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Brain,
  Bell,
  Box,
  FileText,
  Mail,
  Wrench,
  Shield,
  Users,
  Upload,
  Scan,
  Calendar,
  Eye,
  ChevronRight,
  Play,
  Pause
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FEATURES } from "@/lib/constants";

// Interactive Feature Demo Component
const FeatureDemo = ({ feature, isActive }) => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoSteps = {
    "ai-extraction": [
      { icon: Upload, text: "Upload Receipt", color: "text-primary-blue" },
      { icon: Scan, text: "AI Scanning", color: "text-primary-cyan" },
      { icon: Brain, text: "Data Extraction", color: "text-primary-purple" },
      { icon: FileText, text: "Warranty Created", color: "text-accent-green" },
    ],
    "smart-reminders": [
      { icon: Calendar, text: "Analyze Dates", color: "text-primary-blue" },
      { icon: Bell, text: "Set Reminders", color: "text-primary-cyan" },
      { icon: Mail, text: "Send Notifications", color: "text-primary-purple" },
      { icon: Shield, text: "Never Miss Again", color: "text-accent-green" },
    ],
    "3d-inventory": [
      { icon: Box, text: "Scan Room", color: "text-primary-blue" },
      { icon: Eye, text: "Detect Items", color: "text-primary-cyan" },
      { icon: Box, text: "3D Placement", color: "text-primary-purple" },
      { icon: Shield, text: "Visual Tracking", color: "text-accent-green" },
    ],
    "claim-assistant": [
      { icon: FileText, text: "Report Issue", color: "text-primary-blue" },
      { icon: Brain, text: "Analyze Claim", color: "text-primary-cyan" },
      { icon: FileText, text: "Generate Forms", color: "text-primary-purple" },
      { icon: Shield, text: "Submit Claim", color: "text-accent-green" },
    ],
  };

  const steps = demoSteps[feature.id] || [];

  const startDemo = () => {
    setIsPlaying(true);
    setStep(0);
    
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <div className="relative">
      {/* Demo Controls */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white">Live Demo</h4>
        <Button
          variant="ghost"
          size="sm"
          icon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          onClick={startDemo}
          disabled={isPlaying}
        >
          {isPlaying ? "Playing" : "Start Demo"}
        </Button>
      </div>

      {/* Demo Steps */}
      <div className="grid grid-cols-2 gap-3">
        {steps.map((stepItem, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-500 ${
              index === step && isPlaying
                ? "bg-white/10 border-primary-cyan scale-105" 
                : index <= step
                ? "bg-white/5 border-neutral-600"
                : "bg-neutral-800/30 border-neutral-700 opacity-50"
            }`}
            animate={{
              scale: index === step && isPlaying ? 1.05 : 1,
              opacity: index <= step ? 1 : 0.5,
            }}
          >
            <div className={`p-2 rounded-full bg-neutral-800 ${
              index === step && isPlaying ? "animate-pulse" : ""
            }`}>
              <stepItem.icon className={`w-4 h-4 ${stepItem.color}`} />
            </div>
            <span className="text-sm font-medium text-white">
              {stepItem.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 w-full bg-neutral-700 rounded-full h-2">
        <motion.div
          className="h-2 bg-gradient-to-r from-primary-blue to-primary-cyan rounded-full"
          initial={{ width: "0%" }}
          animate={{ 
            width: isPlaying ? `${((step + 1) / steps.length) * 100}%` : "0%" 
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

// Floating Elements Animation
const FloatingElements = () => {
  const elements = [
    { icon: Brain, position: "top-10 left-10", delay: 0 },
    { icon: Bell, position: "top-20 right-20", delay: 0.5 },
    { icon: Box, position: "bottom-20 left-20", delay: 1 },
    { icon: Shield, position: "bottom-10 right-10", delay: 1.5 },
  ];

  return (
    <>
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.position} w-12 h-12 opacity-10`}
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          <element.icon className="w-full h-full text-primary-cyan" />
        </motion.div>
      ))}
    </>
  );
};

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const allFeatures = [...FEATURES.core, ...FEATURES.advanced];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconMap = {
    Brain,
    Bell,
    Box,
    FileText,
    Mail,
    Wrench,
    Shield,
    Users,
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 overflow-hidden"
    >
      {/* Floating Background Elements */}
      <FloatingElements />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-purple/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-blue/20 border border-primary-blue/30 rounded-full text-primary-cyan text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Brain className="w-4 h-4" />
            <span>AI-Powered Features</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">Complete Warranty</span>
            <br />
            <span className="text-white">Management Suite</span>
          </h2>

          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            From AI-powered receipt scanning to 3D inventory visualization, 
            WarrantyAI provides everything you need to protect your valuable items.
          </p>
        </motion.div>

        {/* Interactive Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Feature List */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {allFeatures.map((feature, index) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  onClick={() => setActiveFeature(index)}
                  className="cursor-pointer"
                >
                  <Card 
                    variant={activeFeature === index ? "neon" : "glass"}
                    hover={true}
                    className={`transition-all duration-300 ${
                      activeFeature === index ? "scale-105" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-neutral-800/50 ${
                        activeFeature === index ? "animate-pulse" : ""
                      }`}>
                        <IconComponent className={`w-6 h-6 text-${feature.color}`} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {feature.name}
                        </h3>
                        <p className="text-neutral-400 text-sm">
                          {feature.description}
                        </p>
                      </div>
                      
                      <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${
                        activeFeature === index ? "rotate-90" : ""
                      }`} />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Feature Demo */}
          <motion.div
            className="lg:sticky lg:top-20"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card variant="gradient" size="lg" className="h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {allFeatures[activeFeature]?.name}
                    </h3>
                    <p className="text-neutral-300">
                      {allFeatures[activeFeature]?.description}
                    </p>
                  </div>

                  <FeatureDemo 
                    feature={allFeatures[activeFeature]} 
                    isActive={true}
                  />
                </motion.div>
              </AnimatePresence>
            </Card>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {FEATURES.core.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <motion.div key={feature.id} variants={itemVariants}>
                <Card 
                  variant="feature" 
                  hover={true} 
                  glow={true}
                  className="h-full text-center group"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className={`p-4 rounded-full bg-neutral-800/50 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 text-${feature.color}`} />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-neutral-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              href="/demo"
            >
              Try All Features
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              href="/features"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
