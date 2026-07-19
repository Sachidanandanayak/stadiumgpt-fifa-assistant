import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingAssistantButton from '@/components/FloatingAssistantButton';
import ProtectedRoute from '@/components/ProtectedRoute';

import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import AIAssistant from '@/pages/AIAssistant';
import EmergencyCenter from '@/pages/EmergencyCenter';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';

import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import type { Language } from '@/types';

function AnimatedRoutes({ language, auth }: { language: Language; auth: ReturnType<typeof useAuth> }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrap><Home language={language} /></PageWrap>} />
        <Route
          path="/dashboard"
          element={
            <PageWrap>
              <ProtectedRoute user={auth.user} loading={auth.loading}>
                <Dashboard language={language} />
              </ProtectedRoute>
            </PageWrap>
          }
        />
        <Route path="/assistant" element={<PageWrap><AIAssistant language={language} /></PageWrap>} />
        <Route path="/emergency" element={<PageWrap><EmergencyCenter language={language} /></PageWrap>} />
        <Route path="/about" element={<PageWrap><About /></PageWrap>} />
        <Route path="/contact" element={<PageWrap><Contact /></PageWrap>} />
        <Route
          path="/login"
          element={<PageWrap><Login language={language} onLogin={auth.login} isDemoMode={auth.isDemoMode} /></PageWrap>}
        />
        <Route
          path="/register"
          element={<PageWrap><Register language={language} onRegister={auth.register} isDemoMode={auth.isDemoMode} /></PageWrap>}
        />
        <Route path="*" element={<PageWrap><NotFound /></PageWrap>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const auth = useAuth();
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('stadiumgpt-lang') as Language) || 'en');
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('stadiumgpt-lang', language);
  }, [language]);

  if (showLoader) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        language={language}
        onChangeLanguage={setLanguage}
        user={auth.user}
        onLogout={auth.logout}
      />
      <main className="flex-1">
        <AnimatedRoutes language={language} auth={auth} />
      </main>
      <Footer />
      <FloatingAssistantButton />
    </div>
  );
}
