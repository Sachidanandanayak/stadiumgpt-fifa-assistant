import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  strong?: boolean;
}

export default function GlassCard({ children, className = '', delay = 0, strong = false }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      className={`${strong ? 'glass-strong' : 'glass'} rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
