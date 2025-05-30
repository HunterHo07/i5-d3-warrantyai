"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Play } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { TESTIMONIALS, STATS } from "@/lib/constants";

// Animated Star Rating Component
const StarRating = ({ rating, animated = false }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={animated ? { opacity: 0, scale: 0 } : {}}
          animate={animated ? { opacity: 1, scale: 1 } : {}}
          transition={animated ? { duration: 0.3, delay: index * 0.1 } : {}}
        >
          <Star
            className={`w-5 h-5 ${
              index < rating
                ? "text-accent-orange fill-accent-orange"
                : "text-neutral-600"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, isActive, onClick }) => {
  return (
    <motion.div
      className="cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        variant={isActive ? "neon" : "glass"}
        hover={true}
        glow={isActive}
        className={`h-full transition-all duration-500 ${
          isActive ? "scale-105 shadow-2xl shadow-primary-cyan/20" : ""
        }`}
      >
        <div className="space-y-6">
          {/* Quote Icon */}
          <div className="flex justify-between items-start">
            <Quote className="w-8 h-8 text-primary-cyan opacity-50" />
            <StarRating rating={testimonial.rating} animated={isActive} />
          </div>

          {/* Testimonial Content */}
          <blockquote className="text-neutral-300 text-lg leading-relaxed">
            "{testimonial.content}"
          </blockquote>

          {/* Author Info */}
          <div className="flex items-center space-x-4 pt-4 border-t border-neutral-700/50">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-blue to-primary-cyan flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {testimonial.name.charAt(0)}
              </span>
            </div>
            
            <div>
              <div className="font-semibold text-white">
                {testimonial.name}
              </div>
              <div className="text-sm text-neutral-400">
                {testimonial.role}
              </div>
              <div className="text-xs text-neutral-500">
                {testimonial.company}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Stats Counter Component
const StatsCounter = ({ stat, index, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const target = parseInt(stat.value.replace(/[^0-9.]/g, ""));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  const formatValue = (value) => {
    const original = stat.value;
    if (original.includes("K")) return `${value}K+`;
    if (original.includes("M")) return `${(value / 1000000).toFixed(1)}M+`;
    if (original.includes("$")) return `$${(value / 1000000).toFixed(1)}M+`;
    if (original.includes("%")) return `${value}%`;
    return value.toString();
  };

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
        {formatValue(count)}
      </div>
      <div className="text-lg font-semibold text-white mb-1">
        {stat.label}
      </div>
      <div className="text-sm text-neutral-400">
        {stat.description}
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-purple/10 rounded-full blur-3xl animate-pulse" />
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
            className="inline-flex items-center space-x-2 px-4 py-2 bg-accent-orange/20 border border-accent-orange/30 rounded-full text-accent-orange text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Star className="w-4 h-4" />
            <span>Loved by Thousands</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
            <span className="text-white">What Our</span>
            <br />
            <span className="gradient-text">Users Say</span>
          </h2>

          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Join thousands of satisfied users who never miss a warranty again. 
            See how WarrantyAI is transforming the way people protect their valuable items.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STATS.map((stat, index) => (
            <StatsCounter
              key={stat.id}
              stat={stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Testimonial */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card variant="gradient" size="lg" className="h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  Featured Review
                </h3>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={isAutoPlaying ? <Play className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  >
                    {isAutoPlaying ? "Pause" : "Play"}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ChevronLeft className="w-4 h-4" />}
                    onClick={prevTestimonial}
                  />
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={<ChevronRight className="w-4 h-4" />}
                    onClick={nextTestimonial}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <StarRating rating={TESTIMONIALS[activeTestimonial].rating} animated={true} />
                  
                  <blockquote className="text-xl text-neutral-300 leading-relaxed">
                    "{TESTIMONIALS[activeTestimonial].content}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-blue to-primary-cyan flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {TESTIMONIALS[activeTestimonial].name.charAt(0)}
                      </span>
                    </div>
                    
                    <div>
                      <div className="text-lg font-semibold text-white">
                        {TESTIMONIALS[activeTestimonial].name}
                      </div>
                      <div className="text-neutral-400">
                        {TESTIMONIALS[activeTestimonial].role}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {TESTIMONIALS[activeTestimonial].company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Card>
          </motion.div>

          {/* Testimonial List */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === activeTestimonial}
                onClick={() => {
                  setActiveTestimonial(index);
                  setIsAutoPlaying(false);
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to join thousands of satisfied users?
          </h3>
          <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
            Start protecting your warranties today with our AI-powered platform. 
            Join the community that never misses a warranty again.
          </p>
          
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              href="/signup"
            >
              Start Free Trial
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              href="/demo"
            >
              Try Demo First
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
