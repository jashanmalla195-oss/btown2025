import { z } from 'zod';

// Form data types
export interface FormData {
  // Step 1: Getting Started
  province?: string;
  taxYear?: string;
  filingType?: 'personal' | 'business' | 'both';
  privacyConsent?: boolean;
  
  // Step 2: Personal Information
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  socialInsuranceNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  mailingAddress?: string;
  mailingCity?: string;
  mailingPostalCode?: string;
  
  // Step 3: Residency Status
  isCanadianCitizen?: boolean;
  residencyStatus?: 'factual' | 'deemed' | 'non-resident' | 'newcomer';
  dateOfEntry?: string;
  previousCountry?: string;
  isFullYearResident?: boolean;
  
  // Step 4: Marital Status
  maritalStatus?: 'single' | 'married' | 'common-law' | 'separated' | 'divorced' | 'widowed';
  spouseFirstName?: string;
  spouseLastName?: string;
  spouseDateOfBirth?: string;
  spouseSocialInsuranceNumber?: string;
  dateOfMarriage?: string;
  dateOfSeparation?: string;
  
  // Step 5: Dependants
  hasDependants?: boolean;
  dependants?: Dependant[];
  
  // Step 6: Income Slips
  incomeSlips?: IncomeSlips;
  otherIncomeSources?: string;
  
  // Step 7: Deductions & Credits
  deductions?: Deductions;
  
  // Step 8: Review & Submit
  accuracyDeclaration?: boolean;
  consentCheckbox?: boolean;
  digitalSignature?: string;
  signatureDate?: string;
}

export interface Dependant {
  id: string;
  relationship: 'child' | 'spouse' | 'parent' | 'grandparent' | 'sibling' | 'other';
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  socialInsuranceNumber?: string;
  isInfirm?: boolean;
  netIncome?: number;
}

export interface IncomeSlips {
  t4?: T4Slip[];
  t4a?: T4ASlip[];
  t5?: T5Slip[];
  t3?: T3Slip[];
  t4e?: T4ESlip[];
  t5007?: T5007Slip[];
  t2202a?: T2202ASlip[];
  t4aP?: T4APSlip[];
  t4aOAS?: T4AOASSlip[];
  t4rsp?: T4RSP[];
  t5008?: T5008Slip[];
  t5013?: T5013Slip[];
  t5018?: T5018Slip[];
  rc62?: RC62Slip[];
  rc210?: RC210Slip[];
}

export interface T4Slip {
  id: string;
  employerName: string;
  employmentIncome: number;
  incomeTaxDeducted: number;
  cppContributions: number;
  eiPremiums: number;
  eiInsurableEarnings: number;
  unionDues: number;
  rppContributions: number;
  charitableDonations: number;
  otherInfo?: Record<string, number>;
}

export interface T4ASlip {
  id: string;
  payerName: string;
  pensionOrAnnuity?: number;
  selfEmployedCommissions?: number;
  otherIncome?: number;
  incomeTaxDeducted?: number;
}

export interface T5Slip {
  id: string;
  issuerName: string;
  interestFromCanadianSources?: number;
  taxableDividends?: number;
  capitalGainsDividends?: number;
  foreignIncome?: number;
  foreignTaxPaid?: number;
}

export interface T3Slip {
  id: string;
  trustName: string;
  capitalGains?: number;
  taxableDividends?: number;
  otherIncome?: number;
  foreignIncome?: number;
  foreignTaxPaid?: number;
}

export interface T4ESlip {
  id: string;
  grossBenefitsPaid?: number;
  incomeTaxDeducted?: number;
  overpayment?: number;
}

export interface T5007Slip {
  id: string;
  workerCompensationBoard?: string;
  socialAssistanceBenefits?: number;
}

export interface T2202ASlip {
  id: string;
  institutionName: string;
  tuitionFees?: number;
  monthsFullTime?: number;
  monthsPartTime?: number;
  studentNumber?: string;
}

export interface T4APSlip {
  id: string;
  cppBenefits?: number;
  incomeTaxDeducted?: number;
}

export interface T4AOASSlip {
  id: string;
  oasBenefits?: number;
  incomeTaxDeducted?: number;
  oasRepayment?: number;
}

export interface T4RSP {
  id: string;
  rrspWithdrawals?: number;
  incomeTaxDeducted?: number;
}

export interface T5008Slip {
  id: string;
  securitiesTransactions?: number;
  proceedsOfDisposition?: number;
  costOrBookValue?: number;
  quantityOfSecurities?: number;
}

export interface T5013Slip {
  id: string;
  partnershipName: string;
  partnershipIncome?: number;
  atRiskAmount?: number;
}

export interface T5018Slip {
  id: string;
  contractPayments?: number;
  constructionSubcontractors?: number;
}

export interface RC62Slip {
  id: string;
  universalChildCareBenefit?: number;
  incomeTaxDeducted?: number;
}

export interface RC210Slip {
  id: string;
  workingIncomeTaxBenefit?: number;
}

export interface Deductions {
  rrspContributions?: number;
  rrspReceipts?: RRSPReceipt[];
  tuitionAmounts?: number;
  medicalExpenses?: number;
  charitableDonations?: number;
  childcareExpenses?: number;
  employmentExpenses?: number;
  homeOfficeExpenses?: number;
  movingExpenses?: number;
  studentLoanInterest?: number;
  unionDues?: number;
  supportPayments?: number;
  toolExpenses?: number;
  carryingCharges?: number;
  selfEmploymentIncome?: number;
  selfEmploymentExpenses?: number;
  rentalIncome?: number;
  rentalExpenses?: number;
  foreignIncome?: number;
  foreignTaxPaid?: number;
  foreignAssetsOver100k?: boolean;
}

export interface RRSPReceipt {
  id: string;
  issuerName: string;
  contributionAmount: number;
  contributionDate: string;
  receiptType: 'first60days' | 'currentYear';
}

// Form step types
export interface FormStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  isCompleted: (formData: FormData) => boolean;
  isVisible: (formData: FormData) => boolean;
}

// Conditional logic types
export interface ConditionalRule {
  field: string;
  condition: 'equals' | 'notEquals' | 'exists' | 'notExists' | 'greaterThan' | 'lessThan';
  value?: any;
  action: 'show' | 'hide' | 'require' | 'optional';
  targetFields: string[];
}

// API response types
export interface SubmitResponse {
  success: boolean;
  intakeId: string;
  message: string;
  pdfUrl?: string;
}

export interface DraftResponse {
  success: boolean;
  draftId: string;
  formData: FormData;
}

// PDF generation types
export interface PDFSection {
  title: string;
  fields: PDFField[];
}

export interface PDFField {
  label: string;
  value: string | number | boolean;
  type: 'text' | 'number' | 'date' | 'currency' | 'boolean';
}

// Validation schema
export const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  socialInsuranceNumber: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to privacy policy'
  }),
  accuracyDeclaration: z.boolean().refine(val => val === true, {
    message: 'You must declare the accuracy of information'
  }),
  consentCheckbox: z.boolean().refine(val => val === true, {
    message: 'You must consent to terms and conditions'
  }),
  digitalSignature: z.string().min(1, 'Digital signature is required'),
});

export type FormSchema = z.infer<typeof formSchema>;