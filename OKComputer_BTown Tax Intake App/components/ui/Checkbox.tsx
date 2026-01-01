import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Checkbox({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  const classes = twMerge(
    'h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded',
    className
  );
  
  return (
    <div className="w-full">
      <div className="flex items-start">
        <input
          id={checkboxId}
          type="checkbox"
          className={classes}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined}
          {...props}
        />
        
        {label && (
          <label htmlFor={checkboxId} className="ml-3 text-sm text-neutral-700 cursor-pointer">
            {label}
          </label>
        )}
      </div>
      
      {error && (
        <p id={`${checkboxId}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${checkboxId}-helper`} className="mt-2 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
}