import { Link } from 'react-router-dom';
import { Trophy, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-strong border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-lg mb-2">
            <Trophy className="w-5 h-5 text-fifa-gold" />
            <span className="text-gradient-gold">StadiumGPT</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Smart Stadium Assistant for FIFA World Cup 2026 — powered by generative AI.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-slate-500">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/dashboard" className="hover:text-fifa-gold">Dashboard</Link></li>
            <li><Link to="/assistant" className="hover:text-fifa-gold">AI Assistant</Link></li>
            <li><Link to="/emergency" className="hover:text-fifa-gold">Emergency Center</Link></li>
            <li><Link to="/about" className="hover:text-fifa-gold">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-slate-500">Connect</h4>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © 2026 StadiumGPT. Built for FIFA World Cup 2026 fan experience.
      </div>
    </footer>
  );
}
