import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ThemeConfig, ThemeMode, AccentColor, BackgroundStyle, UIStyle, BorderRadius, TypographyStyle } from '../types';

export const ACCENT_COLOR_MAP: Record<AccentColor, {
  name: string;
  primary: string;
  hover: string;
  light: string;
  darkLight: string;
  ring: string;
  gradient: string;
}> = {
  blue: {
    name: 'Ocean Blue',
    primary: '#2563eb',
    hover: '#1d4ed8',
    light: '#eff6ff',
    darkLight: 'rgba(37, 99, 235, 0.15)',
    ring: 'rgba(37, 99, 235, 0.35)',
    gradient: 'from-blue-600 to-indigo-600'
  },
  purple: {
    name: 'Royal Purple',
    primary: '#9333ea',
    hover: '#7e22ce',
    light: '#faf5ff',
    darkLight: 'rgba(147, 51, 234, 0.15)',
    ring: 'rgba(147, 51, 234, 0.35)',
    gradient: 'from-purple-600 to-pink-600'
  },
  green: {
    name: 'Emerald Green',
    primary: '#16a34a',
    hover: '#15803d',
    light: '#f0fdf4',
    darkLight: 'rgba(22, 163, 74, 0.15)',
    ring: 'rgba(22, 163, 74, 0.35)',
    gradient: 'from-emerald-600 to-teal-600'
  },
  orange: {
    name: 'Sunset Orange',
    primary: '#ea580c',
    hover: '#c2410c',
    light: '#fff7ed',
    darkLight: 'rgba(234, 88, 12, 0.15)',
    ring: 'rgba(234, 88, 12, 0.35)',
    gradient: 'from-orange-500 to-amber-600'
  },
  pink: {
    name: 'Rose Pink',
    primary: '#db2777',
    hover: '#be185d',
    light: '#fdf2f8',
    darkLight: 'rgba(219, 39, 119, 0.15)',
    ring: 'rgba(219, 39, 119, 0.35)',
    gradient: 'from-pink-600 to-rose-600'
  },
  cyan: {
    name: 'Tech Cyan',
    primary: '#0891b2',
    hover: '#0e7490',
    light: '#ecfeff',
    darkLight: 'rgba(8, 145, 178, 0.15)',
    ring: 'rgba(8, 145, 178, 0.35)',
    gradient: 'from-cyan-600 to-blue-600'
  },
  indigo: {
    name: 'Deep Indigo',
    primary: '#4f46e5',
    hover: '#4338ca',
    light: '#eef2ff',
    darkLight: 'rgba(79, 70, 229, 0.15)',
    ring: 'rgba(79, 70, 229, 0.35)',
    gradient: 'from-indigo-600 to-violet-600'
  },
  red: {
    name: 'Crimson Red',
    primary: '#dc2626',
    hover: '#b91c1c',
    light: '#fef2f2',
    darkLight: 'rgba(220, 38, 38, 0.15)',
    ring: 'rgba(220, 38, 38, 0.35)',
    gradient: 'from-red-600 to-rose-600'
  }
};

export const RADIUS_MAP: Record<BorderRadius, {
  name: string;
  cssValue: string;
  badgeRadius: string;
  buttonRadius: string;
  cardRadius: string;
}> = {
  sharp: {
    name: 'Sharp',
    cssValue: '2px',
    badgeRadius: '2px',
    buttonRadius: '2px',
    cardRadius: '4px'
  },
  medium: {
    name: 'Medium',
    cssValue: '10px',
    badgeRadius: '6px',
    buttonRadius: '8px',
    cardRadius: '12px'
  },
  rounded: {
    name: 'Rounded',
    cssValue: '18px',
    badgeRadius: '9999px',
    buttonRadius: '14px',
    cardRadius: '20px'
  }
};

export const TYPOGRAPHY_MAP: Record<TypographyStyle, {
  name: string;
  fontFamily: string;
  description: string;
}> = {
  default: {
    name: 'Default (Inter)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    description: 'Clean, neutral and highly legible'
  },
  modern: {
    name: 'Modern (Jakarta / Sans)',
    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
    description: 'Geometric, friendly modern feel'
  },
  professional: {
    name: 'Professional (System Clean)',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    description: 'Crisp, corporate & executive focus'
  }
};

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  mode: 'system',
  accent: 'blue',
  background: 'default',
  uiStyle: 'minimal',
  radius: 'medium',
  typography: 'default'
};

const STORAGE_KEY = 'skillsphere_theme_preferences';

