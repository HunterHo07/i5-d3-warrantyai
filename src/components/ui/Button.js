"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

const Button = forwardRef(({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = "left",
  onClick,
  href,
  target,
  rel,
  ...props
}, ref) => {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";

  // Variant styles
  const variants = {
    primary: "bg-gradient-to-r from-primary-blue to-primary-cyan text-white hover:shadow-lg hover:shadow-primary-blue/25 focus:ring-primary-blue",
    secondary: "bg-gradient-to-r from-primary-purple to-primary-pink text-white hover:shadow-lg hover:shadow-primary-purple/25 focus:ring-primary-purple",
    accent: "bg-gradient-to-r from-accent-green to-accent-orange text-white hover:shadow-lg hover:shadow-accent-green/25 focus:ring-accent-green",
    outline: "border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white focus:ring-primary-blue",
    ghost: "text-neutral-300 hover:text-white hover:bg-neutral-800 focus:ring-neutral-700",
    danger: "bg-accent-red text-white hover:bg-red-600 focus:ring-accent-red",
    success: "bg-accent-green text-white hover:bg-green-600 focus:ring-accent-green",
    neon: "border-2 border-primary-cyan text-primary-cyan hover:bg-primary-cyan hover:text-neutral-900 hover:shadow-lg hover:shadow-primary-cyan/50 focus:ring-primary-cyan neon-cyan",
  };

  // Size styles
  const sizes = {
    xs: "px-2.5 py-1.5 text-xs rounded",
    sm: "px-3 py-2 text-sm rounded-md",
    md: "px-4 py-2.5 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
    xl: "px-8 py-4 text-lg rounded-xl",
  };

  // Combine styles
  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    },
  };

  // Glow effect for neon variant
  const glowVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Button content
  const buttonContent = (
    <>
      {/* Glow effect for neon variant */}
      {variant === "neon" && (
        <motion.div
          className="absolute inset-0 bg-primary-cyan opacity-20 blur-xl rounded-lg"
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
        />
      )}
      
      {/* Icon - Left */}
      {icon && iconPosition === "left" && !loading && (
        <span className="mr-2">
          {icon}
        </span>
      )}
      
      {/* Loading spinner */}
      {loading && (
        <span className="mr-2">
          <LoadingSpinner />
        </span>
      )}
      
      {/* Button text */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Icon - Right */}
      {icon && iconPosition === "right" && !loading && (
        <span className="ml-2">
          {icon}
        </span>
      )}
    </>
  );

  // Render as link if href is provided
  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={buttonStyles}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {buttonContent}
      </motion.a>
    );
  }

  // Render as button
  return (
    <motion.button
      ref={ref}
      className={buttonStyles}
      disabled={disabled || loading}
      onClick={onClick}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;
