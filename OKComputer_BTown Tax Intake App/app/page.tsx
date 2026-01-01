'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Typed from 'typed.js';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize typed.js for hero text
    const typed = new Typed('#hero-text', {
      strings: [
        'Professional Tax Preparation',
        'Streamlined Intake Process',
        'Secure & Efficient',
        'Expert Tax Services'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const handleStartIntake = () => {
    setIsLoading(true);
    router.push('/intake');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20 lg:py-32">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
                <span id="hero-text"></span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 max-w-2xl">
                Complete your tax intake questionnaire with our secure, professional system. 
                Designed for Canadian tax clients with step-by-step guidance and expert support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={handleStartIntake}
                  isLoading={isLoading}
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Start Your Tax Intake
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8 py-4"
                  onClick={() => router.push('/intake/review')}
                >
                  Continue Previous Session
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-soft-xl">
                <Image
                  src="/images/hero-tax-office.png"
                  alt="Professional tax preparation workspace"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Our Tax Intake System
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Experience a modern, secure, and efficient way to complete your tax preparation intake
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Secure & Private</h3>
              <p className="text-neutral-600">
                Bank-level security with encrypted data transmission and secure file storage
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Smart & Fast</h3>
              <p className="text-neutral-600">
                Conditional logic shows only relevant questions, saving you time and effort
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Expert Review</h3>
              <p className="text-neutral-600">
                Professional tax preparers review your information for accuracy and completeness
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Mobile Friendly</h3>
              <p className="text-neutral-600">
                Complete your intake on any device with our responsive, mobile-first design
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Auto-Save</h3>
              <p className="text-neutral-600">
                Your progress is automatically saved, so you never lose your work
              </p>
            </Card>

            <Card className="text-center p-8 hover:shadow-soft-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">PDF Summary</h3>
              <p className="text-neutral-600">
                Receive a comprehensive PDF summary of your intake for your records
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-neutral-600">
              Get your taxes prepared professionally in just a few easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Complete Intake</h3>
              <p className="text-neutral-600">
                Answer questions about your tax situation with our guided, step-by-step process
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Submit & Review</h3>
              <p className="text-neutral-600">
                Our tax professionals review your information and prepare your return
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Get Your Refund</h3>
              <p className="text-neutral-600">
                Receive your completed tax return and maximize your refund potential
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your Tax Intake?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of satisfied clients who trust BTown Accounting for their tax preparation needs
          </p>
          <Button
            onClick={handleStartIntake}
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-4 bg-white text-primary-600 hover:bg-primary-50"
            isLoading={isLoading}
          >
            Start Your Tax Intake Now
          </Button>
        </div>
      </section>
    </div>
  );
}