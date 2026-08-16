import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Compass, 
  Sparkles, 
  Orbit, 
  Target, 
  GitFork, 
  BookOpen, 
  Eye, 
  HelpCircle, 
  Trophy, 
  UserCheck, 
  ShieldCheck, 
  Layers,
  Users,
  Palette
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: Compass },
    { to: '/career-dna', label: 'Career DNA', icon: Sparkles, badge: 'Matrix' },
    { to: '/career-galaxy', label: 'Career Galaxy', icon: Orbit },
    { to: '/career-match', label: 'Career Match', icon: UserCheck },
    { to: '/skill-gap', label: 'Skill Gap', icon: Target },
    { to: '/learn-next', label: 'Learn Next', icon: GitFork },
    { to: '/side-courses', label: 'Side Courses', icon: BookOpen },
    { to: '/hidden-careers', label: 'Hidden Careers', icon: Eye, badge: 'Roles' },
    { to: '/what-if', label: 'What If? Explorer', icon: Layers },
    { to: '/career-compare', label: 'Career Compare', icon: HelpCircle },
    { to: '/career-quest', label: 'Career Quest', icon: Trophy, badge: `${user.xp} XP` },
    { to: '/mentors', label: 'Mentor Connect', icon: Users },
    { to: '/settings', label: 'Theme & Settings', icon: Palette, badge: 'Custom' },
  ];

  if (user.role === 'admin' || user.role === 'mentor') {
    links.push({ to: '/admin', label: 'Admin Portal', icon: ShieldCheck, badge: 'Admin' });
  }

  return (
    <aside className="hidden sm:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 text-slate-800 dark:text-slate-200 min-h-[calc(100vh-4rem)] shrink-0 select-none">
      <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
        CAREER INTELLIGENCE
      </div>
      <nav className="space-y-1 flex-1 text-xs">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                borderRadius: 'var(--btn-radius)',
                backgroundColor: isActive ? 'var(--primary)' : undefined,
                color: isActive ? '#ffffff' : undefined
              })}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 transition-all font-medium ${
                  isActive
                    ? 'shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span 
                  className="text-[9px] px-2 py-0.5 rounded font-semibold border transition-all"
                  style={{
                    borderRadius: 'var(--badge-radius)',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    borderColor: 'var(--primary-ring)'
                  }}
                >
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Career Profile Status Widget */}
      <div 
        className="mt-6 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2"
        style={{ borderRadius: 'var(--card-radius)' }}
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Profile Level</span>
          <span 
            className="text-white px-2 py-0.5 text-[10px] font-bold shadow-2xs"
            style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--badge-radius)' }}
          >
            Level {user.level || 1}
          </span>
        </div>
        <p className="text-slate-700 dark:text-slate-300 font-medium truncate text-xs">
          Stream: <span className="text-slate-900 dark:text-white font-bold">{user.stream || 'General'}</span>
        </p>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all" 
            style={{ 
              width: `${Math.min(100, (user.level || 1) * 25)}%`,
              backgroundColor: 'var(--primary)'
            }} 
          />
        </div>
      </div>
    </aside>
  );
};
