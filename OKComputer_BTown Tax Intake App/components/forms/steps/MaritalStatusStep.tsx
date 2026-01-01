import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

interface MaritalStatusStepProps {
  form: UseFormReturn<FormData>;
}

const maritalStatuses = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'common-law', label: 'Common-law' },
  { value: 'separated', label: 'Separated' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
];

export default function MaritalStatusStep({ form }: MaritalStatusStepProps) {
  const { register, watch, formState: { errors } } = form;
  
  const maritalStatus = watch('maritalStatus');
  
  return (
    <div className="space-y-6">
      <Card className="p-6 mb-6 bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">
          Marital Status
        </h3>
        <p className="text-primary-700">
          Please provide your marital status as of December 31st of the tax year. 
          This affects your tax calculations and eligibility for certain credits.
        </p>
      </Card>

      <Select
        label="Marital Status on December 31st"
        helperText="Select your marital status at the end of the tax year"
        error={errors.maritalStatus?.message}
        {...register('maritalStatus', { required: 'Please select your marital status' })}
      >
        <option value="">Select Status</option>
        {maritalStatuses.map(status => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </Select>

      {/* Show spouse information if married or common-law */}
      {(maritalStatus === 'married' || maritalStatus === 'common-law') && (
        <div className="space-y-6 p-6 bg-neutral-50 rounded-lg">
          <h4 className="text-lg font-medium text-neutral-900">Spouse/Partner Information</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Spouse's First Name"
              placeholder="Jane"
              error={errors.spouseFirstName?.message}
              {...register('spouseFirstName', { required: 'Spouse first name is required' })}
            />
            <Input
              label="Spouse's Last Name"
              placeholder="Smith"
              error={errors.spouseLastName?.message}
              {...register('spouseLastName', { required: 'Spouse last name is required' })}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Date of Marriage/Common-law"
              helperText="When did you get married or start living common-law?"
              error={errors.dateOfMarriage?.message}
              {...register('dateOfMarriage', { required: 'Date is required' })}
            />
            <Input
              type="text"
              label="Spouse's SIN (Optional)"
              placeholder="123-456-789"
              helperText="Your spouse's SIN is optional"
              {...register('spouseSocialInsuranceNumber')}
            />
          </div>
          
          <Input
            type="date"
            label="Spouse's Date of Birth"
            error={errors.spouseDateOfBirth?.message}
            {...register('spouseDateOfBirth')}
          />
        </div>
      )}

      {/* Show separation date if separated */}
      {maritalStatus === 'separated' && (
        <div className="p-6 bg-neutral-50 rounded-lg">
          <h4 className="text-lg font-medium text-neutral-900 mb-4">Separation Information</h4>
          <Input
            type="date"
            label="Date of Separation"
            helperText="When did you separate from your spouse/partner?"
            error={errors.dateOfSeparation?.message}
            {...register('dateOfSeparation', { required: 'Date of separation is required' })}
          />
        </div>
      )}

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Marital Status for Tax Purposes</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your marital status on December 31st determines your filing status for the entire year. 
              If your status changed during the year, use your status on December 31st.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}