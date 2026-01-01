# BTown Tax Intake - Project Outline

## File Structure

```
/mnt/okcomputer/output/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles and Tailwind
│   ├── intake/                  # Intake form pages
│   │   ├── page.tsx            # Main intake form
│   │   ├── success/            # Success page after submission
│   │   └── review/             # Review/edit page
│   └── api/                    # API routes
│       ├── submit/             # Form submission handler
│       ├── draft/              # Draft save/load
│       └── pdf/                # PDF generation
├── components/                 # React Components
│   ├── ui/                     # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Card.tsx
│   │   ├── Progress.tsx
│   │   └── Alert.tsx
│   ├── forms/                  # Form-specific components
│   │   ├── FormStep.tsx
│   │   ├── FormField.tsx
│   │   ├── FileUpload.tsx
│   │   ├── ConditionalFields.tsx
│   │   └── FormSummary.tsx
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   └── animations/             # Animation components
│       ├── FadeIn.tsx
│       ├── SlideTransition.tsx
│       └── ProgressBar.tsx
├── lib/                        # Library code
│   ├── hooks/                  # Custom React hooks
│   │   ├── useForm.ts
│   │   ├── useAutosave.ts
│   │   ├── useConditionalLogic.ts
│   │   └── useProgress.ts
│   ├── utils/                  # Utility functions
│   │   ├── validation.ts
│   │   ├── formatters.ts
│   │   ├── conditionalLogic.ts
│   │   └── pdfGenerator.ts
│   ├── schemas/                # Zod validation schemas
│   │   ├── formSchema.ts
│   │   └── conditionalSchema.ts
│   └── constants/              # Constants and config
│       ├── formSteps.ts
│       ├── taxForms.ts
│       └── conditionalRules.ts
├── public/                     # Static assets
│   ├── images/                 # Images and graphics
│   ├── icons/                  # Icon files
│   └── documents/              # Sample documents
├── styles/                     # Additional styles
│   └── animations.css          # Custom animations
├── types/                      # TypeScript types
│   └── index.ts                # All type definitions
├── .env.example               # Environment variables template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── next.config.js             # Next.js config
└── README.md                  # Setup instructions
```

## Core Components Breakdown

### 1. Form Management System
**Location**: `lib/hooks/useForm.ts`
**Purpose**: Centralized form state management with React Hook Form
**Features**:
- Form data state management
- Field validation with Zod schemas
- Conditional field visibility
- Autosave integration
- Form submission handling

### 2. Conditional Logic Engine
**Location**: `lib/utils/conditionalLogic.ts`
**Purpose**: Dynamic form field visibility based on user responses
**Features**:
- Rule-based conditional system
- Real-time field evaluation
- Support for complex nested conditions
- Integration with form state

### 3. Autosave System
**Location**: `lib/hooks/useAutosave.ts`
**Purpose**: Continuous saving of form data
**Features**:
- LocalStorage persistence
- Backend draft saving
- Debounced save operations
- Visual save status indicators
- Draft recovery on page reload

### 4. Multi-Step Navigation
**Location**: `components/layout/Navigation.tsx`
**Purpose**: Step-by-step form progression
**Features**:
- Progress bar visualization
- Step validation before progression
- Previous/Next navigation
- Jump to specific steps from review
- Mobile-friendly navigation

### 5. PDF Generation
**Location**: `lib/utils/pdfGenerator.ts`
**Purpose**: Create professional PDF summary
**Features**:
- Dynamic content based on form data
- Section organization
- Conditional section inclusion
- SIN masking/exclusion
- Professional formatting
- Footer disclaimers

### 6. Email System
**Location**: `app/api/submit/route.ts`
**Purpose**: Send confirmation emails with PDF attachments
**Features**:
- Admin notification email
- Client confirmation email
- PDF attachment handling
- Email template system
- Error handling and retry logic

