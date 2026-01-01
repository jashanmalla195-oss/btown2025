import React from 'react';
import Button from '@/components/ui/Button';

interface FormNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  canProceed: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  isSubmitting: boolean;
  nextStepTitle?: string;
}

export default function FormNavigation({
  onNext,
  onPrevious,
  onSubmit,
  canProceed,
  isFirstStep,
  isLastStep,
  isSubmitting,
  nextStepTitle,
}: FormNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
      {/* Previous Button */}
      <div className="flex-1">
        {!isFirstStep && (
          <Button
            variant="secondary"
            onClick={onPrevious}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            }
          >
            Previous
          </Button>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="hidden sm:flex items-center space-x-2 text-sm text-neutral-500">
        <span>Press Enter to continue</span>
      </div>

      {/* Next/Submit Button */}
      <div className="flex-1 flex justify-end">
        {isLastStep ? (
          <Button
            variant="success"
            onClick={onSubmit}
            disabled={!canProceed || isSubmitting}
            isLoading={isSubmitting}
            rightIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
          >
            {isSubmitting ? 'Submitting...' : 'Submit Intake'}
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canProceed}
            rightIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            }
          >
            {nextStepTitle ? `Next: ${nextStepTitle}` : 'Next'}
          </Button>
        )}
      </div>
    </div>
  );
}

// Mobile navigation component
export function MobileFormNavigation({
  onNext,
  onPrevious,
  onSubmit,
  canProceed,
  isFirstStep,
  isLastStep,
  isSubmitting,
  currentStepTitle,
  nextStepTitle,
}: FormNavigationProps & { currentStepTitle: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 sm:hidden">
      <div className="mb-3">
        <p className="text-sm font-medium text-neutral-900 truncate">{currentStepTitle}</p>
      </div>
      
      <div className="flex justify-between items-center gap-3">
        <div className="flex-1">
          {!isFirstStep && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onPrevious}
              className="w-full"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="ml-2">Back</span>
            </Button>
          )}
        </div>

        <div className="flex-1">
          {isLastStep ? (
            <Button
              variant="success"
              size="sm"
              onClick={onSubmit}
              disabled={!canProceed || isSubmitting}
              isLoading={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? '...' : 'Submit'}
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={onNext}
              disabled={!canProceed}
              className="w-full"
            >
              <span className="mr-2">Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}