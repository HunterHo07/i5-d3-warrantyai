// WarrantyAI - Animation Utilities and GSAP Configurations

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation Presets
export const ANIMATION_PRESETS = {
  fadeIn: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    duration: 0.6,
    ease: "power2.out",
  },
  slideInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
    duration: 0.6,
    ease: "power2.out",
  },
  slideInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
    duration: 0.6,
    ease: "power2.out",
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    duration: 0.6,
    ease: "back.out(1.7)",
  },
  rotateIn: {
    from: { opacity: 0, rotation: -10, scale: 0.9 },
    to: { opacity: 1, rotation: 0, scale: 1 },
    duration: 0.8,
    ease: "back.out(1.7)",
  },
};

// FX Pool Effect Configurations
export const FX_EFFECTS = {
  "parallax-scroll": {
    name: "Parallax Scroll",
    description: "Multi-layer parallax background scrolling",
    performance: "medium",
    mobile: true,
  },
  "scroll-triggered": {
    name: "Scroll Triggered Animation",
    description: "Animations triggered by scroll position",
    performance: "high",
    mobile: true,
  },
  "multi-layer-depth": {
    name: "Multi-Layer Depth",
    description: "3D depth effect with multiple layers",
    performance: "medium",
    mobile: false,
  },
  "3d-tilt-hover": {
    name: "3D Tilt on Hover",
    description: "Interactive 3D tilt effect on mouse hover",
    performance: "high",
    mobile: false,
  },
  "3d-product-viewer": {
    name: "3D Product Viewer",
    description: "Interactive 3D product visualization",
    performance: "low",
    mobile: false,
  },
  "floating-elements": {
    name: "Floating Elements",
    description: "Gentle floating animation for UI elements",
    performance: "high",
    mobile: true,
  },
  "ai-eye-tracker": {
    name: "AI Eye Tracker",
    description: "Simulated AI eye tracking effect",
    performance: "medium",
    mobile: true,
  },
  "ai-response-bubble": {
    name: "AI Response Bubble",
    description: "Animated AI chat response bubbles",
    performance: "high",
    mobile: true,
  },
  "matrix-effect": {
    name: "Matrix Effect",
    description: "Digital rain matrix background effect",
    performance: "medium",
    mobile: false,
  },
  "multi-cursor": {
    name: "Multi-User Cursor",
    description: "Simulated multiple user cursors",
    performance: "medium",
    mobile: false,
  },
  "ghost-cursors": {
    name: "Ghost Cursors",
    description: "Trailing ghost cursor effects",
    performance: "medium",
    mobile: false,
  },
  "typing-text": {
    name: "Typing Text Effect",
    description: "Typewriter-style text animation",
    performance: "high",
    mobile: true,
  },
  "infinite-zoom": {
    name: "Infinite Zoom",
    description: "Kaleidoscope infinite zoom effect",
    performance: "low",
    mobile: false,
  },
  "morphing-shapes": {
    name: "Morphing Shapes",
    description: "Animated morphing geometric shapes",
    performance: "medium",
    mobile: true,
  },
  "animated-svgs": {
    name: "Animated SVGs",
    description: "Path-animated SVG illustrations",
    performance: "high",
    mobile: true,
  },
  "terminal-typing": {
    name: "Terminal Typing",
    description: "Terminal-style typing with cursor",
    performance: "high",
    mobile: true,
  },
};

// Random FX Assignment Function
export const assignRandomFX = (sectionCount = 1, mobileOptimized = false) => {
  const availableEffects = Object.keys(FX_EFFECTS).filter(effect => {
    if (mobileOptimized) {
      return FX_EFFECTS[effect].mobile;
    }
    return true;
  });

  const assignments = [];
  for (let i = 0; i < sectionCount; i++) {
    const effectCount = Math.floor(Math.random() * 3) + 1; // 1-3 effects per section
    const sectionEffects = [];
    
    for (let j = 0; j < effectCount; j++) {
      const randomIndex = Math.floor(Math.random() * availableEffects.length);
      const effect = availableEffects[randomIndex];
      
      if (!sectionEffects.includes(effect)) {
        sectionEffects.push(effect);
      }
    }
    
    assignments.push(sectionEffects);
  }
  
  return assignments;
};

