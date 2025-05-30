"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, Star, Zap, Crown, Building } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { PRICING_PLANS } from "@/lib/constants";

// 3D Tilt Effect for Pricing Cards
const PricingCard = ({ plan, isPopular, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconMap = {
    free: Star,
    pro: Zap,
    family: Crown,
    business: Building,
  };

  const IconComponent = iconMap[plan.id] || Star;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.2,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      rotateX: 5,
      rotateY: 5,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="relative"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
        >
          <div className="bg-gradient-to-r from-primary-blue to-primary-cyan text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            Most Popular
          </div>
        </motion.div>
      )}

      <Card
        variant={isPopular ? "neon" : "pricing"}
        size="lg"
        className={`h-full relative overflow-hidden ${
          isPopular ? "border-2 border-primary-cyan shadow-2xl shadow-primary-cyan/20" : ""
        }`}
      >
        {/* Glow Effect for Popular Plan */}
        {isPopular && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 to-primary-cyan/10 pointer-events-none"
            animate={{
              opacity: isHovered ? 0.3 : 0.1,
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="relative z-10">
          {/* Plan Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${
                isPopular 
                  ? "bg-gradient-to-br from-primary-blue to-primary-cyan" 
                  : "bg-neutral-700"
              }`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {plan.name}
            </h3>
            
            <p className="text-neutral-400 mb-6">
              {plan.description}
            </p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold gradient-text">
                  ${plan.price}
                </span>
                <span className="text-neutral-400 ml-2">
                  /{plan.period}
                </span>
              </div>
              
              {plan.price > 0 && (
                <p className="text-sm text-neutral-500 mt-2">
                  14-day free trial
                </p>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {plan.features.map((feature, featureIndex) => (
              <motion.div
                key={featureIndex}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 + featureIndex * 0.1 + 0.8 
                }}
              >
                <div className="flex-shrink-0">
                  <Check className="w-5 h-5 text-accent-green" />
                </div>
                <span className="text-neutral-300 text-sm">
                  {feature}
                </span>
              </motion.div>
            ))}

            {/* Limitations */}
            {plan.limitations && plan.limitations.length > 0 && (
              <>
                <div className="border-t border-neutral-700 pt-4 mt-6">
                  {plan.limitations.map((limitation, limitIndex) => (
                    <motion.div
                      key={limitIndex}
                      className="flex items-center space-x-3 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + (plan.features.length + limitIndex) * 0.1 + 0.8 
                      }}
                    >
                      <div className="flex-shrink-0">
                        <X className="w-5 h-5 text-neutral-500" />
                      </div>
                      <span className="text-neutral-500 text-sm">
                        {limitation}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.2 + 1.2 
            }}
          >
            <Button
              variant={isPopular ? "primary" : "outline"}
              size="lg"
              className="w-full"
              href={plan.id === "business" ? "/contact" : "/signup"}
            >
              {plan.cta}
            </Button>
          </motion.div>
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          animate={isHovered ? { translateX: "100%" } : {}}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </Card>
    </motion.div>
  );
};

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary-purple/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-cyan/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-purple/20 border border-primary-purple/30 rounded-full text-primary-pink text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Crown className="w-4 h-4" />
            <span>Simple, Transparent Pricing</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
            <span className="text-white">Choose Your</span>
            <br />
            <span className="gradient-text-secondary">Protection Plan</span>
          </h2>

          <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
            Start free and upgrade as you grow. All plans include our core AI features 
            with no hidden fees or long-term commitments.
          </p>

          {/* Billing Toggle */}
          <motion.div
            className="inline-flex items-center p-1 bg-neutral-800 rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-primary-blue text-white shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                billingCycle === "yearly"
                  ? "bg-primary-blue text-white shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              <span className="ml-2 px-2 py-1 bg-accent-green text-white text-xs rounded-full">
                Save 20%
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isPopular={plan.popular}
              index={index}
              isInView={isInView}
            />
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Questions about pricing?
          </h3>
          <p className="text-neutral-400 mb-6">
            Our team is here to help you choose the right plan for your needs.
          </p>
          
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              size="lg"
              href="/contact"
            >
              Contact Sales
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              href="/faq"
            >
              View FAQ
            </Button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-neutral-800"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { label: "14-Day", sublabel: "Free Trial" },
            { label: "No Setup", sublabel: "Fees" },
            { label: "Cancel", sublabel: "Anytime" },
            { label: "24/7", sublabel: "Support" },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold gradient-text mb-1">
                {item.label}
              </div>
              <div className="text-sm text-neutral-400">
                {item.sublabel}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
