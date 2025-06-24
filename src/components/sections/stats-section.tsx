"use client";

import dynamic from 'next/dynamic';
import { Briefcase, CheckCircle, Building, Activity } from "lucide-react";
import { motion } from "framer-motion";

// Lazy load the AnimatedCounter component
const AnimatedCounter = dynamic(() => import("@/components/shared/animated-counter"), {
  ssr: false,
  loading: ({ count }) => <span className="text-5xl font-bold text-primary mb-2">{count}</span>
});

const statsData = [
  { count: 113, label: "Proyectos Completados", icon: <Briefcase className="h-10 w-10 text-primary" /> },
  { count: 42, label: "Optimizaciones de Servicios", icon: <CheckCircle className="h-10 w-10 text-primary" /> },
  { count: 3, label: "Empresas Auditadas", icon: <Building className="h-10 w-10 text-primary" /> },
  { count: 9, label: "Proyectos en Curso", icon: <Activity className="h-10 w-10 text-primary" /> },
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
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-background p-8 rounded-xl shadow-lg text-center flex flex-col items-center transform hover:scale-102 transition-transform duration-300"
            >
              <div className="mb-4">{stat.icon}</div>
              <AnimatedCounter to={stat.count} className="text-5xl font-bold text-primary mb-2" />
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
