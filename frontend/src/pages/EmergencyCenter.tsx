import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, DoorOpen, ShieldAlert, CheckCircle2, AlertTriangle, Navigation } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { emergencyApi } from '@/services/api';
import { t } from '@/utils/i18n';
import type { Language, EmergencyContact, EvacuationExit } from '@/types';

interface EmergencyCenterProps {
  language: Language;
}

const demoContacts: EmergencyContact[] = [
  { id: '1', name: 'Stadium Security', role: 'On-site Security Team', phone: '+1-800-555-0100', available247: true },
  { id: '2', name: 'Medical Response Unit', role: 'First Aid & Ambulance', phone: '+1-800-555-0111', available247: true },
  { id: '3', name: 'Lost & Found', role: 'Guest Services', phone: '+1-800-555-0122', available247: false },
  { id: '4', name: 'Local Police', role: 'Emergency Law Enforcement', phone: '911', available247: true },
];

const demoExits: EvacuationExit[] = [
  { id: '1', gate: 'Exit Gate A — North', distanceMeters: 85, crowdLevel: 'low', status: 'open' },
  { id: '2', gate: 'Exit Gate B — East', distanceMeters: 140, crowdLevel: 'medium', status: 'open' },
  { id: '3', gate: 'Exit Gate C — South', distanceMeters: 210, crowdLevel: 'high', status: 'restricted' },
  { id: '4', gate: 'Exit Gate D — West', distanceMeters: 95, crowdLevel: 'low', status: 'open' },
];

const instructions = [
  'Remain calm and follow directions from stadium staff and stewards.',
  'Do not run — walk briskly toward your nearest open exit.',
  'Leave belongings behind if instructed to evacuate immediately.',
  'Assist those with mobility needs or direct them to accessible exits.',
  'Once outside, move well clear of the stadium and await further instructions.',
];

export default function EmergencyCenter({ language }: EmergencyCenterProps) {
  const [contacts, setContacts] = useState<EmergencyContact[]>(demoContacts);
  const [exits, setExits] = useState<EvacuationExit[]>(demoExits);
  const [sosState, setSosState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [ticketId, setTicketId] = useState<string | null>(null);

  useEffect(() => {
    emergencyApi.getContacts().then(setContacts).catch(() => setContacts(demoContacts));
    emergencyApi.getExits().then(setExits).catch(() => setExits(demoExits));
  }, []);

  const handleSOS = async () => {
    setSosState('sending');
    try {
      const res = await emergencyApi.sendSOS('Section 112, Row F');
      setTicketId(res.ticketId);
    } catch {
      setTicketId('DEMO-' + Math.floor(Math.random() * 90000 + 10000));
    }
    setTimeout(() => setSosState('sent'), 900);
  };

  const crowdColor = { low: 'text-emerald-400', medium: 'text-amber-400', high: 'text-red-400' };
  const statusBadge = {
    open: 'bg-emerald-500/15 text-emerald-400',
    restricted: 'bg-amber-500/15 text-amber-400',
    closed: 'bg-red-500/15 text-red-400',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
        <h1 className="text-3xl font-display font-bold mb-2">{t(language, 'emergency.title')}</h1>
        <p className="text-slate-500 dark:text-slate-400">Immediate help, wayfinding, and safety guidance when it matters most.</p>
      </motion.div>

      {/* SOS Button */}
      <div className="flex flex-col items-center mb-14">
        <motion.button
          onClick={handleSOS}
          disabled={sosState !== 'idle'}
          whileTap={{ scale: 0.95 }}
          className="relative w-40 h-40 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-2xl shadow-red-600/40 flex flex-col items-center justify-center text-white font-display font-bold text-lg disabled:opacity-70"
        >
          {sosState === 'idle' && (
            <motion.span
              className="absolute inset-0 rounded-full bg-red-500/40"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <ShieldAlert className="w-9 h-9 mb-1 relative z-10" />
          <span className="relative z-10">{sosState === 'idle' ? 'SOS' : sosState === 'sending' ? '...' : 'SENT'}</span>
        </motion.button>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{t(language, 'emergency.sos')}</p>

        <AnimatePresence>
          {sosState === 'sent' && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 glass-strong rounded-xl px-5 py-3 flex items-center gap-2 text-sm text-emerald-400"
            >
              <CheckCircle2 className="w-5 h-5" />
              {t(language, 'emergency.sosConfirm')} Ticket #{ticketId}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Contacts */}
        <GlassCard strong>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Phone className="w-4 h-4 text-fifa-gold" /> {t(language, 'emergency.contacts')}
          </h3>
          <div className="space-y-3">
            {contacts.map((c) => (
              <a
                key={c.id}
                href={`tel:${c.phone}`}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{c.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-fifa-gold">{c.phone}</p>
                  {c.available247 && <p className="text-[10px] text-emerald-400">24/7 available</p>}
                </div>
              </a>
            ))}
          </div>
        </GlassCard>

        {/* Exits */}
        <GlassCard strong>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <DoorOpen className="w-4 h-4 text-fifa-gold" /> {t(language, 'emergency.exits')}
          </h3>
          <div className="space-y-3">
            {exits.map((e) => (
              <div key={e.id} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium">{e.gate}</p>
                    <p className={`text-xs ${crowdColor[e.crowdLevel]}`}>{e.crowdLevel} crowd</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">{e.distanceMeters}m</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusBadge[e.status]}`}>{e.status}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Instructions */}
      <GlassCard strong>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-fifa-gold" /> {t(language, 'emergency.instructions')}
        </h3>
        <ol className="space-y-2.5">
          {instructions.map((ins, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="w-6 h-6 rounded-full bg-fifa-gold/15 text-fifa-gold flex items-center justify-center text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-slate-600 dark:text-slate-300 pt-0.5">{ins}</span>
            </li>
          ))}
        </ol>
      </GlassCard>
    </div>
  );
}
