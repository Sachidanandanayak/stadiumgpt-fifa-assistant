import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className="relative w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
    >
      <motion.div
        key={isDark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <Moon className="w-5 h-5 text-fifa-gold" /> : <Sun className="w-5 h-5 text-amber-500" />}
      </motion.div>
    </button>
  );
}
