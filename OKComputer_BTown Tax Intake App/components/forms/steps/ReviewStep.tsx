import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { validateFormData } from '@/lib/utils/validation';

interface ReviewStepProps {
  form: UseFormReturn<FormData>;
}

export default function ReviewStep({ form }: ReviewStepProps) {
  const { register, watch, formState: { errors }, getValues } = form;
  const [validationErrors, setValidationErrors] = useState<Array<{field: string, message: string}>>([]);
  
  const formData = getValues();
  
  const handleValidate = () => {
    const result = validateFormData(formData);
    if (!result.isValid && result.errors) {
      setValidationErrors(result.errors);
    } else {
      setValidationErrors([]);
    }
    return result.isValid;
  };
  
  const accuracyDeclaration = watch('accuracyDeclaration');
  const consentCheckbox = watch('consentCheckbox');
  const digitalSignature = watch('digitalSignature');
  
  // Group validation errors by step
  const errorsByStep = {
    'getting-started': validationErrors.filter(e => ['province', 'taxYear', 'filingType', 'privacyConsent'].includes(e.field)),
    'personal-info': validationErrors.filter(e => ['firstName', 'lastName', 'email', 'address', 'city', 'postalCode'].includes(e.field)),
    'residency': validationErrors.filter(e => ['isCanadianCitizen', 'isFullYearResident'].includes(e.field)),
    'marital-status': validationErrors.filter(e => ['maritalStatus'].includes(e.field)),
    'dependants': validationErrors.filter(e => e.field.includes('dependants')),
    'income-slips': validationErrors.filter(e => e.field.includes('income')),
    'review': validationErrors.filter(e => ['accuracyDeclaration', 'consentCheckbox', 'digitalSignature'].includes(e.field)),
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 mb-6 bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">
          Review & Submit
        </h3>
        <p className="text-primary-700">
          Please review all your information carefully before submitting. Once submitted, 
          our tax professionals will begin preparing your return.
        </p>
      </Card>

      {/* Validation Summary */}
      {validationErrors.length > 0 && (
        <Card className="p-6 border-red-200 bg-red-50">
          <h4 className="text-lg font-semibold text-red-900 mb-4">Please Complete Required Fields</h4>
          <div className="space-y-2">
            {Object.entries(errorsByStep).map(([step, errors]) => {
              if (errors.length === 0) return null;
              return (
                <div key={step}>
                  <h5 className="font-medium text-red-800 capitalize">{step.replace('-', ' ')}</h5>
                  <ul className="list-disc list-inside text-sm text-red-700">
                    {errors.map((error, index) => (
                      <li key={index}>{error.message}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <Button onClick={handleValidate} size="sm" className="mt-4">
            Re-validate Form
          </Button>
        </Card>
      )}

      {/* Form Summary */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4">Form Summary</h4>
        <div className="space-y-4 text-sm">
          <div>
            <h5 className="font-medium text-neutral-900">Personal Information</h5>
            <p className="text-neutral-600">
              {formData.firstName} {formData.lastName} • {formData.email}
            </p>
          </div>
          
          <div>
            <h5 className="font-medium text-neutral-900">Tax Year & Province</h5>
            <p className="text-neutral-600">
              {formData.taxYear} • {formData.province}
            </p>
          </div>
          
          <div>
            <h5 className="font-medium text-neutral-900">Marital Status</h5>
            <p className="text-neutral-600">
              {formData.maritalStatus || 'Not provided'}
              {formData.maritalStatus === 'married' && formData.spouseFirstName && (
                <span> • Spouse: {formData.spouseFirstName} {formData.spouseLastName}</span>
              )}
            </p>
          </div>
          
          <div>
            <h5 className="font-medium text-neutral-900">Income Sources</h5>
            <p className="text-neutral-600">
              {formData.incomeSlips ? 'Multiple T-slips selected' : 'No income slips selected'}
              {formData.otherIncomeSources && <span> • Plus other income</span>}
            </p>
          </div>
          
          <div>
            <h5 className="font-medium text-neutral-900">Dependants</h5>
            <p className="text-neutral-600">
              {formData.hasDependants ? `${formData.dependants?.length || 0} dependant(s)` : 'No dependants'}
            </p>
          </div>
        </div>
      </Card>

      {/* Legal Declarations */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-neutral-900 mb-4">Declarations</h4>
        
        <div className="space-y-6">
          <Checkbox
            label="I declare that the information provided in this tax intake form is true, complete, and accurate to the best of my knowledge."
            error={errors.accuracyDeclaration?.message}
            {...register('accuracyDeclaration', { 
              required: 'You must declare the accuracy of your information',
            })}
          />
          
          <Checkbox
            label="I consent to BTown Accounting using my personal information to prepare my tax return and communicate with me about my tax matters. I understand that my information will be kept confidential and secure."
            error={errors.consentCheckbox?.message}
            {...register('consentCheckbox', { 
              required: 'You must consent to our terms and privacy policy',
            })}
          />
          
          <div>
            <Input
              label="Digital Signature"
              placeholder="Type your full name as it appears on your tax return"
              helperText="By typing your name, you are digitally signing this tax intake form"
              error={errors.digitalSignature?.message}
              {...register('digitalSignature', { 
                required: 'Your digital signature is required',
              })}
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-3">
          <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">What happens after you submit?</h4>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• You'll receive a confirmation email with a copy of your intake</li>
              <li>• Our tax professionals will review your information</li>
              <li>• We'll contact you if we need any additional details</li>
              <li>• Your completed tax return will be sent to you for review</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}