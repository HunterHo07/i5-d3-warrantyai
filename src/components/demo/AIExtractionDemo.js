"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, Loader2, CheckCircle, FileText } from "lucide-react";

const AIExtractionDemo = ({ isActive, isPlaying, onComplete, demoState, setDemoState }) => {
  const [extractionStep, setExtractionStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const extractionSteps = [
    { title: "Scanning Receipt", description: "Analyzing image quality and text regions" },
    { title: "OCR Processing", description: "Converting image text to digital format" },
    { title: "Data Extraction", description: "Identifying product and warranty information" },
    { title: "Validation", description: "Verifying extracted data accuracy" },
    { title: "Complete", description: "Warranty information successfully extracted" },
  ];

  useEffect(() => {
    if (isPlaying && demoState.uploadedFile) {
      startExtraction();
    }
  }, [isPlaying, demoState.uploadedFile]);

  const startExtraction = async () => {
    setIsProcessing(true);
    setExtractionStep(0);

    // Simulate AI extraction process
    for (let i = 0; i < extractionSteps.length - 1; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setExtractionStep(i + 1);
    }

    // Simulate extracted data
    const mockExtractedData = {
      product: "iPhone 15 Pro",
      brand: "Apple",
      model: "A3108",
      purchaseDate: "2024-01-15",
      warrantyPeriod: "1 year",
      warrantyExpiry: "2025-01-15",
      price: "$999.00",
      store: "Apple Store",
      confidence: 0.95,
    };

    setExtractedData(mockExtractedData);
    setIsProcessing(false);
    
    // Update demo state
    const newState = { ...demoState };
    newState.extractedData = mockExtractedData;
    setDemoState(newState);
    
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">
          AI Extraction Process
        </h3>
        <p className="text-neutral-400">
          Watch our AI analyze and extract warranty information from your receipt
        </p>
      </div>

      {/* Extraction Steps */}
      <div className="space-y-4">
        {extractionSteps.map((step, index) => (
          <motion.div
            key={index}
            className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-500 ${
              index === extractionStep && isProcessing
                ? "border-primary-cyan bg-primary-cyan/10"
                : index < extractionStep
                ? "border-accent-green bg-accent-green/10"
                : "border-neutral-700 bg-neutral-800/30"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex-shrink-0">
              {index < extractionStep ? (
                <CheckCircle className="w-6 h-6 text-accent-green" />
              ) : index === extractionStep && isProcessing ? (
                <Loader2 className="w-6 h-6 text-primary-cyan animate-spin" />
              ) : (
                <Brain className="w-6 h-6 text-neutral-500" />
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-white">{step.title}</h4>
              <p className="text-sm text-neutral-400">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Extracted Data Preview */}
      {extractedData && (
        <motion.div
          className="bg-neutral-800/50 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-primary-cyan" />
            <h4 className="font-semibold text-white">Extracted Information</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            {Object.entries(extractedData).map(([key, value]) => (
              <div key={key}>
                <span className="text-neutral-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="text-white ml-2">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AIExtractionDemo;
