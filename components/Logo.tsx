
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
        <filter id="logoGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background Outer Ring */}
      <circle 
        cx="50" cy="50" r="45" 
        stroke="url(#logoGradient)" 
        strokeWidth="2.5" 
        strokeDasharray="160 80"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* Inner Brain Hexagon Container */}
      <path 
        d="M50 20 L76 35 L76 65 L50 80 L24 65 L24 35 Z" 
        stroke="#39FF14" 
        strokeWidth="1.2" 
        fill="rgba(57, 255, 20, 0.05)"
      />
      
      {/* Circuit Lines representing the brain */}
      <g stroke="#39FF14" strokeWidth="1" opacity="0.8">
        <path d="M40 40 H45 V45 H50 V35" />
        <path d="M60 40 H55 V45 H50 V35" />
        <path d="M40 60 H45 V55 H50 V65" />
        <path d="M60 60 H55 V55 H50 V65" />
        <circle cx="40" cy="40" r="1.5" fill="#00E5FF" />
        <circle cx="60" cy="40" r="1.5" fill="#FF007F" />
        <circle cx="40" cy="60" r="1.5" fill="#39FF14" />
        <circle cx="60" cy="60" r="1.5" fill="#BC13FE" />
      </g>

      {/* The "CX" Text Logo Stylized */}
      <g filter="url(#logoGlow)">
        <path 
          d="M35 35 Q25 50 35 65" 
          stroke="#00E5FF" 
          strokeWidth="9" 
          strokeLinecap="round" 
          fill="none"
        />
        <path 
          d="M45 35 L65 65 M65 35 L45 65" 
          stroke="#FF007F" 
          strokeWidth="9" 
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default Logo;
