import { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { languageNames } from '@/utils/i18n';
import type { Language } from '@/types';

interface LanguageSwitcherProps {
  language: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageSwitcher({ language, onChange }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-40 glass-strong rounded-xl overflow-hidden z-20"
            >
              {(Object.keys(languageNames) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    onChange(lang);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-fifa-gold/20 transition-colors ${
                    language === lang ? 'text-fifa-gold font-semibold' : ''
                  }`}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
