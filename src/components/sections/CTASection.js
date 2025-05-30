"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Zap, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// Animated Background Elements
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-blue/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-cyan/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-primary-purple/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary-cyan/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse" />
      </div>
    </div>
  );
};

// Feature Highlight Component
const FeatureHighlight = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      className="flex items-start space-x-4"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex-shrink-0 p-3 rounded-lg bg-primary-cyan/20 border border-primary-cyan/30">
        <Icon className="w-6 h-6 text-primary-cyan" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-white mb-1">
          {title}
        </h4>
        <p className="text-neutral-400 text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// Urgency Timer Component (Simulated)
const UrgencyTimer = () => {
  return (
    <motion.div
      className="inline-flex items-center space-x-2 px-4 py-2 bg-accent-red/20 border border-accent-red/30 rounded-full text-accent-red text-sm font-medium"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Clock className="w-4 h-4" />
      <span>Limited Time: 14-Day Free Trial</span>
    </motion.div>
  );
};

const CTASection = () => {
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get started in under 2 minutes with our guided onboarding",
    },
    {
      icon: Shield,
      title: "100% Secure",
      description: "Your data is encrypted and protected with enterprise-grade security",
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Advanced AI technology with 99.2% accuracy in warranty extraction",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Urgency Badge */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <UrgencyTimer />
            </motion.div>

            {/* Main Headline */}
            <div className="text-center lg:text-left">
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="text-white">Ready to</span>
                <br />
                <span className="gradient-text">Protect Your</span>
                <br />
                <span className="text-white">Warranties?</span>
              </motion.h2>

              <motion.p
                className="text-xl text-neutral-300 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Join thousands of users who never miss a warranty again. 
                Start your free trial today and experience the power of AI-driven warranty management.
              </motion.p>
            </div>

            {/* Feature Highlights */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {features.map((feature, index) => (
                <FeatureHighlight
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={1.0 + index * 0.2}
                />
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <Button
                variant="primary"
                size="xl"
                icon={<ArrowRight className="w-6 h-6" />}
                iconPosition="right"
                href="/signup"
                className="text-lg px-10 py-5"
              >
                Start Free Trial
              </Button>
              
              <Button
                variant="outline"
                size="xl"
                href="/demo"
                className="text-lg px-10 py-5"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-neutral-400"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-accent-green" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-accent-green" />
                <span>Setup in 2 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-accent-green" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card 
              variant="neon" 
              size="xl" 
              glow={true}
              className="relative overflow-hidden"
            >
              {/* Animated Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-cyan/20"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10 text-center space-y-8">
                {/* Icon */}
                <motion.div
                  className="flex justify-center"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="p-6 rounded-full bg-gradient-to-br from-primary-blue to-primary-cyan">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "50K+", label: "Protected Users" },
                    { value: "1.2M+", label: "Items Tracked" },
                    { value: "$2.5M+", label: "Money Saved" },
                    { value: "99.2%", label: "AI Accuracy" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="text-2xl font-bold gradient-text mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-neutral-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Quote */}
                <motion.blockquote
                  className="text-neutral-300 italic border-l-4 border-primary-cyan pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  "WarrantyAI saved me $800 on my refrigerator repair. 
                  I completely forgot about the extended warranty until the app reminded me!"
                  <footer className="text-sm text-neutral-500 mt-2">
                    - Sarah Chen, San Francisco
                  </footer>
                </motion.blockquote>
              </div>
            </Card>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-12 h-12 bg-accent-green/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <motion.div
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-purple/20 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