// GSAP Animation Helpers
export const animateOnScroll = (element, animation, trigger = null) => {
  if (typeof window === "undefined") return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger || element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });

  tl.fromTo(element, animation.from, animation.to);
  return tl;
};

export const createParallaxEffect = (elements, speeds = [0.5, 0.8, 1.2]) => {
  if (typeof window === "undefined") return;

  elements.forEach((element, index) => {
    const speed = speeds[index] || 0.5;
    
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
};

export const createFloatingAnimation = (element, options = {}) => {
  const {
    duration = 3,
    yOffset = 10,
    rotation = 5,
    scale = 0.05,
  } = options;

  return gsap.to(element, {
    y: yOffset,
    rotation: rotation,
    scale: 1 + scale,
    duration: duration,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
  });
};

export const createTypingEffect = (element, text, options = {}) => {
  const {
    duration = 2,
    cursor = true,
    cursorChar = "|",
  } = options;

  if (typeof window === "undefined") return;

  const chars = text.split("");
  element.textContent = "";
  
  if (cursor) {
    element.style.borderRight = `2px solid currentColor`;
  }

  const tl = gsap.timeline();
  
  chars.forEach((char, index) => {
    tl.to(element, {
      duration: duration / chars.length,
      ease: "none",
      onUpdate: function() {
        const progress = this.progress();
        const currentIndex = Math.floor(progress * chars.length);
        element.textContent = chars.slice(0, currentIndex + 1).join("");
      },
    });
  });

  if (cursor) {
    tl.to(element, {
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      onUpdate: function() {
        element.style.borderRightColor = this.progress() > 0.5 ? "transparent" : "currentColor";
      },
    });
  }

  return tl;
};

export const create3DTiltEffect = (element, options = {}) => {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
  } = options;

  if (typeof window === "undefined") return;

  element.style.transformStyle = "preserve-3d";
  element.style.perspective = `${perspective}px`;

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * maxTilt;
    const rotateY = ((centerX - x) / centerX) * maxTilt;

    gsap.to(element, {
      duration: 0.3,
      rotationX: rotateX,
      rotationY: rotateY,
      scale: scale,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      duration: 0.5,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      ease: "power2.out",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

export const createMatrixEffect = (container, options = {}) => {
  const {
    characters = "01",
    fontSize = 14,
    columns = 50,
    speed = 50,
  } = options;

  if (typeof window === "undefined") return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "-1";
  
  container.appendChild(canvas);

  const drops = Array(columns).fill(1);

  const draw = () => {
    ctx.fillStyle = "rgba(15, 15, 35, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00FFFF";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters[Math.floor(Math.random() * characters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  };

  const interval = setInterval(draw, speed);

  return () => {
    clearInterval(interval);
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
};

// Performance optimization utilities
export const shouldUseReducedMotion = () => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};

export const optimizeForDevice = (animations) => {
  const isMobile = isMobileDevice();
  const reducedMotion = shouldUseReducedMotion();

  if (reducedMotion) {
    return animations.filter(anim => anim.essential);
  }

  if (isMobile) {
    return animations.filter(anim => anim.mobile !== false);
  }

  return animations;
};

export default {
  ANIMATION_PRESETS,
  FX_EFFECTS,
  assignRandomFX,
  animateOnScroll,
  createParallaxEffect,
  createFloatingAnimation,
  createTypingEffect,
  create3DTiltEffect,
  createMatrixEffect,
  shouldUseReducedMotion,
  isMobileDevice,
  optimizeForDevice,
};
