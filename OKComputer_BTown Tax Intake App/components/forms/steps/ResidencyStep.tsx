import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Card from '@/components/ui/Card';

interface ResidencyStepProps {
  form: UseFormReturn<FormData>;
}

export default function ResidencyStep({ form }: ResidencyStepProps) {
  const { register, watch, formState: { errors }, setValue } = form;
  
  const isCanadianCitizen = watch('isCanadianCitizen');
  const isFullYearResident = watch('isFullYearResident');
  
  return (
    <div className="space-y-6">
      <Card className="p-6 mb-6 bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">
          Residency Status
        </h3>
        <p className="text-primary-700">
          Your residency status determines how you're taxed in Canada. Please provide 
          accurate information about your residency during the tax year.
        </p>
      </Card>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Are you a Canadian citizen?
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="true"
              {...register('isCanadianCitizen', { required: 'Please select your citizenship status' })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
            />
            <span className="ml-3 text-sm text-neutral-700">Yes, I am a Canadian citizen</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="false"
              {...register('isCanadianCitizen', { required: 'Please select your citizenship status' })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
            />
            <span className="ml-3 text-sm text-neutral-700">No, I am not a Canadian citizen</span>
          </label>
        </div>
        {errors.isCanadianCitizen && (
          <p className="mt-2 text-sm text-red-600">{errors.isCanadianCitizen.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Were you a resident of Canada for the entire tax year?
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="true"
              {...register('isFullYearResident', { required: 'Please select your residency status' })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
            />
            <span className="ml-3 text-sm text-neutral-700">Yes, I was a resident for the entire year</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="false"
              {...register('isFullYearResident', { required: 'Please select your residency status' })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
            />
            <span className="ml-3 text-sm text-neutral-700">No, I was not a resident for the entire year</span>
          </label>
        </div>
        {errors.isFullYearResident && (
          <p className="mt-2 text-sm text-red-600">{errors.isFullYearResident.message}</p>
        )}
      </div>

      {/* Show additional fields if not full-year resident or not Canadian citizen */}
      {(isFullYearResident === 'false' || isCanadianCitizen === 'false') && (
        <div className="space-y-6 p-6 bg-neutral-50 rounded-lg">
          <h4 className="text-lg font-medium text-neutral-900">Additional Residency Information</h4>
          
          <Input
            type="date"
            label="Date of Entry to Canada"
            helperText="When did you first become a resident of Canada?"
            error={errors.dateOfEntry?.message}
            {...register('dateOfEntry')}
          />
          
          <Input
            label="Previous Country of Residence"
            placeholder="United States"
            helperText="Which country did you live in before coming to Canada?"
            error={errors.previousCountry?.message}
            {...register('previousCountry')}
          />
          
          <Select
            label="Residency Status"
            helperText="Select your current residency status for tax purposes"
            error={errors.residencyStatus?.message}
            {...register('residencyStatus')}
          >
            <option value="">Select Status</option>
            <option value="factual">Factual Resident</option>
            <option value="deemed">Deemed Resident</option>
            <option value="newcomer">Newcomer to Canada</option>
            <option value="non-resident">Non-Resident</option>
          </Select>
        </div>
      )}

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Residency Status Information</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your residency status affects how you're taxed in Canada. If you're unsure about your status, 
              we recommend consulting with our tax professionals or visiting the CRA website for more information.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}