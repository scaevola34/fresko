import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - Paint Bucket */}
      <div className="relative">
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 100 100" 
          className="text-primary"
          fill="currentColor"
        >
          {/* Paint bucket */}
          <path d="M25 45 L25 75 Q25 80 30 80 L55 80 Q60 80 60 75 L60 50 L50 40 L25 45 Z" />
          {/* Handle */}
          <ellipse cx="65" cy="35" rx="8" ry="15" transform="rotate(45 65 35)" strokeWidth="3" stroke="currentColor" fill="none" />
          {/* Paint splash */}
          <circle cx="70" cy="65" r="4" className="text-secondary" fill="currentColor" />
          <circle cx="75" cy="55" r="2" className="text-accent" fill="currentColor" />
          <path d="M65 70 Q70 72 75 68" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </div>
      
      {/* Brand text */}
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold text-primary tracking-tight">
          FRESKO
        </span>
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          Faites parler les murs avec l'art
        </span>
      </div>
    </Link>
  );
};