interface ThemeContextType {
  config: ThemeConfig;
  resolvedMode: 'light' | 'dark';
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
  setBackground: (bg: BackgroundStyle) => void;
  setUIStyle: (style: UIStyle) => void;
  setRadius: (radius: BorderRadius) => void;
  setTypography: (typography: TypographyStyle) => void;
  updateConfig: (partial: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME_CONFIG;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_THEME_CONFIG, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_THEME_CONFIG;
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Listen to OS system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const resolvedMode: 'light' | 'dark' = useMemo(() => {
    if (config.mode === 'system') {
      return systemIsDark ? 'dark' : 'light';
    }
    return config.mode;
  }, [config.mode, systemIsDark]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch {
      // ignore storage quota errors
    }
  }, [config]);

  // Apply CSS Variables and Classes directly to documentElement and body
  useEffect(() => {
    const root = document.documentElement;
    const isDark = resolvedMode === 'dark';

    // 1. Dark mode class
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 2. Data attributes for custom CSS targeting
    root.setAttribute('data-theme-mode', config.mode);
    root.setAttribute('data-resolved-mode', resolvedMode);
    root.setAttribute('data-theme-accent', config.accent);
    root.setAttribute('data-theme-bg', config.background);
    root.setAttribute('data-theme-style', config.uiStyle);
    root.setAttribute('data-theme-radius', config.radius);
    root.setAttribute('data-theme-typography', config.typography);

    // 3. CSS Variables for Accents
    const accentData = ACCENT_COLOR_MAP[config.accent] || ACCENT_COLOR_MAP.blue;
    root.style.setProperty('--primary', accentData.primary);
    root.style.setProperty('--primary-hover', accentData.hover);
    root.style.setProperty('--primary-light', isDark ? accentData.darkLight : accentData.light);
    root.style.setProperty('--primary-ring', accentData.ring);

    // 4. CSS Variables for Radius
    const radiusData = RADIUS_MAP[config.radius] || RADIUS_MAP.medium;
    root.style.setProperty('--radius', radiusData.cssValue);
    root.style.setProperty('--badge-radius', radiusData.badgeRadius);
    root.style.setProperty('--btn-radius', radiusData.buttonRadius);
    root.style.setProperty('--card-radius', radiusData.cardRadius);

    // 5. CSS Variables for Typography
    const typoData = TYPOGRAPHY_MAP[config.typography] || TYPOGRAPHY_MAP.default;
    root.style.setProperty('--font-main', typoData.fontFamily);
    document.body.style.fontFamily = typoData.fontFamily;

    // 6. Background styles
    if (isDark) {
      root.style.setProperty('--bg-base', '#090d16');
      root.style.setProperty('--card-base', config.uiStyle === 'glass' ? 'rgba(17, 24, 39, 0.7)' : '#111827');
      root.style.setProperty('--border-base', config.uiStyle === 'glass' ? 'rgba(255, 255, 255, 0.1)' : '#1e293b');
      root.style.setProperty('--text-main', '#f8fafc');
      root.style.setProperty('--text-muted', '#94a3b8');
    } else {
      root.style.setProperty('--bg-base', config.background === 'solid' ? '#f1f5f9' : '#f8fafc');
      root.style.setProperty('--card-base', config.uiStyle === 'glass' ? 'rgba(255, 255, 255, 0.8)' : '#ffffff');
      root.style.setProperty('--border-base', config.uiStyle === 'glass' ? 'rgba(226, 232, 240, 0.8)' : '#e2e8f0');
      root.style.setProperty('--text-main', '#0f172a');
      root.style.setProperty('--text-muted', '#64748b');
    }

  }, [config, resolvedMode]);

  const setMode = (mode: ThemeMode) => setConfig(prev => ({ ...prev, mode }));
  const setAccent = (accent: AccentColor) => setConfig(prev => ({ ...prev, accent }));
  const setBackground = (background: BackgroundStyle) => setConfig(prev => ({ ...prev, background }));
  const setUIStyle = (uiStyle: UIStyle) => setConfig(prev => ({ ...prev, uiStyle }));
  const setRadius = (radius: BorderRadius) => setConfig(prev => ({ ...prev, radius }));
  const setTypography = (typography: TypographyStyle) => setConfig(prev => ({ ...prev, typography }));

  const updateConfig = (partial: Partial<ThemeConfig>) => setConfig(prev => ({ ...prev, ...partial }));

  const resetTheme = () => {
    setConfig(DEFAULT_THEME_CONFIG);
  };

  return (
    <ThemeContext.Provider
      value={{
        config,
        resolvedMode,
        setMode,
        setAccent,
        setBackground,
        setUIStyle,
        setRadius,
        setTypography,
        updateConfig,
        resetTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
