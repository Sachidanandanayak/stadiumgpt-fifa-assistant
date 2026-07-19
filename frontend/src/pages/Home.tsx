import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, ShieldAlert, BarChart3, Languages, MapPin, Utensils, Accessibility, Ticket } from 'lucide-react';
import StadiumBackground from '@/components/StadiumBackground';
import GlassCard from '@/components/GlassCard';
import { t } from '@/utils/i18n';
import type { Language } from '@/types';

interface HomeProps {
  language: Language;
}

const features = [
  { icon: Bot, title: 'AI Stadium Assistant', desc: 'Instant answers on schedules, seating, tickets, and rules — in your language.' },
  { icon: ShieldAlert, title: 'Smart Emergency Center', desc: 'One-tap SOS, evacuation guidance, and live safety instructions.' },
  { icon: BarChart3, title: 'Crowd Analytics', desc: 'Live crowd density, gate status, and parking availability at a glance.' },
  { icon: Languages, title: 'Multilingual', desc: 'Full support for English, Hindi, Kannada, and Spanish speaking fans.' },
  { icon: MapPin, title: 'Wayfinding', desc: 'Find the nearest exits, food courts, and accessibility services fast.' },
  { icon: Ticket, title: 'Ticket FAQs', desc: 'Get instant clarity on entry rules, re-entry, and ticket policies.' },
];

export default function Home({ language }: HomeProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <StadiumBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wide mb-6"
          >
            🏆 FIFA World Cup 2026 — USA · Mexico · Canada
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-6"
          >
            {t(language, 'hero.title').split(' ').map((word, i) =>
              word.toLowerCase().includes('2026') || word.toLowerCase().includes('smart') ? (
                <span key={i} className="text-gradient-gold">{word}{' '}</span>
              ) : (
                <span key={i}>{word}{' '}</span>
              )
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto mb-10"
          >
            {t(language, 'hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/assistant" className="btn-primary flex items-center gap-2">
              <Bot className="w-5 h-5" /> {t(language, 'hero.cta.assistant')}
            </Link>
            <Link to="/dashboard" className="btn-secondary flex items-center gap-2">
              <BarChart3 className="w-5 h-5" /> {t(language, 'hero.cta.dashboard')}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-xl mx-auto"
          >
            {[
              { label: 'Stadiums', value: '16' },
              { label: 'Host Cities', value: '11' },
              { label: 'Matches', value: '104' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl py-4">
                <p className="text-2xl font-display font-bold text-fifa-gold">{stat.value}</p>
                <p className="text-xs text-slate-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Everything a fan needs, <span className="text-gradient-gold">in one app</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Built to remove friction from matchday — from the moment you arrive to full time.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <GlassCard key={f.title} delay={i * 0.08} strong>
              <div className="w-12 h-12 rounded-xl bg-fifa-gold/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-fifa-gold" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Extra callouts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard strong className="flex items-start gap-4">
            <Utensils className="w-8 h-8 text-fifa-gold shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Food Courts & Concessions</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ask StadiumGPT for the nearest food court, dietary options, and current wait times.
              </p>
            </div>
          </GlassCard>
          <GlassCard strong className="flex items-start gap-4">
            <Accessibility className="w-8 h-8 text-fifa-gold shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Accessibility Services</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Wheelchair access, sensory rooms, and assisted-listening devices — all mapped and searchable.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
