import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from '@/types';

interface ProtectedRouteProps {
  user: User | null;
  loading: boolean;
  children: ReactNode;
}

export default function ProtectedRoute({ user, loading, children }: ProtectedRouteProps) {
  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
