import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import StadiumBackground from '@/components/StadiumBackground';

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden text-white text-center px-4">
      <StadiumBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <h1 className="text-8xl font-display font-extrabold text-gradient-gold mb-4">404</h1>
        <p className="text-xl font-semibold mb-2">Offside! This page doesn't exist.</p>
        <p className="text-slate-300 mb-8 max-w-sm mx-auto">
          Looks like this play was called back. Let's get you back to the pitch.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
