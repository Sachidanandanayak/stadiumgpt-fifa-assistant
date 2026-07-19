import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Trophy, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import NotificationBell from './NotificationBell';
import { t } from '@/utils/i18n';
import type { Language, User } from '@/types';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  user: User | null;
  onLogout: () => void;
}

const links: { to: string; key: Parameters<typeof t>[1] }[] = [
  { to: '/', key: 'nav.home' },
  { to: '/dashboard', key: 'nav.dashboard' },
  { to: '/assistant', key: 'nav.assistant' },
  { to: '/emergency', key: 'nav.emergency' },
  { to: '/about', key: 'nav.about' },
  { to: '/contact', key: 'nav.contact' },
];

export default function Navbar({ isDark, onToggleTheme, language, onChangeLanguage, user, onLogout }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-fifa-gold to-amber-600 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-fifa-navy" />
          </div>
          <span className="text-gradient-gold">StadiumGPT</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-fifa-gold bg-fifa-gold/10' : 'hover:text-fifa-gold hover:bg-white/5'
                }`
              }
            >
              {t(language, link.key)}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <NotificationBell />
          <LanguageSwitcher language={language} onChange={onChangeLanguage} />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          {user ? (
            <button onClick={onLogout} className="btn-secondary text-sm flex items-center gap-1.5">
              <LogOut className="w-4 h-4" /> {t(language, 'nav.logout')}
            </button>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-primary text-sm">
              {t(language, 'nav.login')}
            </button>
          )}
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen((o) => !o)} aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-white/10"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? 'text-fifa-gold bg-fifa-gold/10' : 'hover:bg-white/5'
                    }`
                  }
                >
                  {t(language, link.key)}
                </NavLink>
              ))}
              <div className="flex items-center gap-2 mt-2">
                <NotificationBell />
                <LanguageSwitcher language={language} onChange={onChangeLanguage} />
                <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
                {user ? (
                  <button onClick={onLogout} className="btn-secondary text-sm flex-1">
                    {t(language, 'nav.logout')}
                  </button>
                ) : (
                  <button onClick={() => navigate('/login')} className="btn-primary text-sm flex-1">
                    {t(language, 'nav.login')}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
