import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Logo } from './Logo';
import { 
  Search, 
  LogOut, 
  Bell, 
  Zap, 
  CheckCircle2,
  Sun,
  Moon,
  Palette,
  Menu,
  X,
  Compass,
  Sparkles,
  Dna,
  Layers,
  GraduationCap,
  Award,
  Users,
  BarChart3,
  User,
  Settings,
  ArrowRight,
  GitCompare,
  Eye,
  Sliders
} from 'lucide-react';
import { searchService } from '../services/api';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { resolvedMode, setMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ careers: any[]; skills: any[]; courses: any[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setShowNotifications(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open & listen for Escape key
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.length > 1) {
      setIsSearching(true);
      try {
        const results = await searchService.searchGlobal(q);
        setSearchResults(results);
      } catch {
        setSearchResults(null);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults(null);
    }
  };

  const toggleThemeMode = () => {
    if (resolvedMode === 'dark') {
      setMode('light');
    } else {
      setMode('dark');
    }
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setSearchQuery('');
    setSearchResults(null);
  };

  const navLinks = user ? [
    { label: 'Dashboard', path: '/dashboard', icon: Compass },
    { label: 'Career DNA & Diagnostics', path: '/career-dna', icon: Dna },
    { label: 'Career Galaxy Explorer', path: '/career-galaxy', icon: Sparkles },
    { label: 'Career Match Engine', path: '/career-match', icon: Layers },
    { label: 'Skill Gap Matrix', path: '/skill-gap', icon: GraduationCap },
    { label: 'Next Skill Priority', path: '/learn-next', icon: ArrowRight },
    { label: 'Complementary Courses', path: '/side-courses', icon: Layers },
    { label: 'Hidden Careers & Edge Fields', path: '/hidden-careers', icon: Eye },
    { label: 'What-If Career Simulator', path: '/what-if', icon: Sliders },
    { label: 'Career Compare Matrix', path: '/career-compare', icon: GitCompare },
    { label: 'Academic Quests & XP', path: '/career-quest', icon: Award },
    { label: 'Industry Advisors', path: '/mentors', icon: Users },
    { label: 'Institutional Analytics', path: '/admin', icon: BarChart3 },
  ] : [
    { label: 'Platform Overview', path: '/', icon: Sparkles },
    { label: 'Career Galaxy Explorer', path: '/career-galaxy', icon: Compass },
    { label: 'What-If Career Simulator', path: '/what-if', icon: Sliders },
    { label: 'Career Compare Matrix', path: '/career-compare', icon: GitCompare },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full max-w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xs box-border">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
            
            {/* Logo & Brand: Compact & scale-safe on all screens */}
            <div className="flex items-center gap-2 shrink-0 min-w-0">
              <Link 
                to={user ? "/dashboard" : "/"} 
                className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-0.5"
                aria-label="SkillSphere Home"
              >
                {/* Desktop Logo with Tagline */}
                <div className="hidden sm:block">
                  <Logo variant="full" size="md" showTagline={true} />
                </div>
                {/* Mobile Compact Logo */}
                <div className="block sm:hidden">
                  <Logo variant="horizontal" size="sm" showTagline={false} />
                </div>
              </Link>
            </div>

            {/* Desktop Search Bar (Hidden on mobile < 768px, compact on tablet) */}
            <div className="hidden md:flex relative flex-1 max-w-xs lg:max-w-md mx-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search careers, skills, degree paths..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-800 transition-all font-medium focus-theme-ring"
                  style={{ borderRadius: 'var(--btn-radius)' }}
                />
                {isSearching && (
                  <div 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }}
                  />
                )}
              </div>

              {/* Desktop Search Dropdown Results */}
              {searchResults && searchQuery.length > 1 && (
                <div 
                  className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg p-2 z-50 max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800"
                  style={{ borderRadius: 'var(--card-radius)' }}
                >
                  {searchResults.careers?.length > 0 && (
                    <div className="py-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-2 block mb-1">Careers</span>
                      {searchResults.careers.slice(0, 3).map((c: any) => (
                        <div
                          key={c.id}
                          onClick={() => { navigate(`/careers/${c.id}`); setSearchQuery(''); setSearchResults(null); }}
                          className="px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-between text-xs"
                        >
                          <span className="font-semibold text-slate-900 dark:text-white">{c.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">{c.category}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.skills?.length > 0 && (
                    <div className="py-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 px-2 block mb-1">Skills</span>
                      {searchResults.skills.slice(0, 3).map((s: any) => (
                        <div
                          key={s.id}
                          onClick={() => { navigate('/skill-gap'); setSearchQuery(''); setSearchResults(null); }}
                          className="px-2.5 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-between text-xs"
                        >
                          <span className="font-semibold text-slate-900 dark:text-white">{s.name}</span>
                          <span className="text-[10px] text-slate-500">{s.category}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop & Tablet Actions (Hidden on Mobile < 768px) */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2.5 shrink-0">
              
              {/* Quick Theme Customizer Button */}
              <button
                onClick={() => navigate('/settings')}
                className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                style={{ borderRadius: 'var(--btn-radius)' }}
                title="Customize Theme & Appearance"
                aria-label="Theme settings"
              >
                <Palette className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              </button>

              {/* Quick Mode Toggle (Light / Dark) */}
              <button
                onClick={toggleThemeMode}
                className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                style={{ borderRadius: 'var(--btn-radius)' }}
                title={`Switch to ${resolvedMode === 'dark' ? 'Light' : 'Dark'} mode`}
                aria-label="Toggle dark/light mode"
              >
                {resolvedMode === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>

              {user ? (
                <>
                  {/* Level & XP Badge */}
                  <div 
                    className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold border"
                    style={{
                      borderRadius: 'var(--badge-radius)',
                      backgroundColor: 'var(--primary-light)',
                      borderColor: 'var(--primary-ring)',
                      color: 'var(--primary)'
                    }}
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Level {user.level || 1}</span>
                    <span className="text-[11px] opacity-80">({user.xp || 0} XP)</span>
                  </div>

                  {/* Notification Icon */}
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                      style={{ borderRadius: 'var(--btn-radius)' }}
                      aria-label="Notifications"
                    >
                      <Bell className="w-4 h-4" />
                      <span 
                        className="absolute top-1 right-1 w-2 h-2 rounded-full" 
                        style={{ backgroundColor: 'var(--primary)' }}
                      />
                    </button>

                    {showNotifications && (
                      <div 
                        className="absolute right-0 top-full mt-2 w-72 p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl text-xs z-50 space-y-2"
                        style={{ borderRadius: 'var(--card-radius)' }}
                      >
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                          <span className="font-bold text-slate-900 dark:text-white">Notifications</span>
                          <span 
                            className="text-[10px] font-semibold px-2 py-0.5 rounded"
                            style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}
                          >
                            Updated
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'var(--primary)' }} />
                          <span>Career match algorithms refreshed with theme customizer online.</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* User Avatar */}
                  <button
                    onClick={() => navigate('/profile')}
                    className="w-8 h-8 font-bold text-xs flex items-center justify-center text-white shadow-xs transition-transform hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--btn-radius)' }}
                    title="View Profile"
                    aria-label="User profile"
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                  </button>

                  {/* Signout Desktop */}
                  <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="hidden lg:flex p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
                    style={{ borderRadius: 'var(--btn-radius)' }}
                    title="Sign Out"
                    aria-label="Sign out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Link
                    to="/login"
                    className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-white transition-colors shadow-xs hover:opacity-95 whitespace-nowrap"
                    style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--btn-radius)' }}
                  >
                    Get Started
                  </Link>
                </div>
              )}

            </div>

            {/* MOBILE ONLY: Right-Side Controls (< 768px) */}
            <div className="flex md:hidden items-center gap-1.5 shrink-0">
              {/* Quick Dark/Light Toggle on Mobile Header */}
              <button
                onClick={toggleThemeMode}
                className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 active:bg-slate-100 dark:active:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Toggle color mode"
              >
                {resolvedMode === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>

              {/* Mobile Menu / Hamburger Button with >= 44x44px Touch Target */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-slate-900 dark:text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-900 dark:text-white" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* PROPER MOBILE NAVIGATION DRAWER & BACKDROP (< 768px) */}
      {isMenuOpen && (
        <div className="md:hidden">
          {/* Subtle Dimmed Backdrop covering entire viewport */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[9998] transition-opacity duration-200 animate-in fade-in"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Independent Navigation Drawer Panel */}
          <div 
            className="fixed top-0 right-0 h-[100dvh] max-h-[100dvh] w-[min(88vw,380px)] max-w-full z-[9999] bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-250 ease-out box-border overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            
            {/* Drawer Header with Logo & Close [X] Button */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 shrink-0">
              <div className="flex items-center gap-2">
                <Logo variant="horizontal" size="sm" showTagline={false} />
              </div>
              
              <button
                onClick={closeMobileMenu}
                className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
              
              {/* Mobile Search Bar */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search careers, skills, degrees..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:bg-white dark:focus:bg-slate-900 transition-all font-medium rounded-lg"
                />
                {isSearching && (
                  <div 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-t-transparent rounded-full animate-spin"
                    style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }}
                  />
                )}

                {/* Mobile Search Results */}
                {searchResults && searchQuery.length > 1 && (
                  <div className="mt-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {searchResults.careers?.map((c: any) => (
                      <div
                        key={c.id}
                        onClick={() => { navigate(`/careers/${c.id}`); closeMobileMenu(); }}
                        className="py-2 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-semibold text-slate-900 dark:text-white">{c.name}</span>
                        <span className="text-[10px] text-slate-500">{c.category}</span>
                      </div>
                    ))}
                    {searchResults.skills?.map((s: any) => (
                      <div
                        key={s.id}
                        onClick={() => { navigate('/skill-gap'); closeMobileMenu(); }}
                        className="py-2 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center justify-between cursor-pointer"
                      >
                        <span className="font-semibold text-slate-900 dark:text-white">{s.name}</span>
                        <span className="text-[10px] text-slate-500">{s.category}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* User Quick Info or Auth CTAs */}
              {user ? (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg font-bold text-sm flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: 'var(--primary)' }}
                    >
                      {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                    </div>
                    <div>
                      <h2 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{user.name || 'Student'}</h2>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-[140px]">{user.email}</p>
                    </div>
                  </div>

                  <div 
                    className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-lg border shrink-0"
                    style={{
                      backgroundColor: 'var(--primary-light)',
                      borderColor: 'var(--primary-ring)',
                      color: 'var(--primary)'
                    }}
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Lvl {user.level || 1}</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-semibold text-xs text-center min-h-[44px] flex items-center justify-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="w-full py-2.5 rounded-lg text-white font-semibold text-xs text-center shadow-xs min-h-[44px] flex items-center justify-center"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 block mb-1">
                  Career Intelligence Suite
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {navLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors min-h-[44px] ${
                          isActive
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold shadow-xs'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Preferences & Settings */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2 block">
                  Appearance & Settings
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { navigate('/settings?tab=theme'); closeMobileMenu(); }}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                  >
                    <Palette className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                    <span>Theme Studio</span>
                  </button>

                  <button
                    onClick={() => { navigate('/profile'); closeMobileMenu(); }}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                </div>
              </div>

              {/* Sign Out Button (if logged in) */}
              {user && (
                <div className="pt-2">
                  <button
                    onClick={() => { logout(); closeMobileMenu(); navigate('/login'); }}
                    className="w-full py-2.5 px-4 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-950/60 transition-colors flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of SkillSphere</span>
                  </button>
                </div>
              )}

            </div>

            {/* Drawer Footer Info */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/80 text-center text-[10px] text-slate-400 shrink-0">
              SkillSphere • Career Discovery & Intelligence
            </div>

          </div>
        </div>
      )}
    </>
  );
};


