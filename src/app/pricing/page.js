"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Check, 
  X, 
  Star, 
  Zap, 
  Crown, 
  Building,
  Calculator,
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Smartphone,
  HelpCircle
} from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { PRICING_PLANS } from "@/lib/constants";

// Enhanced Pricing Card Component
const EnhancedPricingCard = ({ plan, isPopular, index, isInView, billingCycle }) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconMap = {
    free: Star,
    pro: Zap,
    family: Crown,
    business: Building,
  };

  const IconComponent = iconMap[plan.id] || Star;

  // Calculate yearly pricing (20% discount)
  const yearlyPrice = billingCycle === "yearly" ? Math.round(plan.price * 12 * 0.8) : plan.price;
  const monthlySavings = billingCycle === "yearly" ? Math.round(plan.price * 12 * 0.2) : 0;

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
              {billingCycle === "yearly" && plan.price > 0 ? (
                <div>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold gradient-text">
                      ${yearlyPrice}
                    </span>
                    <span className="text-neutral-400 ml-2">
                      /year
                    </span>
                  </div>
                  <div className="text-sm text-neutral-500 mt-1">
                    ${Math.round(yearlyPrice / 12)}/month • Save ${monthlySavings}/year
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold gradient-text">
                    ${plan.price}
                  </span>
                  <span className="text-neutral-400 ml-2">
                    /{plan.period}
                  </span>
                </div>
              )}
              
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

// ROI Calculator Component
const ROICalculator = () => {
  const [itemCount, setItemCount] = useState(10);
  const [avgValue, setAvgValue] = useState(500);
  
  const potentialSavings = itemCount * avgValue * 0.15; // 15% potential savings
  const annualCost = 9.99 * 12; // Pro plan annual cost
  const roi = ((potentialSavings - annualCost) / annualCost * 100).toFixed(0);

  return (
    <Card variant="gradient" size="lg">
      <div className="text-center mb-6">
        <Calculator className="w-12 h-12 text-primary-cyan mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">ROI Calculator</h3>
        <p className="text-neutral-400">Calculate your potential savings with WarrantyAI</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Number of items with warranties: {itemCount}
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={itemCount}
            onChange={(e) => setItemCount(parseInt(e.target.value))}
            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Average item value: ${avgValue}
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="50"
            value={avgValue}
            onChange={(e) => setAvgValue(parseInt(e.target.value))}
            className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div className="bg-neutral-800/50 rounded-lg p-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-neutral-400">Potential annual savings:</span>
            <span className="text-accent-green font-bold">${potentialSavings.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-400">WarrantyAI Pro cost:</span>
            <span className="text-white">${annualCost}</span>
          </div>
          <div className="border-t border-neutral-700 pt-4">
            <div className="flex justify-between">
              <span className="text-white font-semibold">ROI:</span>
              <span className="text-primary-cyan font-bold text-xl">{roi}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// FAQ Component
const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "Your data remains accessible for 30 days after cancellation. You can export all your warranty information during this period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 14-day free trial, so you can test all features before committing. After that, we provide refunds on a case-by-case basis."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees, no hidden costs. The price you see is exactly what you pay, and you can start using WarrantyAI immediately."
    },
    {
      question: "How accurate is the AI extraction?",
      answer: "Our AI achieves 99.2% accuracy in extracting warranty information from receipts and documents, with continuous improvements."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Card key={index} variant="glass" className="cursor-pointer" onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}>
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-white">{faq.question}</h4>
            <HelpCircle className={`w-5 h-5 text-primary-cyan transition-transform duration-300 ${
              openFAQ === index ? "rotate-180" : ""
            }`} />
          </div>
          {openFAQ === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-neutral-700/50"
            >
              <p className="text-neutral-400">{faq.answer}</p>
            </motion.div>
          )}
        </Card>
      ))}
    </div>
  );
};

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-purple/20 border border-primary-purple/30 rounded-full text-primary-pink text-sm font-medium mb-6">
              <Crown className="w-4 h-4" />
              <span>Simple, Transparent Pricing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6">
              <span className="text-white">Choose Your</span>
              <br />
              <span className="gradient-text-secondary">Protection Plan</span>
            </h1>

            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Start free and upgrade as you grow. All plans include our core AI features 
              with no hidden fees or long-term commitments.
            </p>

            {/* Billing Toggle */}
            <motion.div
              className="inline-flex items-center p-1 bg-neutral-800 rounded-lg mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
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
        </div>
      </section>

      {/* Pricing Cards */}
      <section ref={sectionRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {PRICING_PLANS.map((plan, index) => (
              <EnhancedPricingCard
                key={plan.id}
                plan={plan}
                isPopular={plan.popular}
                index={index}
                isInView={isInView}
                billingCycle={billingCycle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
              <span className="text-white">Calculate Your</span>
              <br />
              <span className="gradient-text">Return on Investment</span>
            </h2>
            <p className="text-xl text-neutral-300">
              See how much you could save with WarrantyAI's intelligent warranty management.
            </p>
          </motion.div>

          <ROICalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
              <span className="text-white">Frequently Asked</span>
              <br />
              <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-neutral-300">
              Everything you need to know about WarrantyAI pricing and plans.
            </p>
          </motion.div>

          <FAQ />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, label: "14-Day", sublabel: "Free Trial" },
              { icon: DollarSign, label: "No Setup", sublabel: "Fees" },
              { icon: Clock, label: "Cancel", sublabel: "Anytime" },
              { icon: Users, label: "24/7", sublabel: "Support" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <item.icon className="w-12 h-12 text-primary-cyan mx-auto mb-4" />
                <div className="text-lg font-bold gradient-text mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-neutral-400">
                  {item.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PricingPage;
