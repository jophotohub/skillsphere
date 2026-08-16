import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineNotice: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-50 p-3 bg-amber-500/90 text-slate-950 font-bold text-xs flex items-center justify-between shadow-lg backdrop-blur-md transition-all animate-in slide-in-from-top-4">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 shrink-0" />
        <span>You are offline. Some SkillSphere features require a network connection.</span>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-2.5 py-1 bg-slate-950 text-amber-300 rounded-lg text-[10px] font-extrabold flex items-center gap-1"
      >
        <RefreshCw className="w-3 h-3" /> Retry
      </button>
    </div>
  );
};
