import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 py-6 px-4 sm:px-8 text-xs pb-24 sm:pb-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <Logo variant="full" size="sm" showTagline={true} />
          <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">• Professional Career Intelligence</span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-[11px]">
          © {new Date().getFullYear()} SkillSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
