import React, { useState } from 'react';
import { 
  useTheme, 
  ACCENT_COLOR_MAP, 
  RADIUS_MAP, 
  TYPOGRAPHY_MAP 
} from '../context/ThemeContext';
import { 
  ThemeMode, 
  AccentColor, 
  BackgroundStyle, 
  UIStyle, 
  BorderRadius, 
  TypographyStyle 
} from '../types';
import { ThemePreview } from './ThemePreview';
import { 
  Sun, 
  Moon, 
  Laptop, 
  Palette, 
  RotateCcw, 
  Check, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  Type, 
  Square, 
  Layers
} from 'lucide-react';

export const ThemeSettings: React.FC = () => {
  const { 
    config, 
    setMode, 
    setAccent, 
    setBackground, 
    setUIStyle, 
    setRadius, 
    setTypography, 
    resetTheme 
  } = useTheme();

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleReset = () => {
    resetTheme();
    showToast('Theme reset to default.');
  };

  const modeOptions: { id: ThemeMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Laptop },
  ];

  const accentOptions: { id: AccentColor; name: string; hex: string }[] = Object.entries(ACCENT_COLOR_MAP).map(([key, val]) => ({
    id: key as AccentColor,
    name: val.name,
    hex: val.primary
  }));

  const bgOptions: { id: BackgroundStyle; label: string; desc: string }[] = [
    { id: 'default', label: 'Default', desc: 'Standard clean surface' },
    { id: 'solid', label: 'Solid', desc: 'Flat contrast canvas' },
    { id: 'gradient', label: 'Soft Gradient', desc: 'Top-down tone blend' },
    { id: 'mesh', label: 'Subtle Mesh', desc: 'Radial modern accents' },
    { id: 'glass', label: 'Minimal Glass', desc: 'Smooth backdrop blur' },
  ];

  const uiStyleOptions: { id: UIStyle; label: string; desc: string }[] = [
    { id: 'minimal', label: 'Minimal', desc: 'Clean lines, flat depth' },
    { id: 'rounded', label: 'Rounded', desc: 'Friendly softer curves' },
    { id: 'glass', label: 'Glass', desc: 'Aero glassmorphism' },
    { id: 'elevated', label: 'Elevated', desc: 'Soft floating shadows' },
  ];

  const radiusOptions: { id: BorderRadius; label: string; preview: string }[] = [
    { id: 'sharp', label: 'Sharp (2px)', preview: 'rounded-none' },
    { id: 'medium', label: 'Medium (10px)', preview: 'rounded-lg' },
    { id: 'rounded', label: 'Rounded (18px)', preview: 'rounded-2xl' },
  ];

  const typographyOptions: { id: TypographyStyle; label: string; desc: string }[] = Object.entries(TYPOGRAPHY_MAP).map(([key, val]) => ({
    id: key as TypographyStyle,
    label: val.name,
    desc: val.description
  }));

  return (
    <div className="space-y-8 font-sans text-slate-900 dark:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold flex items-center gap-2.5 shadow-xl animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Settings Card Container */}
      <div className="p-6 sm:p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-8">
        
        {/* Top Header & Reset Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <Palette className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
              <span>SkillSphere Appearance Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Global Theme & Appearance Customization
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tailor color schemes, contrast, backgrounds, corner radius, and layout styling across the entire website.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>
        </div>

        {/* 1. Theme Mode: Light / Dark / System */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
              1. Theme Mode
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Choose light educational readability, comfortable dark mode, or automatic OS sync.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {modeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = config.mode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMode(opt.id)}
                  className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all min-h-[48px] ${
                    isSelected
                      ? 'border-2 text-white shadow-xs font-bold'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  style={isSelected ? { backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' } : {}}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Accent Color Presets */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
                2. Primary Accent Color
              </h3>
            </div>
            <span className="text-xs font-semibold capitalize px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              Active: {config.accent}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Selected accent propagates globally to buttons, active navigation, badges, focus rings, progress bars, and charts.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {accentOptions.map((accent) => {
              const isSelected = config.accent === accent.id;
              return (
                <button
                  key={accent.id}
                  type="button"
                  onClick={() => setAccent(accent.id)}
                  className={`p-2.5 rounded-xl border flex items-center justify-between gap-2.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-800 border-2 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                  style={isSelected ? { borderColor: accent.hex } : {}}
                >
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-5 h-5 rounded-full shrink-0 shadow-2xs border border-white/20"
                      style={{ backgroundColor: accent.hex }}
                    />
                    <span className="truncate">{accent.name}</span>
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 shrink-0" style={{ color: accent.hex }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Background Style */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
              3. Background Canvas Style
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Set the texture and depth of page canvases while maintaining high educational contrast.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {bgOptions.map((bg) => {
              const isSelected = config.background === bg.id;
              return (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => setBackground(bg.id)}
                  className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                    isSelected
                      ? 'border-2 bg-slate-100 dark:bg-slate-800 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  style={isSelected ? { borderColor: 'var(--primary)' } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{bg.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight truncate">
                    {bg.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. UI Style & Card Feel */}
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4" style={{ color: 'var(--primary)' }} />
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
              4. UI Style & Component Feel
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Define container surfaces, backdrop blur, elevation shadows, and edge presentation.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {uiStyleOptions.map((ui) => {
              const isSelected = config.uiStyle === ui.id;
              return (
                <button
                  key={ui.id}
                  type="button"
                  onClick={() => setUIStyle(ui.id)}
                  className={`p-3 rounded-xl border text-left transition-all space-y-1 ${
                    isSelected
                      ? 'border-2 bg-slate-100 dark:bg-slate-800 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  style={isSelected ? { borderColor: 'var(--primary)' } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{ui.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />}
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    {ui.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Border Radius & Typography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
          
          {/* Border Radius */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
              5. Corner Radius
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {radiusOptions.map((rad) => {
                const isSelected = config.radius === rad.id;
                return (
                  <button
                    key={rad.id}
                    type="button"
                    onClick={() => setRadius(rad.id)}
                    className={`py-2.5 px-3 border text-xs font-semibold text-center transition-all ${
                      isSelected
                        ? 'border-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                    style={{
                      borderRadius: RADIUS_MAP[rad.id].buttonRadius,
                      borderColor: isSelected ? 'var(--primary)' : undefined
                    }}
                  >
                    {rad.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography Preference */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-700 dark:text-slate-300">
                6. Typography Font Style
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {typographyOptions.map((typo) => {
                const isSelected = config.typography === typo.id;
                return (
                  <button
                    key={typo.id}
                    type="button"
                    onClick={() => setTypography(typo.id)}
                    className={`p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-all ${
                      isSelected
                        ? 'border-2 bg-slate-100 dark:bg-slate-800 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                    style={isSelected ? { borderColor: 'var(--primary)' } : {}}
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">{typo.label}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{typo.desc}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--primary)' }} />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Live Preview Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: 'var(--primary)' }} />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Live Preview (Instant Response)
          </h2>
        </div>
        <ThemePreview />
      </div>

    </div>
  );
};
