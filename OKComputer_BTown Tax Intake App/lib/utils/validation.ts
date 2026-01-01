import { FormData, formSchema } from '@/types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export function validateFormData(formData: Partial<FormData>): ValidationResult {
  try {
    // Validate with Zod schema
    const result = formSchema.parse(formData);
    
    // Additional business logic validation
    const businessErrors = validateBusinessRules(formData);
    
    if (businessErrors.length > 0) {
      return {
        isValid: false,
        errors: businessErrors,
      };
    }
    
    return { isValid: true };
    
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      const zodError = error as any;
      return {
        isValid: false,
        errors: zodError.errors.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    
    return {
      isValid: false,
      errors: [{ field: 'general', message: 'Validation failed' }],
    };
  }
}

function validateBusinessRules(formData: Partial<FormData>): Array<{field: string, message: string}> {
  const errors: Array<{field: string, message: string}> = [];
  
  // Validate SIN format if provided
  if (formData.socialInsuranceNumber) {
    const sinPattern = /^\d{3}-\d{3}-\d{3}$/;
    if (!sinPattern.test(formData.socialInsuranceNumber)) {
      errors.push({
        field: 'socialInsuranceNumber',
        message: 'SIN must be in format 123-456-789'
      });
    }
  }
  
  // Validate date of birth (must be 18+ years old)
  if (formData.dateOfBirth) {
    const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 18) {
      errors.push({
        field: 'dateOfBirth',
        message: 'Must be 18 years or older'
      });
    }
  }
  
  // Validate postal code format for Canada
  if (formData.postalCode) {
    const postalPattern = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i;
    if (!postalPattern.test(formData.postalCode)) {
      errors.push({
        field: 'postalCode',
        message: 'Invalid Canadian postal code format'
      });
    }
  }
  
  // Validate marital status consistency
  if (formData.maritalStatus === 'married' || formData.maritalStatus === 'common-law') {
    if (!formData.spouseFirstName || !formData.spouseLastName || !formData.dateOfMarriage) {
      errors.push({
        field: 'maritalStatus',
        message: 'Spouse information is required for married/common-law status'
      });
    }
  }
  
  // Validate dependant information
  if (formData.hasDependants && formData.dependants) {
    formData.dependants.forEach((dependant, index) => {
      if (!dependant.firstName || !dependant.lastName || !dependant.dateOfBirth) {
        errors.push({
          field: `dependants.${index}`,
          message: `Dependant ${index + 1} is missing required information`
        });
      }
    });
  }
  
  // Validate income sources (at least one should be provided)
  const hasIncomeSlips = formData.incomeSlips && (
    (formData.incomeSlips.t4 && formData.incomeSlips.t4.length > 0) ||
    (formData.incomeSlips.t4a && formData.incomeSlips.t4a.length > 0) ||
    (formData.incomeSlips.t5 && formData.incomeSlips.t5.length > 0) ||
    (formData.incomeSlips.t3 && formData.incomeSlips.t3.length > 0) ||
    (formData.incomeSlips.t4e && formData.incomeSlips.t4e.length > 0) ||
    (formData.incomeSlips.t5007 && formData.incomeSlips.t5007.length > 0) ||
    (formData.incomeSlips.t2202a && formData.incomeSlips.t2202a.length > 0)
  );
  
  if (!hasIncomeSlips && !formData.otherIncomeSources) {
    errors.push({
      field: 'incomeSlips',
      message: 'At least one income source must be provided'
    });
  }
  
  return errors;
}

// Validate specific field
export function validateField(fieldName: string, value: any): {isValid: boolean, message?: string} {
  try {
    const fieldSchema = formSchema.shape[fieldName as keyof typeof formSchema.shape];
    if (fieldSchema) {
      fieldSchema.parse(value);
      return { isValid: true };
    }
    return { isValid: true };
  } catch (error) {
    if (error instanceof Error && 'message' in error) {
      return { isValid: false, message: error.message };
    }
    return { isValid: false, message: 'Invalid value' };
  }
}

// Check if form step is complete
export function isStepComplete(stepId: string, formData: Partial<FormData>): boolean {
  switch (stepId) {
    case 'getting-started':
      return !!(formData.province && formData.taxYear && formData.filingType && formData.privacyConsent);
      
    case 'personal-info':
      return !!(
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.address &&
        formData.city &&
        formData.postalCode
      );
      
    case 'residency':
      return !!(
        formData.isCanadianCitizen !== undefined &&
        formData.isFullYearResident !== undefined
      );
      
    case 'marital-status':
      if (!formData.maritalStatus) return false;
      if (formData.maritalStatus === 'married' || formData.maritalStatus === 'common-law') {
        return !!(formData.spouseFirstName && formData.spouseLastName && formData.dateOfMarriage);
      }
      return true;
      
    case 'dependants':
      if (formData.hasDependants === undefined) return false;
      if (formData.hasDependants && (!formData.dependants || formData.dependants.length === 0)) {
        return false;
      }
      return true;
      
    case 'income-slips':
      const hasIncomeSlips = formData.incomeSlips && (
        (formData.incomeSlips.t4 && formData.incomeSlips.t4.length > 0) ||
        (formData.incomeSlips.t4a && formData.incomeSlips.t4a.length > 0) ||
        (formData.incomeSlips.t5 && formData.incomeSlips.t5.length > 0) ||
        (formData.incomeSlips.t3 && formData.incomeSlips.t3.length > 0) ||
        (formData.incomeSlips.t4e && formData.incomeSlips.t4e.length > 0) ||
        (formData.incomeSlips.t5007 && formData.incomeSlips.t5007.length > 0) ||
        (formData.incomeSlips.t2202a && formData.incomeSlips.t2202a.length > 0)
      );
      return !!(hasIncomeSlips || formData.otherIncomeSources);
      
    case 'deductions':
      // This step is optional
      return true;
      
    case 'review':
      return !!(
        formData.accuracyDeclaration &&
        formData.consentCheckbox &&
        formData.digitalSignature
      );
      
    default:
      return false;
  }
}