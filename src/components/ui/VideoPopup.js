"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import Button from "./Button";

const VideoPopup = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef();

  // Demo steps for the auto-running simulation
  const demoSteps = [
    {
      title: "Upload Receipt",
      description: "AI instantly extracts warranty information",
      duration: 3000,
      visual: "upload"
    },
    {
      title: "AI Processing",
      description: "Smart extraction of product details and warranty terms",
      duration: 2500,
      visual: "processing"
    },
    {
      title: "Smart Categorization",
      description: "Automatically organizes by product type and expiration",
      duration: 2000,
      visual: "categorize"
    },
    {
      title: "Reminder Setup",
      description: "Intelligent alerts before warranty expiration",
      duration: 2500,
      visual: "reminder"
    },
    {
      title: "Dashboard Overview",
      description: "Complete warranty portfolio at a glance",
      duration: 3000,
      visual: "dashboard"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isOpen && isPlaying) {
      const stepDuration = demoSteps[currentStep]?.duration || 3000;
      
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (stepDuration / 100));
          if (newProgress >= 100) {
            setCurrentStep(prevStep => {
              const nextStep = (prevStep + 1) % demoSteps.length;
              return nextStep;
            });
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isOpen, isPlaying, currentStep, demoSteps]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(true);
  };

  // Auto-start when popup opens
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setCurrentStep(0);
      setProgress(0);
    } else {
      setIsPlaying(false);
      setCurrentStep(0);
      setProgress(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isOpen]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case ' ':
        case 'k':
          event.preventDefault();
          handlePlayPause();
          break;
        case 'r':
          event.preventDefault();
          handleRestart();
          break;
        case 'm':
          event.preventDefault();
          setIsMuted(prev => !prev);
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const renderVisual = (visual) => {
    const baseClasses = "w-full h-48 rounded-lg flex items-center justify-center text-white font-semibold text-lg";
    
    switch (visual) {
      case "upload":
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-blue-600 to-blue-800`}>
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white border-dashed rounded-lg mx-auto mb-4 flex items-center justify-center">
                📄
              </div>
              <div>Receipt Upload</div>
            </div>
          </div>
        );
      case "processing":
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-purple-600 to-purple-800`}>
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white rounded-full mx-auto mb-4 animate-spin border-t-transparent"></div>
              <div>AI Processing...</div>
            </div>
          </div>
        );
      case "categorize":
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-green-600 to-green-800`}>
            <div className="text-center">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-6 h-6 bg-white rounded opacity-80"></div>
                ))}
              </div>
              <div>Smart Categories</div>
            </div>
          </div>
        );
      case "reminder":
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-orange-600 to-orange-800`}>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-orange-600 text-2xl">
                🔔
              </div>
              <div>Smart Reminders</div>
            </div>
          </div>
        );
      case "dashboard":
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-cyan-600 to-cyan-800`}>
            <div className="text-center">
              <div className="grid grid-cols-3 gap-1 mb-4">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="w-4 h-4 bg-white rounded opacity-80"></div>
                ))}
              </div>
              <div>Dashboard View</div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} bg-gradient-to-br from-gray-600 to-gray-800`}>
            Demo Content
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Popup Content */}
        <motion.div
          className="relative bg-neutral-900 rounded-2xl border border-neutral-700 max-w-2xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-700">
            <div>
              <h3 className="text-xl font-bold text-white">WarrantyAI Demo</h3>
              <p className="text-neutral-400 text-sm">See how it works in 60 seconds</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<X className="w-5 h-5" />}
              onClick={onClose}
              className="text-neutral-400 hover:text-white"
            />
          </div>

          {/* Video Content */}
          <div className="p-6">
            {/* Current Step Visual */}
            <div className="mb-6">
              {renderVisual(demoSteps[currentStep]?.visual)}
            </div>

            {/* Step Info */}
            <div className="mb-6 text-center">
              <h4 className="text-lg font-semibold text-white mb-2">
                {demoSteps[currentStep]?.title}
              </h4>
              <p className="text-neutral-400">
                {demoSteps[currentStep]?.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-neutral-400 mb-2">
                <span>Step {currentStep + 1} of {demoSteps.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-neutral-700 rounded-full h-2">
                <motion.div
                  className="bg-primary-cyan h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                icon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                onClick={handlePlayPause}
              />
              <Button
                variant="ghost"
                size="sm"
                icon={<RotateCcw className="w-4 h-4" />}
                onClick={handleRestart}
              />
              <Button
                variant="ghost"
                size="sm"
                icon={isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                onClick={() => setIsMuted(!isMuted)}
              />
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <Button
                variant="primary"
                size="lg"
                href="/demo"
                className="w-full"
              >
                Try Interactive Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPopup;
