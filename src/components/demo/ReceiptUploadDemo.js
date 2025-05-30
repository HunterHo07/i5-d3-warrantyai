"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { 
  Upload, 
  FileImage, 
  CheckCircle, 
  Loader2,
  X,
  Camera,
  Smartphone
} from "lucide-react";
import Button from "@/components/ui/Button";
import { fileSimulation } from "@/lib/storage";

const ReceiptUploadDemo = ({ isActive, isPlaying, onComplete, demoState, setDemoState }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Sample receipt images for demo
  const sampleReceipts = [
    {
      id: 1,
      name: "iPhone Receipt",
      preview: "/demo/receipt-iphone.jpg",
      type: "Electronics",
    },
    {
      id: 2,
      name: "Laptop Receipt",
      preview: "/demo/receipt-laptop.jpg",
      type: "Electronics",
    },
    {
      id: 3,
      name: "Appliance Receipt",
      preview: "/demo/receipt-appliance.jpg",
      type: "Appliances",
    },
  ];

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate file upload
      const uploadedFileData = await fileSimulation.uploadFile(file);
      setUploadedFile(uploadedFileData);
      
      // Update demo state
      const newState = { ...demoState };
      newState.uploadedFile = uploadedFileData;
      setDemoState(newState);
      
      setIsCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  }, [demoState, setDemoState, onComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.heic']
    },
    maxFiles: 1,
    disabled: isUploading || isCompleted
  });

  const handleSampleUpload = async (sample) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 15;
      });
    }, 150);

    // Simulate file upload with sample data
    setTimeout(() => {
      const sampleFileData = {
        id: Date.now().toString(),
        name: sample.name,
        type: "image/jpeg",
        url: sample.preview,
        uploadedAt: new Date().toISOString(),
      };

      setUploadedFile(sampleFileData);
      
      // Update demo state
      const newState = { ...demoState };
      newState.uploadedFile = sampleFileData;
      setDemoState(newState);
      
      setIsUploading(false);
      setIsCompleted(true);
      
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 2000);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <AnimatePresence mode="wait">
        {!uploadedFile ? (
          <motion.div
            key="upload-area"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Drag & Drop Zone */}
            <div
              {...getRootProps()}
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                isDragActive
                  ? "border-primary-cyan bg-primary-cyan/10"
                  : isUploading
                  ? "border-neutral-600 bg-neutral-800/50"
                  : "border-neutral-600 hover:border-primary-cyan hover:bg-primary-cyan/5"
              }`}
            >
              <input {...getInputProps()} />
              
              <div className="space-y-4">
                <motion.div
                  className="flex justify-center"
                  animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                >
                  {isUploading ? (
                    <Loader2 className="w-12 h-12 text-primary-cyan animate-spin" />
                  ) : (
                    <Upload className="w-12 h-12 text-neutral-400" />
                  )}
                </motion.div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {isUploading 
                      ? "Uploading Receipt..." 
                      : isDragActive 
                      ? "Drop your receipt here" 
                      : "Upload Receipt Photo"
                    }
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    {isUploading 
                      ? "Processing your receipt image"
                      : "Drag & drop or click to select a receipt image"
                    }
                  </p>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="w-full max-w-xs mx-auto">
                    <div className="flex justify-between text-sm text-neutral-400 mb-2">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-neutral-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary-blue to-primary-cyan h-2 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {/* Supported Formats */}
                {!isUploading && (
                  <div className="flex items-center justify-center space-x-4 text-xs text-neutral-500">
                    <span>Supports: JPG, PNG, HEIC</span>
                    <span>•</span>
                    <span>Max 10MB</span>
                  </div>
                )}
              </div>
            </div>

            {/* Sample Receipts */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-px bg-neutral-700 flex-1" />
                <span className="text-neutral-400 text-sm px-3">Or try a sample receipt</span>
                <div className="h-px bg-neutral-700 flex-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sampleReceipts.map((sample) => (
                  <motion.button
                    key={sample.id}
                    className="p-4 border border-neutral-700 rounded-lg hover:border-primary-cyan hover:bg-primary-cyan/5 transition-all duration-300 text-left"
                    onClick={() => handleSampleUpload(sample)}
                    disabled={isUploading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-neutral-800 rounded-lg">
                        <FileImage className="w-5 h-5 text-primary-cyan" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {sample.name}
                        </div>
                        <div className="text-xs text-neutral-400">
                          {sample.type}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-neutral-800/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                <Camera className="w-4 h-4 mr-2 text-primary-cyan" />
                Tips for best results
              </h4>
              <ul className="text-xs text-neutral-400 space-y-1">
                <li>• Ensure the receipt is well-lit and clearly visible</li>
                <li>• Include the entire receipt in the photo</li>
                <li>• Avoid shadows and reflections</li>
                <li>• Higher resolution images work better</li>
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            {/* Success Animation */}
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="p-4 bg-accent-green/20 rounded-full">
                <CheckCircle className="w-12 h-12 text-accent-green" />
              </div>
            </motion.div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Receipt Uploaded Successfully!
              </h3>
              <p className="text-neutral-400">
                Your receipt has been uploaded and is ready for AI processing.
              </p>
            </div>

            {/* File Info */}
            <div className="bg-neutral-800/50 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-cyan/20 rounded-lg">
                  <FileImage className="w-5 h-5 text-primary-cyan" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">
                    {uploadedFile.name}
                  </div>
                  <div className="text-xs text-neutral-400">
                    Uploaded {new Date(uploadedFile.uploadedAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Step Indicator */}
            <motion.div
              className="flex items-center justify-center space-x-2 text-primary-cyan"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Smartphone className="w-4 h-4" />
              <span className="text-sm">Ready for AI extraction →</span>
            </motion.div>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              icon={<X className="w-4 h-4" />}
              onClick={resetUpload}
            >
              Upload Different Receipt
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReceiptUploadDemo;
