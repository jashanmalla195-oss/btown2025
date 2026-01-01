# Canadian Tax Intake - Content Structure

## Tax Slip Types (T-Slips)

### Employment & Income Slips
- **T4** - Statement of Remuneration Paid (employment income, deductions)
- **T4A** - Statement of Pension, Retirement, Annuity, and Other Income (self-employment, pensions, scholarships)
- **T4E** - Employment Insurance Benefits (EI benefits)
- **T4A(P)** - Canada Pension Plan Benefits (CPP benefits)
- **T4A(OAS)** - Old Age Security Benefits (OAS benefits)
- **T4RSP** - RRSP Withdrawals
- **T4RIF** - Registered Retirement Income Fund

### Investment Income Slips
- **T5** - Statement of Investment Income (interest, dividends)
- **T3** - Statement of Trust Income Allocations and Designations
- **T5008** - Securities Transactions
- **T5013** - Statement of Partnership Income

### Social Benefits & Other
- **T5007** - Social Assistance Payments (not taxable but must be reported)
- **T2202A** - Tuition and Education Amounts
- **T5018** - Statement of Contract Payments

## Deductions and Credits

### Federal Non-Refundable Tax Credits
- Basic Personal Amount
- Age Amount (65+)
- Spouse/Common-law Partner Amount
- Eligible Dependant Amount
- Canada Caregiver Amount
- Employment Insurance Premiums
- CPP Contributions
- Pension Income Amount
- Disability Amount
- Interest on Student Loans
- Tuition, Education, and Textbook Amounts
- Donations and Gifts
- Medical Expenses

### Common Deductions
- RRSP Contributions
- Child Care Expenses
- Employment Expenses (T2200 required)
- Moving Expenses
- Support Payments
- Union/Professional Fees
- Carrying Charges for Investments
- Home Office Expenses
- Tools Expenses (Tradesperson)

## Provincial Credits (Varies by Province)
- Rent/Property Tax Credits
- Low-income tax credits
- Senior's benefits
- Children's activity credits
- Climate action credits

## Residency Status Types

### Factual Resident
- Established significant residential ties to Canada
- Home, spouse, dependants in Canada
- Canadian bank accounts, driver's license
- Must report worldwide income

### Deemed Resident
- Stayed in Canada 183+ days in tax year
- May not have significant residential ties
- Subject to different tax rules

### Non-Resident
- No significant residential ties
- Stayed less than 183 days
- Only pay tax on Canadian-source income

### Newcomers to Canada
- Establish residency when significant ties created
- Usually day of arrival in Canada
- Must file tax return by April 30 following year
- 90% rule for full non-refundable credits
- Prorated credits if don't meet 90% rule

## Dependant Requirements

### Eligible Dependant
- Must live with taxpayer in home maintained by taxpayer
- Supported by taxpayer
- If no spouse/common-law partner, or not living with them
- Must be: parent/grandparent OR child/sibling under 18 or impaired

### Canada Child Benefit
- Children under 18
- Based on family net income
- Monthly payments
- Must file tax return to receive

### Child Care Expenses
- Children under 16 (or impaired)
- Allows taxpayer to work or attend school
- Lower-income spouse must claim (with exceptions)
- Basic limit: $8,000 (under 6), $5,000 (6-17)

## Conditional Logic Triggers

### Marital Status
- Married/Common-law → Spouse information required
- Single/Separated/Divorced/Widowed → Skip spouse section
- Spouse with no income → Spousal amount credit
- Separated → Date of separation required

### Dependants
- Has dependants → Dependant details section
- No dependants → Skip dependant section
- Child dependants → Child care expenses available
- Elderly parent dependants → Caregiver amount available

### Residency
- Moved to Canada → Arrival date, previous country, residency status
- Full-year resident → Skip newcomer questions
- Non-resident → Different filing requirements

### Income Types
- Self-employed → Business income/expenses section
- Rental income → Rental property details
- Investment income → T3, T5, T5008 required
- Employment income → T4, employment expenses
- Student → Tuition receipts (T2202A), student loan interest

### Special Situations
- First-time filer → Additional guidance needed
- Disability → Disability tax credit application
- Home sale → Principal residence exemption
- Foreign assets >$100,000 → T1135 form required
- Foreign income → Foreign tax credit considerations