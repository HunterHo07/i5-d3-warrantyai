// WarrantyAI - Application Constants

export const APP_CONFIG = {
  name: "WarrantyAI",
  tagline: "Never miss a warranty again",
  description: "Smart AI assistant for tracking warranties, services, and coverage",
  url: "https://warrantyai.com",
  email: "hello@warrantyai.com",
  version: "1.0.0",
};

export const COLORS = {
  primary: {
    blue: "#0066FF",
    cyan: "#00FFFF",
    purple: "#6366F1",
    pink: "#EC4899",
  },
  accent: {
    green: "#10B981",
    orange: "#F59E0B",
    red: "#EF4444",
  },
  neutral: {
    900: "#0F0F23",
    800: "#1A1A2E",
    700: "#16213E",
    600: "#0F3460",
    500: "#533A7B",
    400: "#9CA3AF",
    300: "#D1D5DB",
    200: "#E5E7EB",
    100: "#F3F4F6",
    50: "#F9FAFB",
  },
};

export const GRADIENTS = {
  primary: "linear-gradient(135deg, #0066FF, #00FFFF)",
  secondary: "linear-gradient(135deg, #6366F1, #EC4899)",
  accent: "linear-gradient(135deg, #10B981, #F59E0B)",
  dark: "linear-gradient(135deg, #0F0F23, #1A1A2E)",
};

export const FONTS = {
  primary: "Inter, system-ui, sans-serif",
  display: "Space Grotesk, system-ui, sans-serif",
  mono: "JetBrains Mono, monospace",
};

export const ANIMATIONS = {
  duration: {
    fast: "0.15s",
    normal: "0.3s",
    slow: "0.5s",
    slower: "0.75s",
  },
  easing: {
    default: "ease",
    in: "ease-in",
    out: "ease-out",
    inOut: "ease-in-out",
  },
};

// FX Pool - Available effects for sections
export const FX_POOL = [
  "parallax-scroll",
  "scroll-triggered",
  "multi-layer-depth",
  "3d-tilt-hover",
  "3d-product-viewer",
  "floating-elements",
  "ai-eye-tracker",
  "ai-response-bubble",
  "matrix-effect",
  "multi-cursor",
  "ghost-cursors",
  "typing-text",
  "infinite-zoom",
  "morphing-shapes",
  "animated-svgs",
  "terminal-typing",
  "scroll-morphing",
  "audio-responsive",
  "carousel-3d",
  "mini-demo-animation",
];

// Navigation Links
export const NAVIGATION = {
  main: [
    { name: "Home", href: "/", active: true },
    { name: "Demo", href: "/demo" },
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Demo", href: "/demo" },
        { name: "Pricing", href: "/pricing" },
        { name: "Roadmap", href: "/roadmap" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Documentation", href: "/docs" },
        { name: "API", href: "/api" },
        { name: "Status", href: "/status" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "Security", href: "/security" },
        { name: "Cookies", href: "/cookies" },
      ],
    },
  ],
};

// Feature Categories
export const FEATURES = {
  core: [
    {
      id: "ai-extraction",
      name: "AI Receipt Extraction",
      description: "Automatically extract warranty info from receipts and photos",
      icon: "Brain",
      color: "blue",
    },
    {
      id: "smart-reminders",
      name: "Smart Reminders",
      description: "Never miss warranty expiration or service dates",
      icon: "Bell",
      color: "cyan",
    },
    {
      id: "3d-inventory",
      name: "3D Inventory",
      description: "Visualize your items in AR/3D room layouts",
      icon: "Box",
      color: "purple",
    },
    {
      id: "claim-assistant",
      name: "Claim Assistant",
      description: "Step-by-step guidance for warranty claims",
      icon: "FileText",
      color: "pink",
    },
  ],
  advanced: [
    {
      id: "email-sync",
      name: "Email Integration",
      description: "Auto-import receipts from Gmail and other email providers",
      icon: "Mail",
      color: "green",
    },
    {
      id: "service-tracking",
      name: "Service Tracking",
      description: "Track maintenance schedules for home and vehicle items",
      icon: "Wrench",
      color: "orange",
    },
    {
      id: "ownership-proof",
      name: "Ownership Verification",
      description: "Blockchain-based ownership proof system",
      icon: "Shield",
      color: "red",
    },
    {
      id: "family-sharing",
      name: "Family Sharing",
      description: "Share warranty information with family members",
      icon: "Users",
      color: "purple",
    },
  ],
};

// Pricing Plans
export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "month",
    description: "Perfect for getting started",
    features: [
      "Manual upload (5 items/month)",
      "Basic reminders",
      "Simple dashboard",
      "Email support",
    ],
    limitations: [
      "Limited to 5 items per month",
      "No AI extraction",
      "No email integration",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    period: "month",
    description: "For individuals and families",
    features: [
      "Unlimited items",
      "AI extraction",
      "Email integration",
      "Advanced reminders",
      "AR/3D features",
      "Priority support",
    ],
    limitations: [],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    id: "family",
    name: "Family",
    price: 19.99,
    period: "month",
    description: "For families and households",
    features: [
      "Everything in Pro",
      "Up to 5 users",
      "Shared household items",
      "Family notifications",
      "Advanced analytics",
      "Phone support",
    ],
    limitations: [],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    id: "business",
    name: "Business",
    price: 99,
    period: "month",
    description: "For businesses and teams",
    features: [
      "Everything in Family",
      "Unlimited users",
      "API access",
      "White-label options",
      "Custom integrations",
      "Dedicated support",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
];

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Homeowner",
    company: "San Francisco, CA",
    content: "WarrantyAI saved me $800 on my refrigerator repair. I completely forgot about the extended warranty until the app reminded me!",
    avatar: "/testimonials/sarah.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    role: "Tech Enthusiast",
    company: "Austin, TX",
    content: "The AI extraction is incredible. I just take a photo of my receipt and everything is automatically organized. Game changer!",
    avatar: "/testimonials/mike.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Small Business Owner",
    company: "Denver, CO",
    content: "Managing warranties for all our office equipment was a nightmare. WarrantyAI made it effortless and we never miss service dates.",
    avatar: "/testimonials/emily.jpg",
    rating: 5,
  },
];

// Statistics
export const STATS = [
  {
    id: "users",
    value: "50,000+",
    label: "Active Users",
    description: "Trust WarrantyAI with their warranties",
  },
  {
    id: "items",
    value: "1.2M+",
    label: "Items Tracked",
    description: "Warranties and services managed",
  },
  {
    id: "savings",
    value: "$2.5M+",
    label: "Money Saved",
    description: "In warranty claims and repairs",
  },
  {
    id: "accuracy",
    value: "99.2%",
    label: "AI Accuracy",
    description: "Receipt extraction precision",
  },
];

// Demo Data Categories
export const DEMO_CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "Smartphone",
    count: 12,
    color: "blue",
  },
  {
    id: "appliances",
    name: "Home Appliances",
    icon: "Home",
    count: 8,
    color: "green",
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "Car",
    count: 3,
    color: "orange",
  },
  {
    id: "furniture",
    name: "Furniture",
    icon: "Sofa",
    count: 6,
    color: "purple",
  },
];

export default {
  APP_CONFIG,
  COLORS,
  GRADIENTS,
  FONTS,
  ANIMATIONS,
  FX_POOL,
  NAVIGATION,
  FEATURES,
  PRICING_PLANS,
  TESTIMONIALS,
  STATS,
  DEMO_CATEGORIES,
};
