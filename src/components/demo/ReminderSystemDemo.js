"use client";

import { motion } from "framer-motion";
import { Bell, Calendar, Mail, Smartphone } from "lucide-react";

const ReminderSystemDemo = ({ isActive, isPlaying, onComplete, demoState, setDemoState }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Smart Reminder System</h3>
        <p className="text-neutral-400">Never miss a warranty expiration again</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: Bell, title: "Push Notifications", desc: "Real-time alerts" },
          { icon: Mail, title: "Email Reminders", desc: "Weekly summaries" },
          { icon: Smartphone, title: "SMS Alerts", desc: "Critical reminders" },
          { icon: Calendar, title: "Calendar Sync", desc: "Google/Outlook integration" },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            className="p-4 bg-neutral-800/50 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <item.icon className="w-8 h-8 text-primary-cyan mx-auto mb-2" />
            <h4 className="font-semibold text-white">{item.title}</h4>
            <p className="text-sm text-neutral-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-neutral-400">Reminder system demo - Full version coming soon!</p>
      </div>
    </div>
  );
};

export default ReminderSystemDemo;
