
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="50%" stopColor="#39FF14" />
          <stop offset="100%" stopColor="#FF007F" />
        </linearGradient>
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="strongGlow">
           <feGaussianBlur stdDeviation="6" result="blur" />
           <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
           <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
      </defs>
      
      {/* Background Outer Ring - Stronger Visibility */}
      <circle 
        cx="50" cy="50" r="46" 
        stroke="url(#logoGradient)" 
        strokeWidth="4" 
        strokeDasharray="180 60"
        strokeLinecap="round"
        opacity="0.8"
        filter="url(#logoGlow)"
      />
      
      {/* Inner Brain Hexagon Container */}
      <path 
        d="M50 22 L78 38 L78 62 L50 78 L22 62 L22 38 Z" 
        stroke="#39FF14" 
        strokeWidth="2.5" 
        fill="rgba(57, 255, 20, 0.15)"
        filter="url(#logoGlow)"
      />
      
      {/* Circuit Lines representing the brain - Sharper */}
      <g stroke="#39FF14" strokeWidth="2" opacity="1" filter="url(#logoGlow)">
        <path d="M40 40 H45 V45 H50 V35" />
        <path d="M60 40 H55 V45 H50 V35" />
        <path d="M40 60 H45 V55 H50 V65" />
        <path d="M60 60 H55 V55 H50 V65" />
        <circle cx="40" cy="40" r="2.5" fill="#00E5FF" />
        <circle cx="60" cy="40" r="2.5" fill="#FF007F" />
        <circle cx="40" cy="60" r="2.5" fill="#39FF14" />
        <circle cx="60" cy="60" r="2.5" fill="#BC13FE" />
      </g>

      {/* The "CX" Text Logo Stylized - Massive Glow */}
      <g filter="url(#strongGlow)">
        <path 
          d="M32 32 Q18 50 32 68" 
          stroke="#00E5FF" 
          strokeWidth="12" 
          strokeLinecap="round" 
          fill="none"
        />
        <path 
          d="M48 32 L72 68 M72 32 L48 68" 
          stroke="#FF007F" 
          strokeWidth="12" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default Logo;
