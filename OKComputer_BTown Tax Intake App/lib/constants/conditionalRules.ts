import { ConditionalRule } from '@/types';

export const conditionalRules: ConditionalRule[] = [
  // Marital Status Rules
  {
    field: 'maritalStatus',
    condition: 'equals',
    value: 'married',
    action: 'show',
    targetFields: ['spouseFirstName', 'spouseLastName', 'spouseDateOfBirth', 'spouseSocialInsuranceNumber', 'dateOfMarriage']
  },
  {
    field: 'maritalStatus',
    condition: 'equals',
    value: 'common-law',
    action: 'show',
    targetFields: ['spouseFirstName', 'spouseLastName', 'spouseDateOfBirth', 'spouseSocialInsuranceNumber', 'dateOfMarriage']
  },
  {
    field: 'maritalStatus',
    condition: 'equals',
    value: 'separated',
    action: 'show',
    targetFields: ['dateOfSeparation']
  },
  
  // Dependant Rules
  {
    field: 'hasDependants',
    condition: 'equals',
    value: true,
    action: 'show',
    targetFields: ['dependants']
  },
  
  // Residency Rules
  {
    field: 'isFullYearResident',
    condition: 'equals',
    value: false,
    action: 'show',
    targetFields: ['dateOfEntry', 'previousCountry', 'residencyStatus']
  },
  {
    field: 'isCanadianCitizen',
    condition: 'equals',
    value: false,
    action: 'show',
    targetFields: ['dateOfEntry', 'previousCountry', 'residencyStatus']
  },
  
  // Income Rules - Show relevant deduction sections based on income types
  {
    field: 'incomeSlips.t2202a',
    condition: 'exists',
    value: undefined,
    action: 'show',
    targetFields: ['deductions.tuitionAmounts', 'deductions.studentLoanInterest']
  },
  
  // Self-employment Rules
  {
    field: 'incomeSlips.t4a',
    condition: 'exists',
    value: undefined,
    action: 'show',
    targetFields: ['deductions.selfEmploymentIncome', 'deductions.selfEmploymentExpenses']
  },
  
  // Childcare Rules - Only show if has children as dependants
  {
    field: 'dependants',
    condition: 'exists',
    value: undefined,
    action: 'show',
    targetFields: ['deductions.childcareExpenses']
  },
  
  // Foreign Income Rules
  {
    field: 'deductions.foreignIncome',
    condition: 'greaterThan',
    value: 0,
    action: 'show',
    targetFields: ['deductions.foreignTaxPaid', 'deductions.foreignAssetsOver100k']
  },
  
  // RRSP Rules
  {
    field: 'deductions.rrspContributions',
    condition: 'greaterThan',
    value: 0,
    action: 'show',
    targetFields: ['deductions.rrspReceipts']
  },
  
  // Medical Expenses Rules
  {
    field: 'deductions.medicalExpenses',
    condition: 'greaterThan',
    value: 0,
    action: 'show',
    targetFields: ['medicalExpenseDetails']
  },
  
  // Employment Expenses Rules
  {
    field: 'incomeSlips.t4',
    condition: 'exists',
    value: undefined,
    action: 'show',
    targetFields: ['deductions.employmentExpenses', 'deductions.homeOfficeExpenses']
  },
  
  // Moving Expenses Rules
  {
    field: 'residencyStatus',
    condition: 'equals',
    value: 'newcomer',
    action: 'show',
    targetFields: ['deductions.movingExpenses']
  },
];

// Helper function to evaluate conditional rules
export const evaluateCondition = (fieldValue: any, rule: ConditionalRule): boolean => {
  switch (rule.condition) {
    case 'equals':
      return fieldValue === rule.value;
    case 'notEquals':
      return fieldValue !== rule.value;
    case 'exists':
      return fieldValue !== undefined && fieldValue !== null && fieldValue !== '';
    case 'notExists':
      return fieldValue === undefined || fieldValue === null || fieldValue === '';
    case 'greaterThan':
      return typeof fieldValue === 'number' && fieldValue > (rule.value || 0);
    case 'lessThan':
      return typeof fieldValue === 'number' && fieldValue < (rule.value || 0);
    default:
      return false;
  }
};

// Helper function to get visible fields based on form data
export const getVisibleFields = (formData: any, rules: ConditionalRule[] = conditionalRules): string[] => {
  const visibleFields = new Set<string>();
  const hiddenFields = new Set<string>();
  
  // Start with all fields visible by default
  // Then apply conditional rules
  
  rules.forEach(rule => {
    const fieldValue = getNestedValue(formData, rule.field);
    const conditionMet = evaluateCondition(fieldValue, rule);
    
    rule.targetFields.forEach(targetField => {
      if (rule.action === 'show' && conditionMet) {
        visibleFields.add(targetField);
        hiddenFields.delete(targetField);
      } else if (rule.action === 'hide' && conditionMet) {
        hiddenFields.add(targetField);
        visibleFields.delete(targetField);
      }
    });
  });
  
  // Return all fields that are not explicitly hidden
  return Array.from(visibleFields);
};

// Helper function to get nested object values
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}