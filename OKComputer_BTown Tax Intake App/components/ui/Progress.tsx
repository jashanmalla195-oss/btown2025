import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ProgressProps {
  value: number;
  max: number;
  showLabel?: boolean;
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  value,
  max,
  showLabel = false,
  className,
  height = 'md'
}: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const heightClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  const classes = twMerge(
    'w-full bg-neutral-200 rounded-full overflow-hidden',
    heightClasses[height],
    className
  );
  
  return (
    <div className="w-full">
      <div className={classes}>
        <div
          className="bg-primary-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`Progress: ${value} of ${max}`}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-2 text-sm text-neutral-600">
          <span>{value} of {max}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
}

interface StepProgressProps {
  steps: Array<{
    id: string;
    title: string;
    isCompleted: boolean;
    isCurrent: boolean;
  }>;
  currentStep: number;
  className?: string;
}

export function StepProgress({
  steps,
  currentStep,
  className
}: StepProgressProps) {
  return (
    <nav className={twMerge('w-full', className)} aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={clsx(
              'relative flex items-center',
              index !== steps.length - 1 && 'flex-1'
            )}
          >
            <div className="flex items-center">
              <span
                className={clsx(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  step.isCompleted
                    ? 'bg-secondary-600 text-white'
                    : step.isCurrent
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-200 text-neutral-600'
                )}
              >
                {step.isCompleted ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </span>
              <span className="ml-3 hidden sm:block">
                <span className={clsx(
                  'text-sm font-medium',
                  step.isCompleted || step.isCurrent ? 'text-neutral-900' : 'text-neutral-500'
                )}>
                  {step.title}
                </span>
              </span>
            </div>
            {index !== steps.length - 1 && (
              <div
                className={clsx(
                  'ml-4 h-0.5 flex-1',
                  step.isCompleted ? 'bg-secondary-600' : 'bg-neutral-200'
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}