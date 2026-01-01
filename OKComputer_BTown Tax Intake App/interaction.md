# BTown Tax Intake Checklist - Interaction Design

## Core User Journey
1. **Landing/Start**: User arrives at clean, professional interface with immediate option to start intake
2. **Step-by-Step Flow**: 8 main sections with conditional sub-sections that appear based on answers
3. **Autosave**: Continuous saving with visual feedback
4. **Review**: Final review screen with edit capabilities
5. **Submit**: Generate PDF and send emails with success confirmation

## Interactive Components

### 1. Multi-Step Form Navigator
- **Progress Bar**: Visual indicator at top showing current step (e.g., "Step 2 of 8")
- **Sidebar Navigation**: Desktop-only sidebar showing all sections with checkmarks for completion
- **Step Indicators**: Each section card clearly numbered and labeled
- **Smooth Transitions**: Animated transitions between steps

### 2. Conditional Question Logic
- **Dynamic Field Display**: Questions appear/disappear based on previous answers
- **Real-time Validation**: Immediate feedback on required fields
- **Smart Branching**: Complex logic for marital status, dependants, income types
- **Optional Pathways**: "I'm not sure" options that skip non-critical sections

### 3. Autosave System
- **Visual Feedback**: Subtle indicator showing "Saving..." and "Saved"
- **Local Storage**: Browser-based persistence
- **Draft Recovery**: Automatic resume if user returns later
- **Save Status**: Clear indication of what's been saved

### 4. Document Upload Interface
- **Drag & Drop**: Modern file upload for tax documents
- **File Preview**: Thumbnail previews of uploaded documents
- **Progress Indicators**: Upload progress and success states
- **File Management**: Remove/replace uploaded files

### 5. Review & Edit System
- **Section Summary**: Collapsible sections showing all answers
- **Inline Editing**: Click to edit any answer directly from review screen
- **Validation Summary**: Clear indication of any missing required fields
- **Final Consent**: Digital signature and agreement checkboxes

## Form Sections & Conditional Logic

### Step 1: Getting Started
- Province selection dropdown
- Tax year selector (current year and previous year)
- Filing type: Personal, Business, or Both

### Step 2: Personal Information
- Basic contact info (name, email required)
- SIN field (optional, with security warning)
- Address with auto-complete suggestions
- Phone number with format validation

### Step 3: Residency Status
- Full-year resident checkbox
- If "No": Arrival date, previous country, residency status
- Provincial residency dates

### Step 4: Marital Status (Conditional)
- Status dropdown: Single, Married, Common-law, Separated, Divorced, Widowed
- If Married/Common-law: Spouse information section
- Spouse SIN (optional, with same security warnings)

### Step 5: Dependants (Conditional)
- "Do you have dependants?" toggle
- If Yes: Add dependant cards (repeatable)
- Each dependant: Type (child, elderly parent, etc.), name, DOB, SIN (optional)

### Step 6: Income Slips Checklist
- Interactive checklist of all Canadian tax slips (T4, T4A, T5, T3, T4E, T5007, etc.)
- Each slip type with upload placeholder
- Manual entry option for missing slips
- Other income sources section

### Step 7: Deductions & Credits (Highly Conditional)
- Tuition amounts (if student)
- RRSP contributions
- Medical expenses
- Rent/property tax (provincial credits)
- Charitable donations
- Childcare expenses (if applicable)
- Work-from-home expenses
- Self-employment income/expenses (if applicable)
- Rental income (if applicable)
- Foreign income/assets (if applicable)

### Step 8: Review & Submit
- Complete summary of all sections
- Edit buttons for each section
- Privacy consent checkboxes
- Digital signature field
- Terms and conditions acceptance
- Submit button with loading state

## Mobile-First Considerations
- Single-column layout on mobile
- Touch-friendly form controls
- Swipe navigation between steps (optional)
- Collapsible sections to save space
- Sticky progress indicator
- Easy-to-tap buttons and checkboxes

## Accessibility Features
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus indicators for all interactive elements
- Error messages clearly associated with form fields

## Error Handling & Validation
- Real-time field validation
- Clear error messages
- Prevent progression until required fields complete
- Graceful handling of network errors
- Clear indication of which fields need attention