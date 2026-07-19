import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function FloatingAssistantButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/assistant') return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => navigate('/assistant')}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-fifa-gold to-amber-600 shadow-2xl shadow-fifa-gold/40 flex items-center justify-center animate-glow"
        aria-label="Open AI Assistant"
      >
        <Bot className="w-6 h-6 text-fifa-navy" />
      </motion.button>
    </AnimatePresence>
  );
}
