import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'rating' | 'outline' | 'glass';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  className,
  icon
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  };

  const variantStyles = {
    primary: 'bg-red-500/20 text-red-400 border border-red-500/30',
    secondary: 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/50',
    accent: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    rating: 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold',
    outline: 'bg-transparent text-zinc-300 border border-zinc-700',
    glass: 'glass-panel text-zinc-200'
  };

  return (
    <span className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
