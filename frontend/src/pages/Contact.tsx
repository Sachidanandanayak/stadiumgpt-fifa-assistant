import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated submission — wire to backend /api/contact endpoint if needed
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">Get in Touch</h1>
        <p className="text-slate-500 dark:text-slate-400">Questions, feedback, or partnership ideas — we'd love to hear from you.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          {[
            { icon: Mail, label: 'Email', value: 'support@stadiumgpt.ai' },
            { icon: Phone, label: 'Hotline', value: '+1 (800) 555-0199' },
            { icon: MapPin, label: 'HQ', value: 'World Cup Ops Center, USA' },
          ].map((item) => (
            <GlassCard key={item.label} strong className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-fifa-gold shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard strong className="md:col-span-2">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center py-10 text-center gap-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              <p className="font-semibold">Thanks — your message has been sent!</p>
              <button onClick={() => setSubmitted(false)} className="text-sm text-fifa-gold hover:underline">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 text-sm resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary flex items-center gap-2 disabled:opacity-60">
                <Send className="w-4 h-4" /> {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
