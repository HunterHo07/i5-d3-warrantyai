"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  ArrowUp,
  Heart
} from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";
import { NAVIGATION, APP_CONFIG } from "@/lib/constants";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    hidden: { opacity: 0, y: 20 },
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
    <footer className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-t border-neutral-800">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
              <Logo size="lg" variant="gradient" animated={true} />
              
              <p className="text-neutral-400 max-w-md leading-relaxed">
                {APP_CONFIG.description}. Never miss a warranty again with our 
                AI-powered tracking and smart reminder system.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-neutral-400">
                  <Mail className="w-5 h-5 text-primary-cyan" />
                  <span>{APP_CONFIG.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-400">
                  <Phone className="w-5 h-5 text-primary-cyan" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-neutral-400">
                  <MapPin className="w-5 h-5 text-primary-cyan" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Github, href: "#", label: "GitHub" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-2 rounded-lg bg-neutral-800/50 text-neutral-400 hover:text-primary-cyan hover:bg-neutral-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Links */}
            {NAVIGATION.footer.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                className="space-y-4"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold text-white">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        className="text-neutral-400 hover:text-primary-cyan transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            className="mt-16 pt-8 border-t border-neutral-800"
            variants={itemVariants}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Stay Updated
                </h3>
                <p className="text-neutral-400">
                  Get the latest updates on new features, tips, and warranty management insights.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-cyan focus:border-transparent transition-all duration-300"
                />
                <Button variant="primary" size="md">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-neutral-800 bg-neutral-900/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-neutral-400 text-sm">
                <span>© 2024 {APP_CONFIG.name}. All rights reserved.</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-accent-red fill-accent-red" />
                  <span>for warranty protection</span>
                </span>
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-6 text-sm">
                <a
                  href="/privacy"
                  className="text-neutral-400 hover:text-primary-cyan transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-neutral-400 hover:text-primary-cyan transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="/cookies"
                  className="text-neutral-400 hover:text-primary-cyan transition-colors duration-300"
                >
                  Cookie Policy
                </a>
              </div>

              {/* Back to Top */}
              <motion.button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-neutral-800/50 text-neutral-400 hover:text-primary-cyan hover:bg-neutral-700/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-cyan/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
