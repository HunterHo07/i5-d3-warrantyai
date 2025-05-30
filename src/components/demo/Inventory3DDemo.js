"use client";

import { motion } from "framer-motion";
import { Box, Eye, Layers, RotateCcw } from "lucide-react";

const Inventory3DDemo = ({ isActive, isPlaying, onComplete, demoState, setDemoState }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">3D Room Inventory</h3>
        <p className="text-neutral-400">Visualize your items in 3D space</p>
      </div>

      <div className="bg-neutral-800/30 rounded-lg p-8 text-center">
        <motion.div
          className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-blue to-primary-cyan rounded-lg flex items-center justify-center"
          animate={{ rotateY: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <Box className="w-12 h-12 text-white" />
        </motion.div>
        
        <h4 className="text-lg font-semibold text-white mb-2">3D Visualization</h4>
        <p className="text-neutral-400 mb-4">
          Interactive 3D room layout with your warranty items
        </p>

        <div className="grid grid-cols-3 gap-4 text-sm">
          {[
            { icon: Eye, label: "AR View" },
            { icon: Layers, label: "Room Layers" },
            { icon: RotateCcw, label: "360° Rotation" },
          ].map((feature, index) => (
            <div key={feature.label} className="text-center">
              <feature.icon className="w-6 h-6 text-primary-cyan mx-auto mb-1" />
              <span className="text-neutral-400">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <p className="text-neutral-400">3D inventory demo - Full version coming soon!</p>
      </div>
    </div>
  );
};

export default Inventory3DDemo;
