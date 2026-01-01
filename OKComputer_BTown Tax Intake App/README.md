# BTown Tax Intake Checklist

A modern, professional web application for Canadian tax preparation intake forms. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Step-by-step guided intake process** with conditional logic
- **Responsive, mobile-first design** optimized for all devices
- **Real-time form validation** with clear error messages
- **Autosave functionality** with localStorage and backend draft support
- **PDF generation** for professional intake summaries
- **Email notifications** to both admin and clients
- **Secure data handling** with SIN masking and privacy protection
- **Progress tracking** with visual indicators and step navigation

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Git for version control

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd btown-tax-intake
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # Email Configuration
   RESEND_API_KEY="your_resend_api_key_here"
   FROM_EMAIL="noreply@btownaccounting.ca"
   ADMIN_EMAIL="contact@btownaccounting.ca"
   
   # App Configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NODE_ENV="development"
   
   # Security
   SESSION_SECRET="your_session_secret_here"
   
   # File Upload
   MAX_FILE_SIZE="10485760"
   ALLOWED_FILE_TYPES=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
   ```

4. **Set up the database** (if using Prisma)
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                # Base UI components
│   ├── forms/             # Form-specific components
│   └── layout/            # Layout components
├── lib/                   # Library code
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── schemas/           # Zod validation schemas
│   └── constants/         # Constants and configuration
├── public/                # Static assets
├── types/                 # TypeScript type definitions
└── styles/                # Additional styles
```

## Key Components

### Form Management
- `useForm` - Centralized form state management with React Hook Form
- `useAutosave` - Automatic form saving functionality
- `useProgress` - Progress tracking and step navigation

### Conditional Logic
- `conditionalRules.ts` - Rule-based conditional field system
- Dynamic field visibility based on user responses
- Support for complex nested conditions

### PDF Generation
- `pdfGenerator.ts` - Professional PDF creation with jsPDF
- Dynamic content based on form data
- SIN masking and privacy protection

### Email System
- Integration with Resend for transactional emails
- Admin notifications and client confirmations
- PDF attachments for both parties

## Configuration

### Email Setup
The application uses Resend for email delivery. To set up:

1. Create an account at [Resend](https://resend.com)
2. Add your domain and verify it
3. Generate an API key
4. Add the API key to your `.env.local` file

### Database Setup
The application is configured to use SQLite with Prisma for development. For production:

1. Set up a PostgreSQL database
2. Update `DATABASE_URL` in `.env.local`
3. Run `npx prisma db push` to create tables

### Customization

#### Branding
- Update logo and company name in `Header.tsx`
- Modify colors in `tailwind.config.js`
- Update email templates in API routes

#### Form Fields
- Add new fields to `types/index.ts`
- Update validation schemas
- Add conditional rules to `conditionalRules.ts`
- Create corresponding UI components

#### Styling
- Modify Tailwind configuration in `tailwind.config.js`
- Update global styles in `app/globals.css`
- Customize component styles

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
- Build: `npm run build`
- Start: `npm start`
- Ensure environment variables are configured

## Security Considerations

- SIN numbers are optional and masked in the UI
- Sensitive data is not logged
- HTTPS is required for production
- Form data is validated on both client and server
- Email attachments are sent securely

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

### Adding New Features
1. Update types in `types/index.ts`
2. Add validation rules
3. Create or update components
4. Add conditional logic if needed
5. Update API routes
6. Test thoroughly

## Support

For questions or support, please contact:
- Email: contact@btownaccounting.ca
- Include your Intake ID for reference

## License

This project is proprietary software developed for BTown Accounting.