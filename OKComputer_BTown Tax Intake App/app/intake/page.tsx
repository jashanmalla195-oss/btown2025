'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider } from 'react-hook-form';
import { useForm, useFormAutosave } from '@/lib/hooks/useForm';
import { useProgress } from '@/lib/hooks/useProgress';
import { getVisibleSteps } from '@/lib/constants/formSteps';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import FormStepper from '@/components/forms/FormStepper';
import FormNavigation from '@/components/forms/FormNavigation';
import { ProgressBar } from '@/components/ui/Progress';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FormData } from '@/types';

export default function IntakePage() {
  const router = useRouter();
  const [currentStepId, setCurrentStepId] = useState('getting-started');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with autosave
  const form = useForm({
    onSave: async (data) => {
      // Save to backend draft
      try {
        const response = await fetch('/api/draft/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to save draft');
        }
      } catch (error) {
        console.error('Draft save error:', error);
      }
    },
  });
  
  // Setup autosave
  useFormAutosave(form, {
    interval: 30000, // 30 seconds
    enabled: true,
  });
  
  // Load draft on mount
  useEffect(() => {
    const loadDraft = async () => {
      const hasDraft = form.loadDraft();
      if (hasDraft) {
        // Try to load from backend if available
        try {
          const response = await fetch('/api/draft/load', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (response.ok) {
            const { data } = await response.json();
            // Merge backend data with localStorage data
            Object.keys(data).forEach(key => {
              form.setFieldValue(key as keyof FormData, data[key]);
            });
          }
        } catch (error) {
          console.error('Backend draft load error:', error);
        }
      }
    };
    
    loadDraft();
  }, [form]);
  
  const formData = form.getValues();
  const visibleSteps = getVisibleSteps(formData);
  const progress = useProgress({ currentStepId, formData });
  
  const CurrentStepComponent = progress.currentStep?.component;
  
  const handleNext = async () => {
    if (progress.nextStep) {
      // Validate current step before proceeding
      const isCurrentStepValid = progress.canProceed;
      
      if (isCurrentStepValid) {
        setCurrentStepId(progress.nextStep.id);
        
        // Save progress
        await form.saveForm();
      } else {
        // Show validation errors
        form.trigger();
      }
    }
  };
  
  const handlePrevious = () => {
    if (progress.previousStep) {
      setCurrentStepId(progress.previousStep.id);
    }
  };
  
  const handleStepClick = (stepId: string) => {
    // Allow jumping to completed steps or the next incomplete step
    const step = visibleSteps.find(s => s.id === stepId);
    if (step && (step.isCompleted(formData) || stepId === progress.incompleteSteps[0]?.id)) {
      setCurrentStepId(stepId);
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Final validation
      const isValid = await form.trigger();
      
      if (!isValid) {
        throw new Error('Please complete all required fields');
      }
      
      // Submit form
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData: formData,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Submission failed');
      }
      
      const result = await response.json();
      
      // Clear draft
      form.clearDraft();
      
      // Redirect to success page
      router.push(`/intake/success?intakeId=${result.intakeId}`);
      
    } catch (error) {
      console.error('Submission error:', error);
      alert(error instanceof Error ? error.message : 'An error occurred during submission');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Show loading state while initializing
  if (!CurrentStepComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Progress Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-semibold text-neutral-900 truncate">
                {progress.currentStep?.title || 'Tax Intake'}
              </h1>
              <p className="text-sm text-neutral-500">
                Step {progress.currentStepIndex + 1} of {progress.totalSteps}
              </p>
            </div>
            
            <div className="w-full sm:w-64">
              <ProgressBar
                value={progress.currentStepIndex + 1}
                max={progress.totalSteps}
                showLabel
              />
            </div>
            
            {form.lastSaved && (
              <div className="text-sm text-neutral-500">
                Last saved: {form.lastSaved.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <Sidebar
                steps={visibleSteps}
                currentStepId={currentStepId}
                formData={formData}
                onStepClick={handleStepClick}
              />
            </div>
          </div>
          
          {/* Main Form */}
          <div className="lg:col-span-3">
            <FormProvider {...form}>
              <form onSubmit={(e) => e.preventDefault()}>
                <Card className="mb-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                      {progress.currentStep?.title}
                    </h2>
                    <p className="text-neutral-600">
                      {progress.currentStep?.description}
                    </p>
                  </div>
                  
                  {/* Current Step Content */}
                  <div className="animate-fade-in">
                    <CurrentStepComponent form={form} />
                  </div>
                </Card>
                
                {/* Form Navigation */}
                <FormNavigation
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onSubmit={handleSubmit}
                  canProceed={progress.canProceed}
                  isFirstStep={progress.isFirstStep}
                  isLastStep={progress.isLastStep}
                  isSubmitting={isSubmitting}
                  nextStepTitle={progress.nextStep?.title}
                />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}