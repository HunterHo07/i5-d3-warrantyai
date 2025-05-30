"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle,
  Clock,
  Upload,
  Brain,
  Bell,
  Shield,
  Box,
  FileText,
  Wrench
} from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { demoData } from "@/lib/storage";
import { aiExtraction, smartReminders } from "@/lib/ai-simulation";

// Demo Level Components
import ReceiptUploadDemo from "@/components/demo/ReceiptUploadDemo";
import AIExtractionDemo from "@/components/demo/AIExtractionDemo";
import DashboardDemo from "@/components/demo/DashboardDemo";
import ReminderSystemDemo from "@/components/demo/ReminderSystemDemo";
import Inventory3DDemo from "@/components/demo/Inventory3DDemo";
import ClaimAssistantDemo from "@/components/demo/ClaimAssistantDemo";
import ServiceTrackingDemo from "@/components/demo/ServiceTrackingDemo";

const DEMO_LEVELS = [
  {
    id: "receipt-upload",
    title: "Receipt Upload Simulation",
    description: "Upload a receipt photo and watch AI extract warranty information",
    icon: Upload,
    color: "text-primary-blue",
    component: ReceiptUploadDemo,
    duration: "30 seconds",
    difficulty: "Easy",
  },
  {
    id: "ai-extraction",
    title: "AI Extraction Process",
    description: "See how our AI processes and extracts warranty data",
    icon: Brain,
    color: "text-primary-cyan",
    component: AIExtractionDemo,
    duration: "45 seconds",
    difficulty: "Easy",
  },
  {
    id: "dashboard-overview",
    title: "Smart Dashboard",
    description: "Explore your warranty dashboard with real-time insights",
    icon: FileText,
    color: "text-primary-purple",
    component: DashboardDemo,
    duration: "60 seconds",
    difficulty: "Medium",
  },
  {
    id: "reminder-system",
    title: "Smart Reminder System",
    description: "Set up intelligent reminders for warranties and maintenance",
    icon: Bell,
    color: "text-primary-pink",
    component: ReminderSystemDemo,
    duration: "45 seconds",
    difficulty: "Easy",
  },
  {
    id: "3d-inventory",
    title: "3D Room Inventory",
    description: "Visualize your items in a 3D room layout",
    icon: Box,
    color: "text-accent-green",
    component: Inventory3DDemo,
    duration: "90 seconds",
    difficulty: "Advanced",
  },
  {
    id: "claim-assistant",
    title: "Warranty Claim Assistant",
    description: "Get step-by-step help with warranty claims",
    icon: Shield,
    color: "text-accent-orange",
    component: ClaimAssistantDemo,
    duration: "75 seconds",
    difficulty: "Medium",
  },
  {
    id: "service-tracking",
    title: "Service Tracking",
    description: "Track maintenance schedules and service history",
    icon: Wrench,
    color: "text-accent-red",
    component: ServiceTrackingDemo,
    duration: "60 seconds",
    difficulty: "Medium",
  },
];

