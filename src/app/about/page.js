"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  TrendingUp,
  Globe,
  Shield,
  Zap,
  Brain,
  Linkedin,
  Twitter,
  Github
} from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// Team Member Component
const TeamMember = ({ member, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card variant="glass" hover={true} className="text-center group">
        <div className="space-y-4">
          {/* Avatar */}
          <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary-blue to-primary-cyan flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-2xl">
              {member.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              {member.name}
            </h3>
            <p className="text-primary-cyan font-medium mb-2">
              {member.role}
            </p>
            <p className="text-neutral-400 text-sm">
              {member.bio}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-3">
            {member.social.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.url}
                className="p-2 rounded-lg bg-neutral-800/50 text-neutral-400 hover:text-primary-cyan hover:bg-neutral-700/50 transition-all duration-300"
                aria-label={link.platform}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Company Stats Component
const CompanyStats = () => {
  const stats = [
    { value: "2024", label: "Founded", icon: Target },
    { value: "50K+", label: "Users", icon: Users },
    { value: "1.2M+", label: "Items Protected", icon: Shield },
    { value: "$2.5M+", label: "Money Saved", icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="p-4 rounded-full bg-primary-blue/20 border border-primary-blue/30 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <stat.icon className="w-8 h-8 text-primary-cyan" />
          </div>
          <div className="text-3xl font-bold gradient-text mb-2">
            {stat.value}
          </div>
          <div className="text-neutral-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const AboutPage = () => {
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const team = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      bio: "Former Apple engineer with 10+ years in AI and consumer electronics.",
      social: [
        { platform: "LinkedIn", icon: Linkedin, url: "#" },
        { platform: "Twitter", icon: Twitter, url: "#" },
      ]
    },
    {
      name: "Sarah Rodriguez",
      role: "CTO & Co-Founder", 
      bio: "AI researcher from Stanford, previously at Google DeepMind.",
      social: [
        { platform: "LinkedIn", icon: Linkedin, url: "#" },
        { platform: "Github", icon: Github, url: "#" },
      ]
    },
    {
      name: "Michael Kim",
      role: "Head of Product",
      bio: "Product leader with experience at Tesla and SpaceX.",
      social: [
        { platform: "LinkedIn", icon: Linkedin, url: "#" },
        { platform: "Twitter", icon: Twitter, url: "#" },
      ]
    },
    {
      name: "Emily Johnson",
      role: "Head of Design",
      bio: "Design systems expert, previously at Airbnb and Figma.",
      social: [
        { platform: "LinkedIn", icon: Linkedin, url: "#" },
        { platform: "Twitter", icon: Twitter, url: "#" },
      ]
    },
  ];

  const values = [
    {
      icon: Brain,
      title: "AI-First Innovation",
      description: "We believe AI should make complex tasks simple and intuitive for everyone."
    },
    {
      icon: Shield,
      title: "Consumer Protection",
      description: "Our mission is to protect consumers from losing money on expired warranties."
    },
    {
      icon: Heart,
      title: "User-Centric Design",
      description: "Every feature is designed with real user needs and pain points in mind."
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Making warranty protection accessible to everyone, everywhere."
    },
  ];

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
              <Heart className="w-4 h-4" />
              <span>Our Story</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-6">
              <span className="text-white">Protecting What</span>
              <br />
              <span className="gradient-text">Matters Most</span>
            </h1>

            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              We're on a mission to revolutionize warranty management through AI, 
              ensuring no one ever loses money on expired coverage again.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CompanyStats />
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
                <span className="text-white">The Problem That</span>
                <br />
                <span className="gradient-text">Started It All</span>
              </h2>
              
              <div className="space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  It started with a $800 refrigerator repair that could have been free. 
                  Our founder Alex had completely forgotten about the extended warranty 
                  he purchased, and by the time he remembered, it was too late.
                </p>
                <p>
                  That frustrating experience led to a shocking discovery: Americans lose 
                  over $2.1 billion annually in unclaimed warranty benefits. People weren't 
                  careless—they were overwhelmed by the complexity of tracking multiple 
                  warranties across different products and timeframes.
                </p>
                <p>
                  We knew there had to be a better way. That's when we decided to build 
                  WarrantyAI—an intelligent system that would never let anyone miss a 
                  warranty again.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card variant="gradient" size="lg">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary-blue to-primary-cyan flex items-center justify-center">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                    <p className="text-neutral-300 leading-relaxed">
                      To eliminate warranty anxiety and protect consumers from losing 
                      money on expired coverage through intelligent AI-powered management.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-700/50">
                    <h4 className="text-lg font-semibold text-white mb-2">Our Vision</h4>
                    <p className="text-neutral-400 text-sm">
                      A world where every consumer is empowered with complete visibility 
                      and control over their warranty protection.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section ref={sectionRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
              <span className="text-white">Our</span>
              <br />
              <span className="gradient-text">Core Values</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              The principles that guide everything we do at WarrantyAI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="glass" hover={true} className="h-full text-center group">
                  <div className="space-y-4">
                    <div className="p-4 rounded-full bg-primary-blue/20 border border-primary-blue/30 w-16 h-16 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-8 h-8 text-primary-cyan" />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {value.title}
                      </h3>
                      <p className="text-neutral-400 text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-display mb-6">
              <span className="text-white">Meet Our</span>
              <br />
              <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              The passionate individuals building the future of warranty management.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Mission
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Ready to help us revolutionize warranty management? 
              We're always looking for talented individuals to join our team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                href="/careers"
              >
                View Open Positions
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                href="/contact"
              >
                Get in Touch
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

export default AboutPage;
