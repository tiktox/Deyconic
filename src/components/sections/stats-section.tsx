"use client";

import dynamic from 'next/dynamic';
import { Briefcase, CheckCircle, Building, Activity } from "lucide-react";
import { motion } from "framer-motion";

// Lazy load the AnimatedCounter component
const AnimatedCounter = dynamic(() => import("@/components/shared/animated-counter"), {
  ssr: false,
  loading: () => <span className="text-2xl font-bold text-primary mb-1">0</span>
});

const statsData = [
  { count: 113, label: "Proyectos Completados", icon: <Briefcase className="h-6 w-6 text-primary" /> },
  { count: 42, label: "Optimizaciones de Servicios", icon: <CheckCircle className="h-6 w-6 text-primary" /> },
  { count: 3, label: "Empresas Auditadas", icon: <Building className="h-6 w-6 text-primary" /> },
  { count: 9, label: "Proyectos en Curso", icon: <Activity className="h-6 w-6 text-primary" /> },
];

// Simplified animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export default function StatsSection() {
  return (
    <section className="home-stats-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="bg-[#101010] border border-black p-4 rounded-lg shadow-md text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-200"
            >
              <div className="mb-2">{stat.icon}</div>
              <AnimatedCounter to={stat.count} className="text-2xl font-bold text-primary mb-1" />
              <p className="text-sm text-white/75">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
