"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { 
  AlertTriangle, 
  Clock, 
  FileX, 
  DollarSign,
  Brain,
  Zap,
  Shield,
  Smartphone,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// Matrix Effect Component
const MatrixEffect = ({ isVisible }) => {
  const canvasRef = useRef();
  const [animationId, setAnimationId] = useState(null);

  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const characters = "01";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
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

    const interval = setInterval(draw, 50);
    setAnimationId(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = useRef();
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, end, duration]);

  return (
    <span ref={ref} className="font-bold text-2xl gradient-text">
      {count}{suffix}
    </span>
  );
};

const ProblemSolutionSection = () => {
  const sectionRef = useRef();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const problems = [
    {
      icon: FileX,
      title: "Lost Receipts",
      description: "73% of consumers lose receipts within 6 months",
      stat: "73%",
      color: "text-accent-red",
    },
    {
      icon: Clock,
      title: "Forgotten Dates",
      description: "68% forget warranty expiration dates",
      stat: "68%",
      color: "text-accent-orange",
    },
    {
      icon: DollarSign,
      title: "Missed Claims",
      description: "$2.1B in unclaimed warranty benefits annually",
      stat: "$2.1B",
      color: "text-accent-red",
    },
    {
      icon: AlertTriangle,
      title: "Manual Tracking",
      description: "Average household has 25+ items to track",
      stat: "25+",
      color: "text-accent-orange",
    },
  ];

  const solutions = [
    {
      icon: Brain,
      title: "AI-Powered Extraction",
      description: "Automatically extract warranty info from receipts and photos with 99.2% accuracy",
      features: ["OCR Technology", "Smart Recognition", "Multi-format Support"],
      color: "text-primary-blue",
    },
    {
      icon: Zap,
      title: "Smart Reminders",
      description: "Never miss warranty expiration or service dates with intelligent notifications",
      features: ["Predictive Alerts", "Custom Schedules", "Multi-channel Notifications"],
      color: "text-primary-cyan",
    },
    {
      icon: Shield,
      title: "Comprehensive Protection",
      description: "Track warranties across electronics, home, automotive, and furniture",
      features: ["All Categories", "3D Visualization", "Family Sharing"],
      color: "text-primary-purple",
    },
    {
      icon: Smartphone,
      title: "Seamless Integration",
      description: "Connect with email, cloud storage, and smart home devices",
      features: ["Email Sync", "Cloud Backup", "API Access"],
      color: "text-primary-pink",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section 
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden"
    >
      {/* Matrix Background Effect */}
      <MatrixEffect isVisible={isInView} />
      
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent-red/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-accent-red/20 border border-accent-red/30 rounded-full text-accent-red text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>The Problem is Real</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
            <span className="text-white">Warranty Management is</span>
            <br />
            <span className="gradient-text-secondary">Broken & Costly</span>
          </h2>

          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            Billions of dollars in warranty benefits go unclaimed every year because people lose receipts, 
            forget dates, and struggle with manual tracking systems.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {problems.map((problem, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
                variant="glass" 
                hover={true} 
                glow={true}
                className="h-full text-center group"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className={`p-4 rounded-full bg-neutral-800/50 group-hover:scale-110 transition-transform duration-300`}>
                    <problem.icon className={`w-8 h-8 ${problem.color}`} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold gradient-text">
                      <AnimatedCounter 
                        end={parseInt(problem.stat.replace(/[^0-9]/g, ""))} 
                        suffix={problem.stat.replace(/[0-9]/g, "")}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-neutral-400">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-blue/20 border border-primary-blue/30 rounded-full text-primary-cyan text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Our AI-Powered Solution</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">Intelligent Warranty</span>
            <br />
            <span className="text-white">Management System</span>
          </h2>

          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            WarrantyAI uses advanced AI to automatically track, manage, and protect all your warranties. 
            Never lose money on expired coverage again.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {solutions.map((solution, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card 
                variant="feature" 
                hover={true} 
                glow={true}
                className="h-full group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-neutral-800/50 group-hover:scale-110 transition-transform duration-300`}>
                    <solution.icon className={`w-6 h-6 ${solution.color}`} />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold text-white">
                      {solution.title}
                    </h3>
                    <p className="text-neutral-300">
                      {solution.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2 text-sm text-neutral-400">
                          <CheckCircle className="w-4 h-4 text-accent-green" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              href="/demo"
            >
              See Solution in Action
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              href="/features"
            >
              Explore Features
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
