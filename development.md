# WarrantyAI - Development Specification

## 🛠 Tech Stack & Architecture

### Core Framework
- **Next.js**: v15.3.3 (App Router, Server Components)
- **React**: v19.0.0 (Latest features, concurrent rendering)
- **Tailwind CSS**: v4.0+ (Latest utility-first styling)
- **TypeScript**: Not used (per requirements)

### Animation & Effects Libraries
- **GSAP**: v3.12+ (ScrollTrigger, Timeline animations)
- **Framer Motion**: v10+ (React animations, gestures)
- **Lottie React**: v2.4+ (After Effects animations)
- **React Spring**: v9+ (Physics-based animations)

### 3D & Demo Engines
- **Three.js**: v0.158+ (3D graphics, WebGL)
- **React Three Fiber**: v8+ (React Three.js integration)
- **Phaser 3**: v3.70+ (2D game engine for demos)
- **Cannon.js**: v1.20+ (Physics engine)

### UI & Interaction
- **React Hook Form**: v7+ (Form management)
- **React Dropzone**: v14+ (File upload handling)
- **React Intersection Observer**: v9+ (Scroll triggers)
- **React Virtualized**: v9+ (Performance optimization)

### Data & Storage (Frontend-only)
- **Zustand**: v4+ (State management)
- **React Query**: v4+ (Data fetching simulation)
- **LocalStorage API**: Browser storage
- **IndexedDB**: Complex data storage
- **File API**: File handling

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   ├── page.js            # Home page
│   ├── demo/              # Demo page
│   ├── features/          # Features page
│   ├── pricing/           # Pricing page
│   └── about/             # About page
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── sections/         # Page sections
│   ├── animations/       # Animation components
│   ├── 3d/              # Three.js components
│   └── demo/            # Demo components
├── lib/                  # Utilities & helpers
│   ├── animations.js    # GSAP configurations
│   ├── storage.js       # LocalStorage helpers
│   ├── ai-simulation.js # AI extraction simulation
│   └── constants.js     # App constants
├── data/                # Static data & simulations
│   ├── products.json    # Sample products
│   ├── warranties.json  # Sample warranties
│   └── demo-data.json   # Demo scenarios
└── public/              # Static assets
    ├── models/          # 3D models
    ├── textures/        # 3D textures
    ├── animations/      # Lottie files
    └── images/          # Optimized images
```

## 🎨 Design System & Components

### Color Palette (AI-Inspired Futuristic)
```css
/* Primary Colors */
--primary-blue: #0066FF
--primary-cyan: #00FFFF
--primary-purple: #6366F1
--primary-pink: #EC4899

/* Accent Colors */
--accent-green: #10B981
--accent-orange: #F59E0B
--accent-red: #EF4444

/* Neutral Colors */
--neutral-900: #0F0F23
--neutral-800: #1A1A2E
--neutral-700: #16213E
--neutral-600: #0F3460
--neutral-500: #533A7B
--neutral-400: #9CA3AF
--neutral-300: #D1D5DB
--neutral-200: #E5E7EB
--neutral-100: #F3F4F6
--neutral-50: #F9FAFB

