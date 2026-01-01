import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Card from '@/components/ui/Card';

interface DeductionsStepProps {
  form: UseFormReturn<FormData>;
}

const deductionCategories = [
  {
    key: 'rrsp',
    title: 'RRSP Contributions',
    description: 'Registered Retirement Savings Plan contributions',
    field: 'rrspContributions',
    type: 'currency',
  },
  {
    key: 'tuition',
    title: 'Tuition Amounts',
    description: 'Post-secondary tuition fees (T2202A)',
    field: 'tuitionAmounts',
    type: 'currency',
  },
  {
    key: 'medical',
    title: 'Medical Expenses',
    description: 'Eligible medical expenses for you and your family',
    field: 'medicalExpenses',
    type: 'currency',
  },
  {
    key: 'donations',
    title: 'Charitable Donations',
    description: 'Donations to registered charities',
    field: 'charitableDonations',
    type: 'currency',
  },
  {
    key: 'childcare',
    title: 'Childcare Expenses',
    description: 'Childcare costs to allow you to work or study',
    field: 'childcareExpenses',
    type: 'currency',
  },
  {
    key: 'employment',
    title: 'Employment Expenses',
    description: 'Work-related expenses (T2200 required)',
    field: 'employmentExpenses',
    type: 'currency',
  },
  {
    key: 'homeoffice',
    title: 'Home Office Expenses',
    description: 'Expenses for working from home',
    field: 'homeOfficeExpenses',
    type: 'currency',
  },
  {
    key: 'studentloan',
    title: 'Student Loan Interest',
    description: 'Interest paid on qualifying student loans',
    field: 'studentLoanInterest',
    type: 'currency',
  },
  {
    key: 'union',
    title: 'Union/Professional Dues',
    description: 'Professional association or union fees',
    field: 'unionDues',
    type: 'currency',
  },
  {
    key: 'moving',
    title: 'Moving Expenses',
    description: 'Expenses for moving for work or school',
    field: 'movingExpenses',
    type: 'currency',
  },
];

export default function DeductionsStep({ form }: DeductionsStepProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  
  const deductions = watch('deductions') || {};
  
  const handleCurrencyChange = (field: string, value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    setValue(`deductions.${field}`, parseFloat(numericValue) || 0);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 mb-6 bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">
          Deductions & Credits
        </h3>
        <p className="text-primary-700">
          Select and enter any deductions or tax credits you may be eligible for. 
          These can help reduce your tax payable or increase your refund.
        </p>
      </Card>

      <div className="grid gap-4">
        {deductionCategories.map(category => (
          <Card key={category.key} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-neutral-900">{category.title}</h4>
                <p className="text-sm text-neutral-600 mt-1">{category.description}</p>
              </div>
              <div className="ml-4 w-32">
                <Input
                  type="text"
                  placeholder="0.00"
                  value={deductions[category.field as keyof typeof deductions] || ''}
                  onChange={(e) => handleCurrencyChange(category.field, e.target.value)}
                  className="text-right"
                  prefix="$"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Maximize Your Tax Savings</h4>
            <p className="text-sm text-blue-700 mt-1">
              Don't worry if you're not sure about some deductions. Our tax professionals will review 
              everything and ensure you claim all eligible credits.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}