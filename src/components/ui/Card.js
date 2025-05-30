"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const Card = forwardRef(({
  children,
  variant = "default",
  size = "md",
  className = "",
  hover = true,
  glow = false,
  gradient = false,
  onClick,
  ...props
}, ref) => {
  // Base styles
  const baseStyles = "relative overflow-hidden transition-all duration-300";

  // Variant styles
  const variants = {
    default: "bg-neutral-800/50 border border-neutral-700/50 backdrop-blur-sm",
    glass: "bg-white/5 backdrop-blur-md border border-white/10",
    solid: "bg-neutral-800 border border-neutral-700",
    outline: "border-2 border-neutral-600 bg-transparent",
    gradient: "bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 border border-neutral-700/30",
    neon: "bg-neutral-900/90 border border-primary-cyan/30 shadow-lg shadow-primary-cyan/10",
    feature: "bg-gradient-to-br from-primary-blue/10 to-primary-purple/10 border border-primary-blue/20",
    pricing: "bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-600",
  };

  // Size styles
  const sizes = {
    xs: "p-3 rounded-lg",
    sm: "p-4 rounded-lg",
    md: "p-6 rounded-xl",
    lg: "p-8 rounded-2xl",
    xl: "p-10 rounded-3xl",
  };

  // Hover effects
  const hoverEffects = hover ? "hover:scale-[1.02] hover:shadow-xl" : "";
  
  // Glow effects
  const glowEffects = glow ? "hover:shadow-2xl hover:shadow-primary-blue/20" : "";

  // Combine styles
  const cardStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${hoverEffects} ${glowEffects} ${className}`;

  // Animation variants
  const cardVariants = {
    initial: { 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
    },
    hover: hover ? { 
      scale: 1.02,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    } : {},
    tap: onClick ? { 
      scale: 0.98,
      transition: { duration: 0.1 }
    } : {},
  };

  // 3D tilt effect for interactive cards
  const handle3DTilt = (e) => {
    if (!hover) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((centerX - x) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const resetTilt = (e) => {
    if (!hover) return;
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <motion.div
      ref={ref}
      className={cardStyles}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      onMouseMove={handle3DTilt}
      onMouseLeave={resetTilt}
      style={{ transformStyle: "preserve-3d" }}
      {...props}
    >
      {/* Gradient overlay for gradient variant */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-primary-purple/5 pointer-events-none" />
      )}
      
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-blue/10 to-primary-cyan/10 opacity-0 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine effect on hover */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          whileHover={{
            translateX: "100%",
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        />
      )}
    </motion.div>
  );
});

Card.displayName = "Card";

// Card Header component
export const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

// Card Title component
export const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-xl font-semibold text-white mb-2 ${className}`} {...props}>
    {children}
  </h3>
);

// Card Description component
export const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-neutral-400 ${className}`} {...props}>
    {children}
  </p>
);

// Card Content component
export const CardContent = ({ children, className = "", ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

// Card Footer component
export const CardFooter = ({ children, className = "", ...props }) => (
  <div className={`mt-6 pt-4 border-t border-neutral-700/50 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
