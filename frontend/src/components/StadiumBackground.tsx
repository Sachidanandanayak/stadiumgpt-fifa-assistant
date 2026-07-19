import { motion } from 'framer-motion';

export default function StadiumBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-stadium-gradient" />
      {/* Floodlight glows */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-fifa-gold/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-fifa-green/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-fifa-blue/30 rounded-full blur-3xl"
      />
      {/* Floating particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-fifa-gold/60"
          style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      {/* Pitch lines silhouette */}
      <svg
        className="absolute bottom-0 left-0 w-full h-1/3 opacity-10"
        viewBox="0 0 800 200"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="100" x2="800" y2="100" stroke="white" strokeWidth="2" />
        <circle cx="400" cy="100" r="60" stroke="white" strokeWidth="2" fill="none" />
        <rect x="0" y="40" width="120" height="120" stroke="white" strokeWidth="2" fill="none" />
        <rect x="680" y="40" width="120" height="120" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}