/* Gradient Combinations */
--gradient-primary: linear-gradient(135deg, #0066FF, #00FFFF)
--gradient-secondary: linear-gradient(135deg, #6366F1, #EC4899)
--gradient-accent: linear-gradient(135deg, #10B981, #F59E0B)
```

### Typography Scale
```css
/* Font Families */
--font-primary: 'Inter', system-ui, sans-serif
--font-display: 'Space Grotesk', system-ui, sans-serif
--font-mono: 'JetBrains Mono', monospace

/* Font Sizes */
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem    /* 30px */
--text-4xl: 2.25rem     /* 36px */
--text-5xl: 3rem        /* 48px */
--text-6xl: 3.75rem     /* 60px */
--text-7xl: 4.5rem      /* 72px */
--text-8xl: 6rem        /* 96px */
--text-9xl: 8rem        /* 128px */
```

### Component Library
1. **Buttons**: Primary, Secondary, Ghost, Icon
2. **Cards**: Product, Feature, Testimonial, Pricing
3. **Forms**: Input, Select, Upload, Checkbox
4. **Navigation**: Header, Footer, Sidebar, Breadcrumb
5. **Feedback**: Toast, Modal, Loading, Progress
6. **Data Display**: Table, List, Grid, Stats

## 🎭 Animation & Effects System

### FX Pool Implementation
```javascript
const FX_POOL = {
  // Scroll Effects
  'parallax-scroll': ParallaxScrollEffect,
  'scroll-triggered': ScrollTriggeredEffect,
  'multi-layer-depth': MultiLayerDepthEffect,
  
  // 3D Effects
  '3d-tilt-hover': TiltHoverEffect,
  '3d-product-viewer': ProductViewerEffect,
  'floating-elements': FloatingElementsEffect,
  
  // AI Effects
  'ai-eye-tracker': AIEyeTrackerEffect,
  'ai-response-bubble': AIResponseBubbleEffect,
  'matrix-effect': MatrixEffect,
  
  // Interactive Effects
  'multi-cursor': MultiCursorEffect,
  'ghost-cursors': GhostCursorsEffect,
  'typing-text': TypingTextEffect,
  
  // Visual Effects
  'infinite-zoom': InfiniteZoomEffect,
  'morphing-shapes': MorphingShapesEffect,
  'animated-svgs': AnimatedSVGEffect
}
```

### Effect Assignment Strategy
- **Random Assignment**: Each section gets 1-3 effects from pool
- **Performance Optimization**: Lazy loading, intersection observers
- **Responsive Behavior**: Mobile-optimized versions
- **Accessibility**: Reduced motion support

## 📱 Page Specifications

### 1. HomePage (Priority 1)
**Sections Required:**
- Hero Section (Unique AI-powered design)
- Problem/Solution
- 3-Step Summary
- MVP Feature Preview (3-10 layers)
- Competitor Comparison
- Testimonials & Social Proof
- Value Proposition
- Feature Highlights
- Pricing Plans
- Trust-Building Elements
- Early Adopter Loop
- Feature Carousel

**Effects Assignment:**
- Hero: 3D Product Viewer + AI Eye Tracker + Parallax Scroll
- Problem: Matrix Effect + Scroll Triggered
- Solution: Multi-Layer Depth + Animated SVGs
- Features: Floating Elements + Typing Text
- Pricing: 3D Tilt Hover + Ghost Cursors

### 2. DemoPage (Priority 1)
**Demo Levels:**
1. **Receipt Upload Simulation**
2. **AI Extraction Process**
3. **Dashboard Overview**
4. **Reminder System**
5. **3D Inventory View**
6. **Claim Assistant**
7. **Service Tracking**

**Technical Implementation:**
- Phaser 3 for 2D interactions
- Three.js for 3D inventory
- Real file upload simulation
- LocalStorage data persistence
- Realistic AI processing delays

### 3. Additional Pages (Priority 2)
- **Features**: Detailed feature breakdown
- **Pricing**: Interactive pricing calculator
- **About**: Team, mission, roadmap
- **Contact**: Support and feedback

## 🔧 Development Workflow

### Phase 1: Foundation (Week 1)
1. Install dependencies
2. Setup Tailwind CSS v4 configuration
3. Create basic component library
4. Implement design system
5. Setup animation libraries

### Phase 2: HomePage (Week 2-3)
1. Hero section development
2. Core sections implementation
3. Effect integration
4. Responsive optimization
5. Performance testing

### Phase 3: DemoPage (Week 4-5)
1. Demo engine setup
2. Simulation logic
3. 3D components
4. Interactive elements
5. Data persistence

### Phase 4: Polish & Optimization (Week 6)
1. Cross-browser testing
2. Performance optimization
3. Accessibility improvements
4. Final QA testing
5. Production deployment

## 📊 Performance Targets

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Bundle Size Targets
- **Initial Bundle**: < 250KB gzipped
- **Route Chunks**: < 100KB each
- **Asset Optimization**: WebP images, compressed models

### Animation Performance
- **60 FPS**: Smooth animations on desktop
- **30 FPS**: Acceptable on mobile
- **GPU Acceleration**: Transform and opacity only

## 🔒 Quality Assurance

### Testing Strategy
1. **Component Testing**: Jest + React Testing Library
2. **Visual Testing**: Storybook + Chromatic
3. **E2E Testing**: Playwright
4. **Performance Testing**: Lighthouse CI
5. **Accessibility Testing**: axe-core

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Fallbacks**: Graceful degradation for older browsers

### Deployment Pipeline
1. **Development**: Local development server
2. **Staging**: Vercel preview deployments
3. **Production**: Vercel production deployment
4. **Monitoring**: Real User Monitoring (RUM)

---

**Development Conclusion**: Comprehensive tech stack with focus on performance, accessibility, and cutting-edge visual effects. Modular architecture enables rapid iteration and scalable growth.
