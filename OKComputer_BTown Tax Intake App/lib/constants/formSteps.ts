import { FormStep } from '@/types';
import GettingStartedStep from '@/components/forms/steps/GettingStartedStep';
import PersonalInfoStep from '@/components/forms/steps/PersonalInfoStep';
import ResidencyStep from '@/components/forms/steps/ResidencyStep';
import MaritalStatusStep from '@/components/forms/steps/MaritalStatusStep';
import DependantsStep from '@/components/forms/steps/DependantsStep';
import IncomeSlipsStep from '@/components/forms/steps/IncomeSlipsStep';
import DeductionsStep from '@/components/forms/steps/DeductionsStep';
import ReviewStep from '@/components/forms/steps/ReviewStep';

export const formSteps: FormStep[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Basic information about your tax situation',
    component: GettingStartedStep,
    isCompleted: (formData) => {
      return !!(formData.province && formData.taxYear && formData.filingType && formData.privacyConsent);
    },
    isVisible: () => true,
  },
  {
    id: 'personal-info',
    title: 'Personal Information',
    description: 'Your contact and identification details',
    component: PersonalInfoStep,
    isCompleted: (formData) => {
      return !!(
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.address &&
        formData.city &&
        formData.postalCode
      );
    },
    isVisible: () => true,
  },
  {
    id: 'residency',
    title: 'Residency Status',
    description: 'Your residency status for tax purposes',
    component: ResidencyStep,
    isCompleted: (formData) => {
      if (formData.isCanadianCitizen === undefined) return false;
      if (formData.isFullYearResident === undefined) return false;
      if (!formData.isFullYearResident && !formData.dateOfEntry) return false;
      return true;
    },
    isVisible: () => true,
  },
  {
    id: 'marital-status',
    title: 'Marital Status',
    description: 'Your marital status and spouse information',
    component: MaritalStatusStep,
    isCompleted: (formData) => {
      if (!formData.maritalStatus) return false;
      if (formData.maritalStatus === 'married' || formData.maritalStatus === 'common-law') {
        return !!(formData.spouseFirstName && formData.spouseLastName && formData.dateOfMarriage);
      }
      return true;
    },
    isVisible: () => true,
  },
  {
    id: 'dependants',
    title: 'Dependants',
    description: 'Information about your dependants',
    component: DependantsStep,
    isCompleted: (formData) => {
      if (formData.hasDependants === undefined) return false;
      if (formData.hasDependants && (!formData.dependants || formData.dependants.length === 0)) {
        return false;
      }
      return true;
    },
    isVisible: () => true,
  },
  {
    id: 'income-slips',
    title: 'Income Slips',
    description: 'Your T-slips and other income sources',
    component: IncomeSlipsStep,
    isCompleted: (formData) => {
      // At least one income source should be provided
      const hasIncomeSlips = formData.incomeSlips && (
        (formData.incomeSlips.t4 && formData.incomeSlips.t4.length > 0) ||
        (formData.incomeSlips.t4a && formData.incomeSlips.t4a.length > 0) ||
        (formData.incomeSlips.t5 && formData.incomeSlips.t5.length > 0) ||
        (formData.incomeSlips.t3 && formData.incomeSlips.t3.length > 0) ||
        (formData.incomeSlips.t4e && formData.incomeSlips.t4e.length > 0) ||
        (formData.incomeSlips.t5007 && formData.incomeSlips.t5007.length > 0) ||
        (formData.incomeSlips.t2202a && formData.incomeSlips.t2202a.length > 0)
      );
      return hasIncomeSlips || !!formData.otherIncomeSources;
    },
    isVisible: () => true,
  },
  {
    id: 'deductions',
    title: 'Deductions & Credits',
    description: 'Tax deductions and credits you may be eligible for',
    component: DeductionsStep,
    isCompleted: () => true, // This step is optional
    isVisible: () => true,
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review your information and submit',
    component: ReviewStep,
    isCompleted: (formData) => {
      return !!(
        formData.accuracyDeclaration &&
        formData.consentCheckbox &&
        formData.digitalSignature
      );
    },
    isVisible: () => true,
  },
];

export const getVisibleSteps = (formData: any) => {
  return formSteps.filter(step => step.isVisible(formData));
};

export const getCurrentStepIndex = (stepId: string, formData: any) => {
  const visibleSteps = getVisibleSteps(formData);
  return visibleSteps.findIndex(step => step.id === stepId);
};

export const getStepProgress = (formData: any) => {
  const visibleSteps = getVisibleSteps(formData);
  const completedSteps = visibleSteps.filter(step => step.isCompleted(formData));
  return {
    current: completedSteps.length,
    total: visibleSteps.length,
    percentage: (completedSteps.length / visibleSteps.length) * 100,
  };
};