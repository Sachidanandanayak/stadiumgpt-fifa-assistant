import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import StadiumBackground from '@/components/StadiumBackground';
import { t } from '@/utils/i18n';
import type { Language } from '@/types';

interface LoginProps {
  language: Language;
  onLogin: (email: string, password: string) => Promise<void>;
  isDemoMode: boolean;
}

export default function Login({ language, onLogin, isDemoMode }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onLogin(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 overflow-hidden">
      <StadiumBackground />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative glass-strong rounded-3xl p-8 w-full max-w-md text-white"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fifa-gold to-amber-600 flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-6 h-6 text-fifa-navy" />
          </div>
          <h1 className="text-2xl font-display font-bold">{t(language, 'nav.login')}</h1>
          <p className="text-sm text-slate-300 mt-1">Welcome back, fan. Let's get you into the stadium.</p>
          {isDemoMode && (
            <p className="text-xs text-amber-400 mt-3 flex items-center justify-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> Demo mode — any email/password works
            </p>
          )}
        </div>

        {error && (
          <div className="mb-4 px-4 py-2.5 rounded-xl bg-red-500/15 text-red-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 text-sm"
            />
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength={6}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-fifa-gold/50 text-sm"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? t(language, 'common.loading') : t(language, 'nav.login')}
          </button>
        </form>

        <p className="text-center text-sm text-slate-300 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-fifa-gold hover:underline font-medium">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