// Demo Progress Component
const DemoProgress = ({ currentLevel, totalLevels, onLevelSelect }) => {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
      {Array.from({ length: totalLevels }).map((_, index) => (
        <motion.button
          key={index}
          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
            index < currentLevel
              ? "bg-accent-green border-accent-green text-white"
              : index === currentLevel
              ? "bg-primary-cyan border-primary-cyan text-white"
              : "border-neutral-600 text-neutral-400 hover:border-neutral-500"
          }`}
          onClick={() => onLevelSelect(index)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {index < currentLevel ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            index + 1
          )}
        </motion.button>
      ))}
    </div>
  );
};

// Demo Level Card Component
const DemoLevelCard = ({ level, isActive, isCompleted, onClick }) => {
  return (
    <motion.div
      className="cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        variant={isActive ? "neon" : isCompleted ? "feature" : "glass"}
        hover={true}
        glow={isActive}
        className={`h-full transition-all duration-500 ${
          isActive ? "scale-105 shadow-2xl shadow-primary-cyan/20" : ""
        }`}
      >
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${
            isCompleted 
              ? "bg-accent-green/20 border border-accent-green/30" 
              : isActive
              ? "bg-primary-cyan/20 border border-primary-cyan/30"
              : "bg-neutral-800/50"
          }`}>
            {isCompleted ? (
              <CheckCircle className="w-6 h-6 text-accent-green" />
            ) : (
              <level.icon className={`w-6 h-6 ${level.color}`} />
            )}
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {level.title}
              </h3>
              <div className="flex items-center space-x-2 text-xs">
                <Clock className="w-3 h-3 text-neutral-500" />
                <span className="text-neutral-500">{level.duration}</span>
              </div>
            </div>
            
            <p className="text-neutral-400 text-sm">
              {level.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded-full ${
                level.difficulty === "Easy" 
                  ? "bg-accent-green/20 text-accent-green"
                  : level.difficulty === "Medium"
                  ? "bg-accent-orange/20 text-accent-orange"
                  : "bg-accent-red/20 text-accent-red"
              }`}>
                {level.difficulty}
              </span>
              
              {isActive && (
                <motion.div
                  className="flex items-center space-x-1 text-primary-cyan text-xs"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Play className="w-3 h-3" />
                  <span>Active</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const DemoPage = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [completedLevels, setCompletedLevels] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [demoState, setDemoState] = useState({});

  // Initialize demo data
  useEffect(() => {
    const savedState = demoData.load();
    setDemoState(savedState);
  }, []);

  const handleLevelComplete = () => {
    setCompletedLevels(prev => new Set([...prev, currentLevel]));
    if (currentLevel < DEMO_LEVELS.length - 1) {
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1);
      }, 1000);
    }
  };

  const handleLevelSelect = (levelIndex) => {
    setCurrentLevel(levelIndex);
    setIsPlaying(false);
  };

  const nextLevel = () => {
    if (currentLevel < DEMO_LEVELS.length - 1) {
      setCurrentLevel(prev => prev + 1);
    }
  };

  const prevLevel = () => {
    if (currentLevel > 0) {
      setCurrentLevel(prev => prev - 1);
    }
  };

  const resetDemo = () => {
    setCurrentLevel(0);
    setCompletedLevels(new Set());
    setIsPlaying(false);
    demoData.clear();
    setDemoState(demoData.load());
  };

  const currentDemoLevel = DEMO_LEVELS[currentLevel];
  const CurrentDemoComponent = currentDemoLevel?.component;

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Navigation */}
      <Navigation />
      
      {/* Demo Header */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-blue/20 border border-primary-blue/30 rounded-full text-primary-cyan text-sm font-medium mb-6">
              <Play className="w-4 h-4" />
              <span>Interactive Demo Experience</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-6">
              <span className="gradient-text">Experience WarrantyAI</span>
              <br />
              <span className="text-white">In Action</span>
            </h1>

            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Explore our complete warranty management system through 7 interactive demo levels. 
              See how AI-powered protection works in real-time.
            </p>

            {/* Demo Progress */}
            <DemoProgress
              currentLevel={currentLevel}
              totalLevels={DEMO_LEVELS.length}
              onLevelSelect={handleLevelSelect}
            />
          </motion.div>
        </div>
      </section>

      {/* Main Demo Area */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Demo Levels Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Demo Levels</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<RotateCcw className="w-4 h-4" />}
                  onClick={resetDemo}
                >
                  Reset
                </Button>
              </div>

              {DEMO_LEVELS.map((level, index) => (
                <DemoLevelCard
                  key={level.id}
                  level={level}
                  isActive={index === currentLevel}
                  isCompleted={completedLevels.has(index)}
                  onClick={() => handleLevelSelect(index)}
                />
              ))}
            </div>

            {/* Main Demo Content */}
            <div className="lg:col-span-3">
              <Card variant="gradient" size="lg" className="h-full min-h-[600px]">
                {/* Demo Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {currentDemoLevel?.title}
                    </h3>
                    <p className="text-neutral-400">
                      {currentDemoLevel?.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<ArrowLeft className="w-4 h-4" />}
                      onClick={prevLevel}
                      disabled={currentLevel === 0}
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<ArrowRight className="w-4 h-4" />}
                      onClick={nextLevel}
                      disabled={currentLevel === DEMO_LEVELS.length - 1}
                    />
                  </div>
                </div>

                {/* Demo Component */}
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    {CurrentDemoComponent && (
                      <motion.div
                        key={currentLevel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CurrentDemoComponent
                          isActive={true}
                          isPlaying={isPlaying}
                          onComplete={handleLevelComplete}
                          demoState={demoState}
                          setDemoState={setDemoState}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Demo Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-neutral-700/50">
                  <div className="text-sm text-neutral-400">
                    Level {currentLevel + 1} of {DEMO_LEVELS.length} • {currentDemoLevel?.difficulty}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {completedLevels.has(currentLevel) && (
                      <div className="flex items-center space-x-2 text-accent-green text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    )}
                    
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={nextLevel}
                      disabled={currentLevel === DEMO_LEVELS.length - 1}
                    >
                      Next Level
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="py-16 bg-gradient-to-br from-neutral-800 to-neutral-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to protect your warranties?
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Experience the full power of WarrantyAI with your own items. 
              Start your free trial today.
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
                href="/"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;
