"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Brain, 
  Bell, 
  Box, 
  FileText, 
  Mail, 
  Wrench, 
  Shield, 
  Users,
  Smartphone,
  Cloud,
  Zap,
  Eye,
  Camera,
  Calendar,
  BarChart3,
  Lock,
  Globe,
  Headphones,
  CheckCircle,
  ArrowRight,
  Play
} from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FEATURES } from "@/lib/constants";

// Feature Detail Component
const FeatureDetail = ({ feature, index, isInView }) => {
  const iconMap = {
    Brain, Bell, Box, FileText, Mail, Wrench, Shield, Users,
    Smartphone, Cloud, Zap, Eye, Camera, Calendar, BarChart3, Lock, Globe, Headphones
  };
  
  const IconComponent = iconMap[feature.icon] || Brain;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card 
        variant="feature" 
        hover={true} 
        glow={true}
        className="h-full group"
      >
        <div className="space-y-6">
          {/* Feature Icon & Title */}
          <div className="flex items-start space-x-4">
            <div className={`p-4 rounded-xl bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/20 border border-${feature.color}-500/30 group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className={`w-8 h-8 text-${feature.color}-400`} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {feature.name}
              </h3>
              <p className="text-neutral-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>

          {/* Feature Benefits */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
              Key Benefits
            </h4>
            <ul className="space-y-2">
              {feature.benefits?.map((benefit, benefitIndex) => (
                <li key={benefitIndex} className="flex items-center space-x-3 text-sm text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              )) || [
                <li key="1" className="flex items-center space-x-3 text-sm text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                  <span>Automated processing with AI technology</span>
                </li>,
                <li key="2" className="flex items-center space-x-3 text-sm text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                  <span>Real-time notifications and alerts</span>
                </li>,
                <li key="3" className="flex items-center space-x-3 text-sm text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                  <span>Seamless integration with existing workflows</span>
                </li>
              ]}
            </ul>
          </div>

          {/* Demo Button */}
          <div className="pt-4 border-t border-neutral-700/50">
            <Button
              variant="outline"
              size="sm"
              icon={<Play className="w-4 h-4" />}
              href="/demo"
              className="w-full"
            >
              Try This Feature
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Feature Comparison Table
const FeatureComparison = () => {
  const competitors = [
    { name: "WarrantyAI", us: true },
    { name: "Competitor A", us: false },
    { name: "Competitor B", us: false },
    { name: "Manual Tracking", us: false },
  ];

  const comparisonFeatures = [
    { name: "AI Receipt Extraction", warrantyai: true, compA: false, compB: false, manual: false },
    { name: "Smart Reminders", warrantyai: true, compA: true, compB: false, manual: false },
    { name: "3D Inventory View", warrantyai: true, compA: false, compB: false, manual: false },
    { name: "Email Integration", warrantyai: true, compA: false, compB: true, manual: false },
    { name: "Family Sharing", warrantyai: true, compA: false, compB: false, manual: false },
    { name: "Claim Assistant", warrantyai: true, compA: false, compB: false, manual: false },
    { name: "Service Tracking", warrantyai: true, compA: true, compB: false, manual: false },
    { name: "Mobile App", warrantyai: true, compA: true, compB: true, manual: false },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-700">
            <th className="text-left py-4 px-6 text-white font-semibold">Feature</th>
            {competitors.map((comp, index) => (
              <th key={index} className={`text-center py-4 px-6 font-semibold ${
                comp.us ? "text-primary-cyan" : "text-neutral-400"
              }`}>
                {comp.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonFeatures.map((feature, index) => (
            <tr key={index} className="border-b border-neutral-800/50">
              <td className="py-4 px-6 text-neutral-300">{feature.name}</td>
              <td className="text-center py-4 px-6">
                {feature.warrantyai ? (
                  <CheckCircle className="w-5 h-5 text-accent-green mx-auto" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-neutral-700 mx-auto" />
                )}
              </td>
              <td className="text-center py-4 px-6">
                {feature.compA ? (
                  <CheckCircle className="w-5 h-5 text-neutral-500 mx-auto" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-neutral-700 mx-auto" />
                )}
              </td>
              <td className="text-center py-4 px-6">
                {feature.compB ? (
                  <CheckCircle className="w-5 h-5 text-neutral-500 mx-auto" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-neutral-700 mx-auto" />
                )}
              </td>
              <td className="text-center py-4 px-6">
                {feature.manual ? (
                  <CheckCircle className="w-5 h-5 text-neutral-500 mx-auto" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-neutral-700 mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FeaturesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const allFeatures = [...FEATURES.core, ...FEATURES.advanced];
  
  // Add more detailed features
  const enhancedFeatures = allFeatures.map(feature => ({
    ...feature,
    benefits: [
      "Automated processing with AI technology",
      "Real-time notifications and alerts", 
      "Seamless integration with existing workflows",
      "Advanced analytics and reporting"
    ]
  }));

  const categories = [
    { id: "all", name: "All Features", count: enhancedFeatures.length },
    { id: "core", name: "Core Features", count: FEATURES.core.length },
    { id: "advanced", name: "Advanced Features", count: FEATURES.advanced.length },
    { id: "ai", name: "AI-Powered", count: 4 },
  ];

  const filteredFeatures = activeCategory === "all" 
    ? enhancedFeatures
    : activeCategory === "core"
    ? enhancedFeatures.slice(0, FEATURES.core.length)
    : activeCategory === "advanced"
    ? enhancedFeatures.slice(FEATURES.core.length)
    : enhancedFeatures.filter(f => ["ai-extraction", "smart-reminders", "claim-assistant", "3d-inventory"].includes(f.id));

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
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-blue/20 border border-primary-blue/30 rounded-full text-primary-cyan text-sm font-medium mb-6">
              <Brain className="w-4 h-4" />
              <span>Complete Feature Overview</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6">
              <span className="gradient-text">Powerful Features</span>
              <br />
              <span className="text-white">Built for Protection</span>
            </h1>

            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Discover all the advanced features that make WarrantyAI the most comprehensive 
              warranty management platform. From AI-powered extraction to 3D visualization.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                href="/demo"
              >
                Try All Features
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                href="/pricing"
              >
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-primary-blue text-white shadow-lg shadow-primary-blue/25"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Features Grid */}
          <motion.div
            ref={sectionRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredFeatures.map((feature, index) => (
              <FeatureDetail
                key={feature.id}
                feature={feature}
                index={index}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
              <span className="text-white">How We</span>
              <br />
              <span className="gradient-text">Compare</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              See how WarrantyAI stacks up against the competition with our comprehensive feature set.
            </p>
          </motion.div>

          <Card variant="glass" size="lg">
            <FeatureComparison />
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to experience all features?
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Start your free trial today and discover the power of AI-driven warranty management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                Interactive Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FeaturesPage;
