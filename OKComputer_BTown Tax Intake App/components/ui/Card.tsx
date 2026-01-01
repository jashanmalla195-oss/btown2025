import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}: CardProps) {
  const baseClasses = 'bg-white rounded-lg transition-shadow duration-200';
  
  const variantClasses = {
    default: 'shadow-soft',
    elevated: 'shadow-soft-lg hover:shadow-soft-xl',
    outlined: 'border border-neutral-200 shadow-none',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    className
  );
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}