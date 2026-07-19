import { motion } from 'framer-motion';
import { Bot, ShieldAlert, BarChart3, Languages, Target, Rocket } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
          About <span className="text-gradient-gold">StadiumGPT</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          StadiumGPT is a generative AI platform designed to make FIFA World Cup 2026 the safest,
          smartest, and most seamless fan experience in tournament history.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        <GlassCard strong delay={0}>
          <Target className="w-8 h-8 text-fifa-gold mb-3" />
          <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Reduce fan confusion and operational strain at scale by combining conversational AI with
            live stadium data — helping millions of fans across 16 stadiums move, eat, and stay safe with ease.
          </p>
        </GlassCard>
        <GlassCard strong delay={0.1}>
          <Rocket className="w-8 h-8 text-fifa-gold mb-3" />
          <h3 className="font-semibold text-lg mb-2">Why It Matters</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            World Cup stadiums host up to 80,000+ fans per match. Real-time AI guidance reduces
            congestion, speeds up emergency response, and improves accessibility for every fan.
          </p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-14">
        {[
          { icon: Bot, label: 'Conversational AI' },
          { icon: ShieldAlert, label: 'Safety First' },
          { icon: BarChart3, label: 'Live Analytics' },
          { icon: Languages, label: 'Multilingual' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl py-8 px-4"
          >
            <item.icon className="w-8 h-8 text-fifa-gold mx-auto mb-3" />
            <p className="text-sm font-medium">{item.label}</p>
          </motion.div>
        ))}
      </div>

      <GlassCard strong>
        <h3 className="font-semibold text-lg mb-3">Built With</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'FastAPI', 'Google Gemini', 'Supabase', 'Recharts'].map((tech) => (
            <span key={tech} className="text-xs px-3 py-1.5 rounded-full glass">{tech}</span>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
