import { useCallback, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/services/supabaseClient';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const LOCAL_KEY = 'stadiumgpt-demo-user';

export function useAuth() {
  const [state, setState] = useState<AuthState>({ user: null, loading: true, error: null });

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        const sUser = data.session?.user;
        setState({
          user: sUser ? { id: sUser.id, email: sUser.email || '' } : null,
          loading: false,
          error: null,
        });
      });
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setState((s) => ({
          ...s,
          user: session?.user ? { id: session.user.id, email: session.user.email || '' } : null,
        }));
      });
      return () => listener.subscription.unsubscribe();
    } else {
      const stored = localStorage.getItem(LOCAL_KEY);
      setState({ user: stored ? JSON.parse(stored) : null, loading: false, error: null });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setState({ user: { id: data.user!.id, email: data.user!.email || '' }, loading: false, error: null });
      } else {
        // Demo mode fallback — simulates authentication locally
        await new Promise((r) => setTimeout(r, 600));
        const demoUser: User = { id: 'demo-' + Date.now(), email };
        localStorage.setItem(LOCAL_KEY, JSON.stringify(demoUser));
        setState({ user: demoUser, loading: false, error: null });
      }
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: (err as Error).message }));
      throw err;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, fullName: string) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        setState({
          user: data.user ? { id: data.user.id, email: data.user.email || '', fullName } : null,
          loading: false,
          error: null,
        });
      } else {
        await new Promise((r) => setTimeout(r, 600));
        const demoUser: User = { id: 'demo-' + Date.now(), email, fullName };
        localStorage.setItem(LOCAL_KEY, JSON.stringify(demoUser));
        setState({ user: demoUser, loading: false, error: null });
      }
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: (err as Error).message }));
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(LOCAL_KEY);
    }
    setState({ user: null, loading: false, error: null });
  }, []);

  return { ...state, login, register, logout, isDemoMode: !isSupabaseConfigured };
}
