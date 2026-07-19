import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-stadium-gradient">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full border-4 border-fifa-gold/20 border-t-fifa-gold"
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl">⚽</div>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-2xl md:text-3xl font-display font-bold text-gradient-gold tracking-wide"
      >
        StadiumGPT
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-2 text-slate-300 text-sm tracking-widest uppercase"
      >
        Preparing your matchday experience
      </motion.p>
    </div>
  );
}
