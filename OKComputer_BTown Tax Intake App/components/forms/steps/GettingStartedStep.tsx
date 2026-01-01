import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Card from '@/components/ui/Card';

interface GettingStartedStepProps {
  form: UseFormReturn<FormData>;
}

const provinces = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'YT', label: 'Yukon' },
];

const taxYears = [
  { value: '2024', label: '2024 (Current Year)' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
];

const filingTypes = [
  { value: 'personal', label: 'Personal Tax Return' },
  { value: 'business', label: 'Business Tax Return' },
  { value: 'both', label: 'Both Personal and Business' },
];

export default function GettingStartedStep({ form }: GettingStartedStepProps) {
  const { register, watch, formState: { errors } } = form;
  
  const privacyConsent = watch('privacyConsent');
  
  return (
    <div className="space-y-6">
      <Card className="p-6 mb-6 bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">
          Welcome to BTown Tax Intake
        </h3>
        <p className="text-primary-700">
          Let's start with some basic information about your tax situation. This will help us 
          customize the form to your specific needs.
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Select
          label="Province/Territory of Residence"
          helperText="Select the province where you lived on December 31st of the tax year"
          error={errors.province?.message}
          {...register('province', { required: 'Please select your province' })}
        >
          <option value="">Select Province</option>
          {provinces.map(province => (
            <option key={province.value} value={province.value}>
              {province.label}
            </option>
          ))}
        </Select>

        <Select
          label="Tax Year"
          helperText="Select the year you want to file taxes for"
          error={errors.taxYear?.message}
          {...register('taxYear', { required: 'Please select a tax year' })}
        >
          <option value="">Select Year</option>
          {taxYears.map(year => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          What type of tax return do you need to file?
        </label>
        <div className="space-y-3">
          {filingTypes.map(type => (
            <label key={type.value} className="flex items-center">
              <input
                type="radio"
                value={type.value}
                {...register('filingType', { required: 'Please select a filing type' })}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
              />
              <span className="ml-3 text-sm text-neutral-700">{type.label}</span>
            </label>
          ))}
        </div>
        {errors.filingType && (
          <p className="mt-2 text-sm text-red-600">{errors.filingType.message}</p>
        )}
      </div>

      <div className="border-t border-neutral-200 pt-6">
        <Checkbox
          label="I consent to the collection and use of my personal information for tax preparation purposes"
          helperText="Your information is secure and will only be used to prepare your tax return. We follow strict privacy guidelines and will never share your information with third parties."
          error={errors.privacyConsent?.message}
          {...register('privacyConsent', { 
            required: 'You must consent to our privacy policy to continue',
          })}
        />
      </div>

      <Card className="p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start space-x-3">
          <svg className="h-5 w-5 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-amber-900">Security Notice</h4>
            <p className="text-sm text-amber-700 mt-1">
              Your Social Insurance Number (SIN) is optional. You can provide it if you're comfortable, 
              or choose to share it directly with your tax preparer later.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}