import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">BTown Accounting</h3>
                <p className="text-neutral-400 text-sm">Professional Tax Services</p>
              </div>
            </div>
            <p className="text-neutral-300 mb-4 max-w-md">
              Professional tax preparation services for individuals and businesses. 
              We make tax season simple, secure, and stress-free.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@btownaccounting.ca"
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
              <a
                href="tel:+1-555-0123"
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label="Phone"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/intake" className="text-neutral-300 hover:text-white transition-colors">
                  Personal Tax Returns
                </Link>
              </li>
              <li>
                <Link href="/intake" className="text-neutral-300 hover:text-white transition-colors">
                  Business Tax Returns
                </Link>
              </li>
              <li>
                <Link href="/intake" className="text-neutral-300 hover:text-white transition-colors">
                  Tax Planning
                </Link>
              </li>
              <li>
                <Link href="/intake" className="text-neutral-300 hover:text-white transition-colors">
                  Bookkeeping Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@btownaccounting.ca"
                  className="text-neutral-300 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/intake/review" className="text-neutral-300 hover:text-white transition-colors">
                  Continue Session
                </Link>
              </li>
              <li>
                <span className="text-neutral-300">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-neutral-300">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © {currentYear} BTown Accounting. All rights reserved.
          </p>
          <p className="text-neutral-400 text-sm mt-2 md:mt-0">
            Professional tax preparation services you can trust.
          </p>
        </div>
      </div>
    </footer>
  );
}