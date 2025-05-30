"use client";

import { motion } from "framer-motion";
import { Shield, FileText, CheckCircle, AlertCircle } from "lucide-react";

const ClaimAssistantDemo = ({ isActive, isPlaying, onComplete, demoState, setDemoState }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Warranty Claim Assistant</h3>
        <p className="text-neutral-400">Step-by-step guidance for warranty claims</p>
      </div>

      <div className="space-y-4">
        {[
          { icon: AlertCircle, title: "Report Issue", desc: "Describe the problem with your item", status: "completed" },
          { icon: Shield, title: "Eligibility Check", desc: "AI analyzes warranty coverage", status: "completed" },
          { icon: FileText, title: "Generate Documents", desc: "Auto-create claim forms", status: "active" },
          { icon: CheckCircle, title: "Submit Claim", desc: "Send to manufacturer", status: "pending" },
        ].map((step, index) => (
          <motion.div
            key={step.title}
            className={`flex items-center space-x-4 p-4 rounded-lg border ${
              step.status === "completed" 
                ? "border-accent-green bg-accent-green/10"
                : step.status === "active"
                ? "border-primary-cyan bg-primary-cyan/10"
                : "border-neutral-700 bg-neutral-800/30"
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <step.icon className={`w-6 h-6 ${
              step.status === "completed" 
                ? "text-accent-green"
                : step.status === "active"
                ? "text-primary-cyan"
                : "text-neutral-500"
            }`} />
            <div>
              <h4 className="font-semibold text-white">{step.title}</h4>
              <p className="text-sm text-neutral-400">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-neutral-400">Claim assistant demo - Full version coming soon!</p>
      </div>
    </div>
  );
};

export default ClaimAssistantDemo;
