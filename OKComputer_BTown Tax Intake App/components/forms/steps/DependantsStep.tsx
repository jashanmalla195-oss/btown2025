import React, { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormData, Dependant } from '@/types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface DependantsStepProps {
  form: UseFormReturn<FormData>;
}

export default function DependantsStep({ form }: DependantsStepProps) {
  const { register, watch, formState: { errors }, control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dependants',
  });
  
  const hasDependants = watch('hasDependants');
  
  const addDependant = () => {
    append({
      id: `dep-${Date.now()}`,
      relationship: 'child',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      socialInsuranceNumber: '',
      isInfirm: false,
      netIncome: 0,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 mb-6 bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">
          Dependants
        </h3>
        <p className="text-primary-700">
          Do you have any dependants? This includes children, elderly parents, or other 
          family members you support financially.
        </p>
      </Card>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-3">
          Do you have any dependants?
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="true"
              {...register('hasDependants', { required: 'Please select an option' })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
            />
            <span className="ml-3 text-sm text-neutral-700">Yes, I have dependants</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="false"
              {...register('hasDependants', { required: 'Please select an option' })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300"
            />
            <span className="ml-3 text-sm text-neutral-700">No, I do not have dependants</span>
          </label>
        </div>
        {errors.hasDependants && (
          <p className="mt-2 text-sm text-red-600">{errors.hasDependants.message}</p>
        )}
      </div>

      {hasDependants === 'true' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium text-neutral-900">Dependant Information</h4>
            <Button onClick={addDependant} size="sm" variant="secondary">
              Add Dependant
            </Button>
          </div>

          {fields.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-neutral-600">No dependants added yet. Click "Add Dependant" to get started.</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {fields.map((field, index) => (
                <Card key={field.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="text-lg font-medium text-neutral-900">
                      Dependant {index + 1}
                    </h5>
                    <Button
                      onClick={() => remove(index)}
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Select
                      label="Relationship"
                      {...register(`dependants.${index}.relationship` as const, { required: 'Relationship is required' })}
                    >
                      <option value="child">Child</option>
                      <option value="parent">Parent</option>
                      <option value="grandparent">Grandparent</option>
                      <option value="sibling">Sibling</option>
                      <option value="other">Other</option>
                    </Select>
                    <Input
                      type="date"
                      label="Date of Birth"
                      {...register(`dependants.${index}.dateOfBirth` as const, { required: 'Date of birth is required' })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Input
                      label="First Name"
                      placeholder="John"
                      {...register(`dependants.${index}.firstName` as const, { required: 'First name is required' })}
                    />
                    <Input
                      label="Last Name"
                      placeholder="Smith"
                      {...register(`dependants.${index}.lastName` as const, { required: 'Last name is required' })}
                    />
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Social Insurance Number (Optional)"
                      placeholder="123-456-789"
                      helperText="SIN is optional for dependants"
                      {...register(`dependants.${index}.socialInsuranceNumber` as const)}
                    />
                    
                    <Checkbox
                      label="This dependant has a physical or mental impairment"
                      {...register(`dependants.${index}.isInfirm` as const)}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Dependant Credits</h4>
            <p className="text-sm text-blue-700 mt-1">
              Adding dependants may qualify you for additional tax credits including the Canada Child Benefit, 
              childcare expenses, and caregiver amounts.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}