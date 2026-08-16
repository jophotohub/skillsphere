import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { OfflineNotice } from './OfflineNotice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  showLayout?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, showLayout = true }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-900 font-sans">
        <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Syncing SkillSphere Platform...</span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!showLayout) {
    return (
      <>
        <OfflineNotice />
        {children}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      <OfflineNotice />
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-24 sm:pb-12 max-w-full">
          {children}
        </main>
      </div>
      <BottomNav />
      <Footer />
    </div>
  );
};
