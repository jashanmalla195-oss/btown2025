import React from 'react';
import { FormData } from '@/types';
import { StepProgress } from '@/components/ui/Progress';
import Card from '@/components/ui/Card';

interface SidebarProps {
  steps: Array<{
    id: string;
    title: string;
    isCompleted: (formData: FormData) => boolean;
    isVisible: (formData: FormData) => boolean;
  }>;
  currentStepId: string;
  formData: FormData;
  onStepClick: (stepId: string) => void;
}

export default function Sidebar({
  steps,
  currentStepId,
  formData,
  onStepClick,
}: SidebarProps) {
  const stepStates = steps.map(step => ({
    id: step.id,
    title: step.title,
    isCompleted: step.isCompleted(formData),
    isCurrent: step.id === currentStepId,
  }));

  const completedCount = stepStates.filter(step => step.isCompleted).length;
  const totalCount = steps.length;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Progress</h3>
        <p className="text-sm text-neutral-600">
          {completedCount} of {totalCount} sections completed
        </p>
      </div>

      {/* Step Progress */}
      <div className="mb-6">
        <StepProgress
          steps={stepStates}
          currentStep={stepStates.findIndex(step => step.isCurrent)}
        />
      </div>

      {/* Step List */}
      <div className="space-y-2">
        {steps.map((step, index) => {
          const isCompleted = step.isCompleted(formData);
          const isCurrent = step.id === currentStepId;
          const canNavigate = isCompleted || step.id === steps.find(s => !s.isCompleted(formData))?.id;

          return (
            <button
              key={step.id}
              onClick={() => canNavigate && onStepClick(step.id)}
              disabled={!canNavigate}
              className={`
                w-full text-left p-3 rounded-lg transition-all duration-200
                ${isCurrent
                  ? 'bg-primary-50 border-primary-200 border'
                  : canNavigate
                  ? 'hover:bg-neutral-50 border border-transparent'
                  : 'opacity-50 cursor-not-allowed border border-transparent'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${isCompleted
                      ? 'bg-secondary-100 text-secondary-700'
                      : isCurrent
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-neutral-100 text-neutral-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`
                      text-sm font-medium truncate
                      ${isCurrent ? 'text-primary-900' : 'text-neutral-900'}
                    `}
                  >
                    {step.title}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-primary-600 mt-1">Current step</p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="mt-8 pt-6 border-t border-neutral-200">
        <h4 className="text-sm font-medium text-neutral-900 mb-3">Need Help?</h4>
        <div className="space-y-2 text-sm text-neutral-600">
          <p>
            If you have questions about any section, please contact us:
          </p>
          <a
            href="mailto:contact@btownaccounting.ca"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            contact@btownaccounting.ca
          </a>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
        <p className="text-xs text-neutral-500">
          Your information is secure and encrypted. We only use this data to prepare your tax return and never share it with third parties.
        </p>
      </div>
    </Card>
  );
}