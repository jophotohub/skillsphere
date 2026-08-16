import React, { useState } from 'react';

export const OFFICIAL_LOGO_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvvcBfml-DDZyGVgG4RLIhYG1XlpxiJQJikej9EBOWcPnZV_70i6-Hbls&s=10';
export const LOCAL_LOGO_PATH = '/logo.png';

export interface SkillSphereLogoProps {
  variant?: 'full' | 'horizontal' | 'icon';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  theme?: 'dark' | 'light' | 'auto';
  className?: string;
  showTagline?: boolean;
  onClick?: () => void;
}

export const SkillSphereLogo: React.FC<SkillSphereLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'auto',
  className = '',
  showTagline = true,
  onClick
}) => {
  const [imgSrc, setImgSrc] = useState<string>(LOCAL_LOGO_PATH);

  // Responsive and exact dimension mappings maintaining 1:1 aspect ratio
  const dimensions = {
    xs: { px: 22, text: 'text-xs', tagline: 'text-[7px]' },
    sm: { px: 30, text: 'text-sm', tagline: 'text-[8px]' },
    md: { px: 40, text: 'text-base sm:text-lg', tagline: 'text-[9px] sm:text-[10px]' },
    lg: { px: 52, text: 'text-xl sm:text-2xl', tagline: 'text-[11px]' },
    xl: { px: 68, text: 'text-2xl sm:text-3xl', tagline: 'text-[12px]' },
    '2xl': { px: 84, text: 'text-3xl sm:text-4xl', tagline: 'text-[13px]' },
  }[size];

  const handleImageError = () => {
    if (imgSrc !== OFFICIAL_LOGO_URL) {
      setImgSrc(OFFICIAL_LOGO_URL);
    }
  };

  return (
    <div 
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Official SkillSphere Logo Image Container */}
      <div 
        className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
        style={{ width: `${dimensions.px}px`, height: `${dimensions.px}px` }}
      >
        <img
          src={imgSrc}
          alt="SkillSphere Official Logo"
          onError={handleImageError}
          className="w-full h-full object-contain rounded-lg shadow-2xs"
          loading="eager"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Official Wordmark and Tagline */}
      {variant !== 'icon' && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-bold tracking-tight text-foreground ${dimensions.text}`}>
              SkillSphere
            </span>
          </div>

          {(variant === 'full' || showTagline) && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-[1px] w-2.5 bg-primary/60" />
              <span className={`font-semibold uppercase tracking-widest text-muted-foreground ${dimensions.tagline}`}>
                Discover your skills. Explore your future.
              </span>
              <span className="h-[1px] w-2.5 bg-primary/60" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Also export as Logo for backwards compatibility
export const Logo = SkillSphereLogo;
export default SkillSphereLogo;
