import { useMemo } from 'react';
import { FormData } from '@/types';
import { getStepProgress, formSteps } from '@/lib/constants/formSteps';

interface UseProgressOptions {
  currentStepId: string;
  formData: FormData;
}

export function useProgress({ currentStepId, formData }: UseProgressOptions) {
  const progress = useMemo(() => {
    return getStepProgress(formData);
  }, [formData]);

  const currentStepIndex = useMemo(() => {
    const visibleSteps = formSteps.filter(step => step.isVisible(formData));
    return visibleSteps.findIndex(step => step.id === currentStepId);
  }, [currentStepId, formData]);

  const currentStep = useMemo(() => {
    return formSteps.find(step => step.id === currentStepId);
  }, [currentStepId]);

  const nextStep = useMemo(() => {
    const visibleSteps = formSteps.filter(step => step.isVisible(formData));
    const currentIndex = visibleSteps.findIndex(step => step.id === currentStepId);
    return currentIndex < visibleSteps.length - 1 ? visibleSteps[currentIndex + 1] : null;
  }, [currentStepId, formData]);

  const previousStep = useMemo(() => {
    const visibleSteps = formSteps.filter(step => step.isVisible(formData));
    const currentIndex = visibleSteps.findIndex(step => step.id === currentStepId);
    return currentIndex > 0 ? visibleSteps[currentIndex - 1] : null;
  }, [currentStepId, formData]);

  const canProceed = useMemo(() => {
    if (!currentStep) return false;
    return currentStep.isCompleted(formData);
  }, [currentStep, formData]);

  const isLastStep = useMemo(() => {
    const visibleSteps = formSteps.filter(step => step.isVisible(formData));
    return currentStepIndex === visibleSteps.length - 1;
  }, [currentStepIndex, formData]);

  const isFirstStep = useMemo(() => {
    return currentStepIndex === 0;
  }, [currentStepIndex]);

  const completedSteps = useMemo(() => {
    const visibleSteps = formSteps.filter(step => step.isVisible(formData));
    return visibleSteps.filter(step => step.isCompleted(formData));
  }, [formData]);

  const incompleteSteps = useMemo(() => {
    const visibleSteps = formSteps.filter(step => step.isVisible(formData));
    return visibleSteps.filter(step => !step.isCompleted(formData));
  }, [formData]);

  return {
    progress,
    currentStep,
    currentStepIndex,
    nextStep,
    previousStep,
    canProceed,
    isLastStep,
    isFirstStep,
    completedSteps,
    incompleteSteps,
    totalSteps: formSteps.filter(step => step.isVisible(formData)).length,
  };
}

// Hook for step-specific progress
export function useStepProgress(stepId: string, formData: FormData) {
  const step = formSteps.find(s => s.id === stepId);
  
  const isCompleted = useMemo(() => {
    return step ? step.isCompleted(formData) : false;
  }, [step, formData]);

  const isVisible = useMemo(() => {
    return step ? step.isVisible(formData) : false;
  }, [step, formData]);

  const completionPercentage = useMemo(() => {
    if (!step || !isVisible) return 0;
    
    // This is a simplified calculation - in a real app, you'd have more detailed field tracking
    const stepFields = getStepFields(stepId);
    const completedFields = stepFields.filter(field => {
      const value = formData[field as keyof FormData];
      return value !== undefined && value !== null && value !== '';
    });
    
    return stepFields.length > 0 ? (completedFields.length / stepFields.length) * 100 : 0;
  }, [step, formData, isVisible]);

  return {
    isCompleted,
    isVisible,
    completionPercentage,
    step,
  };
}

// Helper function to get fields for a specific step
function getStepFields(stepId: string): string[] {
  switch (stepId) {
    case 'getting-started':
      return ['province', 'taxYear', 'filingType', 'privacyConsent'];
    case 'personal-info':
      return ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    case 'residency':
      return ['isCanadianCitizen', 'residencyStatus', 'isFullYearResident', 'dateOfEntry', 'previousCountry'];
    case 'marital-status':
      return ['maritalStatus', 'spouseFirstName', 'spouseLastName', 'spouseDateOfBirth', 'dateOfMarriage'];
    case 'dependants':
      return ['hasDependants', 'dependants'];
    case 'income-slips':
      return ['incomeSlips', 'otherIncomeSources'];
    case 'deductions':
      return ['deductions'];
    case 'review':
      return ['accuracyDeclaration', 'consentCheckbox', 'digitalSignature'];
    default:
      return [];
  }
}