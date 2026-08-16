import React from 'react';
import { SkillSphereLogo } from './SkillSphereLogo';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, ArrowRight, Compass, CheckCircle2, Search, Bell } from 'lucide-react';

export const ThemePreview: React.FC = () => {
  const { config, resolvedMode } = useTheme();

  return (
    <div className="p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5 select-none transition-all">
      {/* Live Preview Header Badge */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Interactive Live Theme Preview
          </span>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize border border-slate-200 dark:border-slate-700">
          {config.mode} Mode • {config.accent} Accent
        </span>
      </div>

      {/* Mock Header Navigation */}
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <SkillSphereLogo variant="full" size="sm" showTagline={false} />
        
        <div className="flex items-center gap-2">
          {/* Active Navigation Item */}
          <div 
            className="px-2.5 py-1 text-xs font-semibold rounded text-white flex items-center gap-1.5 shadow-2xs"
            style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--btn-radius)' }}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </div>

          <div className="hidden sm:flex px-2 py-1 text-xs text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900">
            Careers
          </div>

          <div className="p-1.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500">
            <Bell className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="space-y-2 text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold rounded"
          style={{ 
            backgroundColor: 'var(--primary-light)', 
            color: 'var(--primary)',
            borderRadius: 'var(--badge-radius)' 
          }}
        >
          <Sparkles className="w-3 h-3" />
          <span>AI-Powered Career Intelligence</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Build Your Future Skills & Career DNA
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
          Discover personalized degree routes, quantitative skill gap metrics, and interdisciplinary career recommendations.
        </p>
      </div>

      {/* Interactive Form & Buttons Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Mock Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            readOnly
            value="Search Python, Data Analytics, BioTech..."
            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium focus-theme-ring"
            style={{ borderRadius: 'var(--btn-radius)' }}
          />
        </div>

        {/* Mock Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex-1 py-2 px-3 text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-xs transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--btn-radius)' }}
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            className="py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
            style={{ borderRadius: 'var(--btn-radius)' }}
          >
            Explore Paths
          </button>
        </div>
      </div>

      {/* Card Sample */}
      <div 
        className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 space-y-2.5"
        style={{ borderRadius: 'var(--card-radius)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            <span className="text-xs font-bold text-slate-900 dark:text-white">Full Stack Engineering Roadmap</span>
          </div>
          <span 
            className="text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider"
            style={{ 
              backgroundColor: 'var(--primary-light)', 
              color: 'var(--primary)',
              borderRadius: 'var(--badge-radius)'
            }}
          >
            94% Match
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <span>Skill Mastery Progress</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">80 / 100 XP</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ width: '80%', backgroundColor: 'var(--primary)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
