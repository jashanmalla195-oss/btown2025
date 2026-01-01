import React, { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormData } from '@/types';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Checkbox from '@/components/ui/Checkbox';
import Card from '@/components/ui/Card';

interface IncomeSlipsStepProps {
  form: UseFormReturn<FormData>;
}

const slipTypes = [
  { 
    key: 't4', 
    label: 'T4 - Statement of Remuneration Paid',
    description: 'Employment income from employers',
    common: true
  },
  { 
    key: 't4a', 
    label: 'T4A - Statement of Pension, Retirement, Annuity, and Other Income',
    description: 'Pensions, self-employment commissions, scholarships',
    common: true
  },
  { 
    key: 't5', 
    label: 'T5 - Statement of Investment Income',
    description: 'Interest, dividends, and investment income',
    common: true
  },
  { 
    key: 't3', 
    label: 'T3 - Statement of Trust Income Allocations',
    description: 'Income from trusts and mutual funds',
    common: true
  },
  { 
    key: 't4e', 
    label: 'T4E - Statement of Employment Insurance Benefits',
    description: 'Employment Insurance (EI) benefits',
    common: true
  },
  { 
    key: 't5007', 
    label: 'T5007 - Statement of Benefits',
    description: 'Social assistance and workers compensation',
    common: false
  },
  { 
    key: 't2202a', 
    label: 'T2202A - Tuition and Enrolment Certificate',
    description: 'Tuition fees for post-secondary education',
    common: false
  },
  { 
    key: 't4aP', 
    label: 'T4A(P) - Statement of Canada Pension Plan Benefits',
    description: 'CPP retirement, disability, or survivor benefits',
    common: false
  },
  { 
    key: 't4aOAS', 
    label: 'T4A(OAS) - Statement of Old Age Security',
    description: 'Old Age Security benefits',
    common: false
  },
  { 
    key: 't4rsp', 
    label: 'T4RSP - Statement of RRSP Income',
    description: 'RRSP withdrawals',
    common: false
  },
];

export default function IncomeSlipsStep({ form }: IncomeSlipsStepProps) {
  const { register, watch, formState: { errors }, setValue } = form;
  
  const selectedSlips = watch('incomeSlips') || {};
  const otherIncomeSources = watch('otherIncomeSources');
  
  const handleSlipToggle = (slipKey: string, checked: boolean) => {
    setValue(`incomeSlips.${slipKey}`, checked ? [] : undefined);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 mb-6 bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">
          Income Slips (T-Slips)
        </h3>
        <p className="text-primary-700">
          Please indicate which income slips you have received. These are typically issued by 
          employers, financial institutions, and government agencies by the end of February.
        </p>
      </Card>

      <div>
        <h4 className="text-lg font-medium text-neutral-900 mb-4">Common Income Slips</h4>
        <div className="grid gap-4">
          {slipTypes.filter(slip => slip.common).map(slip => (
            <Card key={slip.key} className="p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!selectedSlips[slip.key as keyof typeof selectedSlips]}
                  onChange={(e) => handleSlipToggle(slip.key, e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 mt-1"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">{slip.label}</div>
                  <div className="text-sm text-neutral-600">{slip.description}</div>
                </div>
              </label>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-neutral-900 mb-4">Other Income Slips</h4>
        <div className="grid gap-4">
          {slipTypes.filter(slip => !slip.common).map(slip => (
            <Card key={slip.key} className="p-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!selectedSlips[slip.key as keyof typeof selectedSlips]}
                  onChange={(e) => handleSlipToggle(slip.key, e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 mt-1"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">{slip.label}</div>
                  <div className="text-sm text-neutral-600">{slip.description}</div>
                </div>
              </label>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-neutral-900 mb-4">Other Income Sources</h4>
        <Textarea
          label="Describe any other income sources not listed above"
          placeholder="For example: self-employment income, rental income, foreign income, etc."
          rows={4}
          helperText="Include any income that doesn't appear on a T-slip"
          {...register('otherIncomeSources')}
        />
      </div>

      <Card className="p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start space-x-3">
          <svg className="h-5 w-5 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-amber-900">Missing T-Slips?</h4>
            <p className="text-sm text-amber-700 mt-1">
              If you're missing any T-slips, contact the issuer (employer, bank, etc.) to request a copy. 
              You can also check your CRA My Account online for many slips.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Simple Textarea component since it's used in this step
function Textarea({
  label,
  error,
  helperText,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  helperText?: string;
}) {
  const textareaId = props.id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-neutral-700 mb-2">
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder-neutral-400"
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
        {...props}
      />
      
      {error && (
        <p id={`${textareaId}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${textareaId}-helper`} className="mt-2 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
}