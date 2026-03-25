import React from 'react';
import { cn } from './Card';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-bridgebox-100 text-bridgebox-800 border-transparent',
    success: 'bg-green-100 text-green-800 border-transparent',
    warning: 'bg-yellow-100 text-yellow-800 border-transparent',
    destructive: 'bg-red-100 text-red-800 border-transparent',
    outline: 'text-gray-900 border-gray-200',
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
