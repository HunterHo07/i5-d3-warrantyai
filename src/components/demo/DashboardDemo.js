"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import Card from "@/components/ui/Card";

const DashboardDemo = ({ isActive, isPlaying, onComplete, demoState, setDemoState }) => {
  const stats = [
    { label: "Total Items", value: "12", icon: BarChart3, color: "text-primary-blue" },
    { label: "Active Warranties", value: "8", icon: CheckCircle, color: "text-accent-green" },
    { label: "Expiring Soon", value: "2", icon: AlertTriangle, color: "text-accent-orange" },
    { label: "Total Value", value: "$15,420", icon: TrendingUp, color: "text-primary-cyan" },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Smart Dashboard</h3>
        <p className="text-neutral-400">Your warranty overview at a glance</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card variant="glass" className="text-center p-4">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-neutral-400">Dashboard demo - Full version coming soon!</p>
      </div>
    </div>
  );
};

export default DashboardDemo;
