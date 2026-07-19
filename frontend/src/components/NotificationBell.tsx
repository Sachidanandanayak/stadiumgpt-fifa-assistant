import { useState } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Notification } from '@/types';

const demoNotifications: Notification[] = [
  { id: '1', title: 'Gate B Update', message: 'Gate B queue time reduced to 8 minutes.', type: 'success', timestamp: new Date().toISOString(), read: false },
  { id: '2', title: 'Weather Advisory', message: 'Light rain expected before kickoff — carry ponchos.', type: 'warning', timestamp: new Date().toISOString(), read: false },
  { id: '3', title: 'Match Reminder', message: 'Quarter-final kicks off in 2 hours.', type: 'info', timestamp: new Date().toISOString(), read: true },
];

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(demoNotifications);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/20"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-fifa-navy" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-80 glass-strong rounded-xl overflow-hidden z-20 max-h-96 overflow-y-auto"
            >
              <div className="px-4 py-3 border-b border-white/10 font-semibold text-sm flex justify-between items-center">
                Notifications
                <button
                  onClick={() => setNotifications((n) => n.map((x) => ({ ...x, read: true })))}
                  className="text-xs text-fifa-gold hover:underline"
                >
                  Mark all read
                </button>
              </div>
              {notifications.map((n) => (
                <div key={n.id} className={`px-4 py-3 border-b border-white/5 text-sm ${!n.read ? 'bg-fifa-gold/5' : ''}`}>
                  <p className="font-medium">{n.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
