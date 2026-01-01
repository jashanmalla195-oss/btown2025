'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const intakeId = searchParams.get('intakeId') || 'Not provided';
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Clear any remaining draft data
    localStorage.removeItem('taxIntakeDraft');
  }, []);

  const handleCopyIntakeId = () => {
    navigator.clipboard.writeText(intakeId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card className="text-center p-8">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-secondary-100">
              <svg className="h-8 w-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Tax Intake Submitted Successfully!
          </h2>
          
          <p className="text-neutral-600 mb-6">
            Thank you for completing your tax intake questionnaire. We've received your information 
            and will begin preparing your tax return.
          </p>

          {/* Intake ID */}
          <div className="bg-neutral-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-neutral-600 mb-2">Your Intake ID:</p>
            <div className="flex items-center justify-center space-x-2">
              <code className="text-lg font-mono font-semibold text-primary-600">
                {intakeId}
              </code>
              <button
                onClick={handleCopyIntakeId}
                className="p-1 text-neutral-400 hover:text-primary-600 transition-colors"
                title="Copy Intake ID"
              >
                {copied ? (
                  <svg className="h-4 w-4 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="text-left mb-6">
            <h3 className="font-semibold text-neutral-900 mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li className="flex items-start">
                <svg className="h-4 w-4 text-secondary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                We've emailed you a copy of your intake summary
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-secondary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Our tax professionals will review your information
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-secondary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                We'll contact you if we need additional information
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-secondary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Your completed tax return will be sent to you for review
              </li>
            </ul>
          </div>

          {/* Important Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Keep your Intake ID safe!</p>
                <p>
                  Reference this ID if you need to contact us about your tax return. 
                  You'll find it in the email we sent you.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/" className="block w-full">
              <Button variant="secondary" className="w-full">
                Return to Home
              </Button>
            </Link>
            <Button
              onClick={() => window.open('mailto:contact@btownaccounting.ca?subject=Tax Intake Question - ID: ' + intakeId)}
              variant="ghost"
              className="w-full"
            >
              Contact Us with Questions
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-500 mt-6">
          Questions? Email us at{' '}
          <a
            href="mailto:contact@btownaccounting.ca"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            contact@btownaccounting.ca
          </a>{' '}
          with your Intake ID.
        </p>
      </div>
    </div>
  );
}