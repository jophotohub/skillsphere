import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, 
  Dna, 
  Compass, 
  Gamepad2, 
  User, 
  Grid, 
  X, 
  Target, 
  GitFork, 
  BookOpen, 
  Eye, 
  Layers, 
  HelpCircle, 
  ShieldCheck, 
  Users, 
  LogOut,
  Palette
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  if (!user) return null;

  const activePath = location.pathname;

  const primaryTabs = [
    { to: '/dashboard', label: 'Home', icon: Home },
    { to: '/career-dna', label: 'DNA', icon: Dna },
    { to: '/career-galaxy', label: 'Careers', icon: Compass },
    { to: '/career-quest', label: 'Quest', icon: Gamepad2 },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const secondaryLinks = [
    { to: '/career-match', label: 'Career Match', icon: User },
    { to: '/skill-gap', label: 'Skill Gap', icon: Target },
    { to: '/learn-next', label: 'Learn Next', icon: GitFork },
    { to: '/side-courses', label: 'Side Courses', icon: BookOpen },
    { to: '/hidden-careers', label: 'Hidden Roles', icon: Eye },
    { to: '/what-if', label: 'What If? Explorer', icon: Layers },
    { to: '/career-compare', label: 'Career Compare', icon: HelpCircle },
    { to: '/mentors', label: 'Mentor Connect', icon: Users },
    { to: '/settings', label: 'Theme & Appearance', icon: Palette },
  ];

  if (user.role === 'admin' || user.role === 'mentor') {
    secondaryLinks.push({ to: '/admin', label: 'Admin Portal', icon: ShieldCheck });
  }

  return (
    <>
      {/* Mobile Bottom Navigation Bar - Visible on < sm screens */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-1 py-1 flex items-center justify-around pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-lg">
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePath === tab.to;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              style={isActive ? { color: 'var(--primary)' } : {}}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors min-w-[56px] min-h-[44px] ${
                isActive
                  ? 'bg-slate-100 dark:bg-slate-800 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">{tab.label}</span>
            </NavLink>
          );
        })}

        {/* More Menu Trigger */}
        <button
          onClick={() => setMoreMenuOpen(!moreMenuOpen)}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors min-w-[56px] min-h-[44px] ${
            moreMenuOpen ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 font-semibold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">More</span>
        </button>
      </div>

      {/* More Navigation Drawer for Mobile */}
      {moreMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-2xl p-5 space-y-4 max-h-[80vh] overflow-y-auto pb-24 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">All Navigation Tools</h3>
              </div>
              <button
                onClick={() => setMoreMenuOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {secondaryLinks.map((item) => {
                const Icon = item.icon;
                const isSubActive = activePath === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMoreMenuOpen(false)}
                    style={isSubActive ? { backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' } : {}}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border transition-colors ${
                      isSubActive
                        ? 'text-white font-semibold shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <span>Level {user.level || 1} • {user.xp || 0} XP</span>
              </div>
              <button
                onClick={() => { setMoreMenuOpen(false); logout(); navigate('/login'); }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-red-600 text-xs font-semibold flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
