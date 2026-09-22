import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'blue' | 'cyan' | 'green' | 'amber' | 'red' | 'slate' | 'purple';
  className?: string;
}

const variantStyles: Record<string, string> = {
  blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  green: 'bg-green-500/15 text-green-300 border-green-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  red: 'bg-red-500/15 text-red-300 border-red-500/30',
  slate: 'bg-slate-600/30 text-slate-300 border-slate-500/30',
  purple: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
};

export function Badge({ children, variant = 'slate', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
