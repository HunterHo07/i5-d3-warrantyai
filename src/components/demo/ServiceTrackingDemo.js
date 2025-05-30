"use client";

import { motion } from "framer-motion";
import { Wrench, Calendar, Clock, TrendingUp } from "lucide-react";

const ServiceTrackingDemo = ({ isActive, isPlaying, onComplete, demoState, setDemoState }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Service Tracking</h3>
        <p className="text-neutral-400">Track maintenance schedules and service history</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Calendar, title: "Schedule Service", desc: "Automated scheduling", color: "text-primary-blue" },
          { icon: Clock, title: "Service History", desc: "Complete timeline", color: "text-primary-cyan" },
          { icon: Wrench, title: "Maintenance Alerts", desc: "Proactive reminders", color: "text-accent-orange" },
          { icon: TrendingUp, title: "Cost Tracking", desc: "Service analytics", color: "text-accent-green" },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            className="p-4 bg-neutral-800/50 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2`} />
            <h4 className="font-semibold text-white">{item.title}</h4>
            <p className="text-sm text-neutral-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-neutral-400">Service tracking demo - Full version coming soon!</p>
      </div>
    </div>
  );
};

export default ServiceTrackingDemo;