### 7. File Upload Component
**Location**: `components/forms/FileUpload.tsx`
**Purpose**: Document upload interface
**Features**:
- Drag-and-drop support
- File type validation
- Progress indicators
- Preview generation
- Multiple file support

### 8. Conditional Field Renderer
**Location**: `components/forms/ConditionalFields.tsx`
**Purpose**: Dynamic field rendering based on conditions
**Features**:
- Rule evaluation
- Smooth animations for field changes
- State management integration
- Validation handling

## Step-by-Step Form Sections

### Step 1: Getting Started
- Province/Territory selection
- Tax year selection (current year, previous year)
- Filing type (Personal, Business, Both)
- Privacy consent

### Step 2: Personal Information
- Full name (first, middle, last)
- Date of birth
- Social Insurance Number (optional, masked)
- Contact information (email, phone)
- Current address
- Mailing address (if different)

### Step 3: Residency Status
- Canadian citizen (Yes/No)
- Residency status on December 31
- Date of entry to Canada (if applicable)
- Previous country of residence
- Provincial residency dates

### Step 4: Marital Status
- Marital status on December 31
- Spouse information (if married/common-law)
- Date of marriage/common-law
- Spouse SIN (optional)
- Date of separation (if applicable)

### Step 5: Dependants
- Do you have dependants? (Yes/No)
- Dependant details (repeatable)
  - Relationship type
  - Full name
  - Date of birth
  - SIN (optional)
  - Income (if applicable)

### Step 6: Income Slips
- T4 slips checklist
- T4A slips checklist
- T5 slips checklist
- T3 slips checklist
- T4E slips checklist
- T5007 slips checklist
- T2202A slips checklist
- Other income sources
- File upload for each slip type

### Step 7: Deductions & Credits
- RRSP contributions
- Tuition amounts (T2202A)
- Medical expenses
- Charitable donations
- Child care expenses
- Employment expenses (T2200)
- Home office expenses
- Moving expenses
- Student loan interest
- Union/professional fees
- Support payments
- Tool expenses
- Self-employment income/expenses
- Rental income
- Foreign income/assets

### Step 8: Review & Submit
- Complete summary of all sections
- Edit capabilities for each section
- Accuracy declaration
- Privacy consent
- Digital signature
- Terms acceptance
- Submit button with loading state

## API Endpoints

### POST /api/submit
- Validate form data
- Generate Intake ID
- Create PDF
- Send emails
- Save to database
- Return success response

### POST /api/draft/save
- Save draft data
- Return draft ID

### GET /api/draft/[id]
- Retrieve draft data
- Return form data

### POST /api/pdf/generate
- Generate PDF from form data
- Return PDF buffer

## Database Schema

### Intake Record
```sql
id (UUID)
intake_id (String, unique)
client_email (String)
client_name (String)
form_data (JSON)
pdf_url (String)
status (Enum: draft, submitted, processed)
created_at (Timestamp)
updated_at (Timestamp)
submitted_at (Timestamp)
```

### Email Log
```sql
id (UUID)
intake_id (String)
recipient_type (Enum: admin, client)
email_address (String)
subject (String)
status (Enum: sent, failed)
sent_at (Timestamp)
error_message (Text)
```

## Security Considerations

### Data Protection
- SIN fields optional and masked
- No sensitive data in logs
- HTTPS only
- Session timeout handling
- Secure file upload validation

### Privacy Compliance
- Clear privacy policy
- Data retention limits
- User consent for data usage
- Right to deletion
- Secure data transmission

### Input Validation
- Server-side validation with Zod
- File type restrictions
- Size limits on uploads
- XSS prevention
- SQL injection prevention

## Performance Optimizations

### Code Splitting
- Lazy load form sections
- Dynamic imports for heavy components
- Optimize bundle size

### Image Optimization
- WebP format support
- Responsive images
- Lazy loading

### Caching Strategy
- Static asset caching
- API response caching
- Form draft caching

### Mobile Performance
- Minimal JavaScript for mobile
- Touch-optimized interactions
- Fast loading times