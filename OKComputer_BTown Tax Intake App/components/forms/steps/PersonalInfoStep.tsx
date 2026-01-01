import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/types';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Card from '@/components/ui/Card';

interface PersonalInfoStepProps {
  form: UseFormReturn<FormData>;
}

export default function PersonalInfoStep({ form }: PersonalInfoStepProps) {
  const { register, watch, formState: { errors }, setValue } = form;
  const [showMailingAddress, setShowMailingAddress] = useState(false);
  
  const socialInsuranceNumber = watch('socialInsuranceNumber');
  
  // Format SIN input
  const handleSINChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 9) value = value.slice(0, 9); // Limit to 9 digits
    
    // Format as XXX-XXX-XXX
    if (value.length >= 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 4) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    }
    
    setValue('socialInsuranceNumber', value);
  };
  
  // Format phone input
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    
    // Format as (XXX) XXX-XXXX
    if (value.length >= 7) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 4) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    
    setValue('phone', value);
  };
  
  // Format postal code input
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 6) value = value.slice(0, 6);
    
    // Format as XXX XXX
    if (value.length >= 4) {
      value = `${value.slice(0, 3)} ${value.slice(3)}`;
    }
    
    setValue('postalCode', value);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 mb-6 bg-primary-50 border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-2">
          Personal Information
        </h3>
        <p className="text-primary-700">
          Please provide your contact and identification details. Your email is required 
          for communication about your tax return.
        </p>
      </Card>

      {/* Name Section */}
      <div>
        <h4 className="text-lg font-medium text-neutral-900 mb-4">Full Name</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            error={errors.firstName?.message}
            {...register('firstName', { required: 'First name is required' })}
          />
          <Input
            label="Middle Name (Optional)"
            placeholder="William"
            {...register('middleName')}
          />
          <Input
            label="Last Name"
            placeholder="Smith"
            error={errors.lastName?.message}
            {...register('lastName', { required: 'Last name is required' })}
          />
        </div>
      </div>

      {/* Date of Birth and SIN */}
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          type="date"
          label="Date of Birth"
          helperText="Required for tax identification purposes"
          error={errors.dateOfBirth?.message}
          {...register('dateOfBirth', { required: 'Date of birth is required' })}
        />
        <Input
          type="text"
          label="Social Insurance Number (Optional)"
          placeholder="123-456-789"
          helperText="Your SIN is optional. You can provide it later if you prefer."
          value={socialInsuranceNumber || ''}
          onChange={handleSINChange}
          {...register('socialInsuranceNumber')}
        />
      </div>

      {/* Contact Information */}
      <div>
        <h4 className="text-lg font-medium text-neutral-900 mb-4">Contact Information</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            type="email"
            label="Email Address"
            placeholder="john.smith@email.com"
            helperText="We'll use this to send you updates about your tax return"
            error={errors.email?.message}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          <Input
            type="tel"
            label="Phone Number (Optional)"
            placeholder="(555) 123-4567"
            helperText="Optional - we may call if we have questions"
            value={watch('phone') || ''}
            onChange={handlePhoneChange}
            {...register('phone')}
          />
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h4 className="text-lg font-medium text-neutral-900 mb-4">Home Address</h4>
        <div className="space-y-4">
          <Input
            label="Street Address"
            placeholder="123 Main Street"
            error={errors.address?.message}
            {...register('address', { required: 'Address is required' })}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="Toronto"
              error={errors.city?.message}
              {...register('city', { required: 'City is required' })}
            />
            <Input
              type="text"
              label="Postal Code"
              placeholder="M5V 3A8"
              helperText="Format: A1A 1A1"
              value={watch('postalCode') || ''}
              onChange={handlePostalCodeChange}
              error={errors.postalCode?.message}
              {...register('postalCode', { required: 'Postal code is required' })}
            />
          </div>
        </div>
      </div>

      {/* Mailing Address */}
      <div>
        <Checkbox
          label="My mailing address is different from my home address"
          checked={showMailingAddress}
          onChange={(e) => setShowMailingAddress(e.target.checked)}
        />
        
        {showMailingAddress && (
          <div className="mt-4 p-4 bg-neutral-50 rounded-lg space-y-4">
            <h5 className="font-medium text-neutral-900">Mailing Address</h5>
            <Input
              label="Street Address"
              placeholder="P.O. Box 123"
              {...register('mailingAddress')}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="City"
                placeholder="Toronto"
                {...register('mailingCity')}
              />
              <Input
                type="text"
                label="Postal Code"
                placeholder="M5V 3A8"
                {...register('mailingPostalCode')}
              />
            </div>
          </div>
        )}
      </div>

      {/* Security Notice */}
      <Card className="p-4 bg-amber-50 border-amber-200">
        <div className="flex items-start space-x-3">
          <svg className="h-5 w-5 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-amber-900">Privacy & Security</h4>
            <p className="text-sm text-amber-700 mt-1">
              All information is encrypted and stored securely. We never share your personal 
              information with third parties. Your SIN is optional and will be masked in our system.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}