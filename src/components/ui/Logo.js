"use client";

import { motion } from "framer-motion";

const Logo = ({ 
  size = "md", 
  variant = "default",
  animated = true,
  className = "",
  showText = true,
  ...props 
}) => {
  // Size configurations
  const sizes = {
    xs: { icon: "w-6 h-6", text: "text-lg", container: "gap-2" },
    sm: { icon: "w-8 h-8", text: "text-xl", container: "gap-2" },
    md: { icon: "w-10 h-10", text: "text-2xl", container: "gap-3" },
    lg: { icon: "w-12 h-12", text: "text-3xl", container: "gap-3" },
    xl: { icon: "w-16 h-16", text: "text-4xl", container: "gap-4" },
  };

  // Variant styles
  const variants = {
    default: "text-white",
    gradient: "gradient-text",
    neon: "neon-cyan",
    white: "text-white",
    dark: "text-neutral-900",
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  // Animation variants
  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.05,
      rotate: 2,
      transition: { duration: 0.3, ease: "easeOut" }
    },
  };

  const iconVariants = {
    initial: { rotate: 0 },
    animate: animated ? {
      rotate: 360,
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      }
    } : {},
    hover: {
      rotate: 15,
      transition: { duration: 0.3 }
    },
  };

  const textVariants = {
    initial: { opacity: 1 },
    hover: {
      opacity: 0.8,
      transition: { duration: 0.3 }
    },
  };

  // AI-inspired logo icon (custom SVG)
  const LogoIcon = () => (
    <motion.svg
      className={currentSize.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={iconVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* Outer ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        className="opacity-60"
      />
      
      {/* Inner hexagon */}
      <path
        d="M50 15 L75 30 L75 60 L50 75 L25 60 L25 30 Z"
        stroke="url(#gradient2)"
        strokeWidth="2"
        fill="url(#gradient3)"
        className="opacity-80"
      />
      
      {/* Central AI symbol */}
      <circle
        cx="50"
        cy="50"
        r="12"
        fill="url(#gradient4)"
      />
      
      {/* AI dots */}
      <circle cx="42" cy="45" r="2" fill="currentColor" className="opacity-90" />
      <circle cx="58" cy="45" r="2" fill="currentColor" className="opacity-90" />
      <path
        d="M42 55 Q50 60 58 55"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        className="opacity-90"
      />
      
      {/* Orbiting elements */}
      <motion.circle
        cx="50"
        cy="20"
        r="3"
        fill="url(#gradient5)"
        animate={animated ? {
          rotate: 360,
          transition: {
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }
        } : {}}
        style={{ transformOrigin: "50px 50px" }}
      />
      
      <motion.circle
        cx="80"
        cy="50"
        r="2"
        fill="url(#gradient6)"
        animate={animated ? {
          rotate: -360,
          transition: {
            duration: 12,
            ease: "linear",
            repeat: Infinity,
          }
        } : {}}
        style={{ transformOrigin: "50px 50px" }}
      />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066FF" />
          <stop offset="100%" stopColor="#00FFFF" />
        </linearGradient>
        
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.2" />
        </linearGradient>
        
        <radialGradient id="gradient4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="100%" stopColor="#0066FF" />
        </radialGradient>
        
        <radialGradient id="gradient5" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        
        <radialGradient id="gradient6" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#6366F1" />
        </radialGradient>
      </defs>
    </motion.svg>
  );

  return (
    <motion.div
      className={`flex items-center ${currentSize.container} ${className}`}
      variants={logoVariants}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      {/* Logo Icon */}
      <LogoIcon />
      
      {/* Logo Text */}
      {showText && (
        <motion.div
          className={`font-display font-bold ${currentSize.text} ${currentVariant}`}
          variants={textVariants}
        >
          Warranty<span className="text-primary-cyan">AI</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Logo;
