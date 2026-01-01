import jsPDF from 'jspdf';
import { FormData } from '@/types';

export async function generateTaxIntakePDF(formData: FormData, intakeId: string): Promise<Buffer> {
  const doc = new jsPDF();
  
  // Set up document
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Colors
  const primaryColor = [66, 153, 225]; // #4299e1
  const textColor = [45, 55, 72]; // #2d3748
  const lightGray = [237, 242, 247]; // #edf2f7
  
  // Helper functions
  const addHeader = () => {
    // Header background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 60, 'F');
    
    // Company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('BTown Accounting', 20, 25);
    
    // Document title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Tax Intake Summary', 20, 40);
    
    // Intake ID and date
    doc.setFontSize(10);
    doc.text(`Intake ID: ${intakeId}`, 20, 50);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 100, 50);
    
    // Reset text color
    doc.setTextColor(...textColor);
  };
  
  const addSection = (title: string, y: number, content: Array<{label: string, value: string}>) => {
    let currentY = y;
    
    // Section header
    doc.setFillColor(...lightGray);
    doc.rect(0, currentY - 10, pageWidth, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(title, 20, currentY - 5);
    
    currentY += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    // Content rows
    content.forEach(({ label, value }) => {
      if (currentY > pageHeight - 30) {
        doc.addPage();
        addHeader();
        currentY = 80;
      }
      
      doc.text(label, 20, currentY);
      doc.text(value || 'Not provided', pageWidth - 120, currentY);
      currentY += 8;
    });
    
    return currentY + 10;
  };
  
  // Generate PDF content
  addHeader();
  
  let y = 80;
  
  // Personal Information
  y = addSection('Personal Information', y, [
    { label: 'First Name', value: formData.firstName || '' },
    { label: 'Last Name', value: formData.lastName || '' },
    { label: 'Date of Birth', value: formData.dateOfBirth || '' },
    { label: 'Email', value: formData.email || '' },
    { label: 'Phone', value: formData.phone || '' },
    { label: 'Address', value: formData.address || '' },
    { label: 'City', value: formData.city || '' },
    { label: 'Postal Code', value: formData.postalCode || '' },
  ]);
  
  // Tax Information
  y = addSection('Tax Information', y, [
    { label: 'Tax Year', value: formData.taxYear || '' },
    { label: 'Province', value: formData.province || '' },
    { label: 'Filing Type', value: formData.filingType || '' },
  ]);
  
  // Residency Status
  y = addSection('Residency Status', y, [
    { label: 'Canadian Citizen', value: formData.isCanadianCitizen ? 'Yes' : 'No' },
    { label: 'Full Year Resident', value: formData.isFullYearResident ? 'Yes' : 'No' },
    { label: 'Date of Entry', value: formData.dateOfEntry || 'N/A' },
    { label: 'Previous Country', value: formData.previousCountry || 'N/A' },
  ]);
  
  // Marital Status
  y = addSection('Marital Status', y, [
    { label: 'Status', value: formData.maritalStatus || '' },
    { label: 'Spouse Name', value: `${formData.spouseFirstName || ''} ${formData.spouseLastName || ''}`.trim() || 'N/A' },
    { label: 'Date of Marriage', value: formData.dateOfMarriage || 'N/A' },
  ]);
  
  // Dependants
  if (formData.hasDependants && formData.dependants && formData.dependants.length > 0) {
    const dependantContent = formData.dependants.map((dep, index) => ({
      label: `Dependant ${index + 1}`,
      value: `${dep.firstName} ${dep.lastName} (${dep.relationship})`
    }));
    y = addSection('Dependants', y, dependantContent);
  }
  
  // Income Summary
  const incomeContent: Array<{label: string, value: string}> = [];
  if (formData.incomeSlips) {
    if (formData.incomeSlips.t4 && formData.incomeSlips.t4.length > 0) {
      incomeContent.push({ 
        label: 'T4 Slips', 
        value: `${formData.incomeSlips.t4.length} slip(s)` 
      });
    }
    if (formData.incomeSlips.t4a && formData.incomeSlips.t4a.length > 0) {
      incomeContent.push({ 
        label: 'T4A Slips', 
        value: `${formData.incomeSlips.t4a.length} slip(s)` 
      });
    }
    if (formData.incomeSlips.t5 && formData.incomeSlips.t5.length > 0) {
      incomeContent.push({ 
        label: 'T5 Slips', 
        value: `${formData.incomeSlips.t5.length} slip(s)` 
      });
    }
    if (formData.incomeSlips.t3 && formData.incomeSlips.t3.length > 0) {
      incomeContent.push({ 
        label: 'T3 Slips', 
        value: `${formData.incomeSlips.t3.length} slip(s)` 
      });
    }
    if (formData.incomeSlips.t2202a && formData.incomeSlips.t2202a.length > 0) {
      incomeContent.push({ 
        label: 'T2202A Slips', 
        value: `${formData.incomeSlips.t2202a.length} slip(s)` 
      });
    }
  }
  
  if (formData.otherIncomeSources) {
    incomeContent.push({ 
      label: 'Other Income', 
      value: 'Yes' 
    });
  }
  
  if (incomeContent.length > 0) {
    y = addSection('Income Sources', y, incomeContent);
  }
  
  // Deductions Summary
  const deductionContent: Array<{label: string, value: string}> = [];
  if (formData.deductions) {
    if (formData.deductions.rrspContributions && formData.deductions.rrspContributions > 0) {
      deductionContent.push({ 
        label: 'RRSP Contributions', 
        value: `$${formData.deductions.rrspContributions.toLocaleString()}` 
      });
    }
    if (formData.deductions.tuitionAmounts && formData.deductions.tuitionAmounts > 0) {
      deductionContent.push({ 
        label: 'Tuition Amounts', 
        value: `$${formData.deductions.tuitionAmounts.toLocaleString()}` 
      });
    }
    if (formData.deductions.medicalExpenses && formData.deductions.medicalExpenses > 0) {
      deductionContent.push({ 
        label: 'Medical Expenses', 
        value: `$${formData.deductions.medicalExpenses.toLocaleString()}` 
      });
    }
    if (formData.deductions.charitableDonations && formData.deductions.charitableDonations > 0) {
      deductionContent.push({ 
        label: 'Charitable Donations', 
        value: `$${formData.deductions.charitableDonations.toLocaleString()}` 
      });
    }
    if (formData.deductions.childcareExpenses && formData.deductions.childcareExpenses > 0) {
      deductionContent.push({ 
        label: 'Childcare Expenses', 
        value: `$${formData.deductions.childcareExpenses.toLocaleString()}` 
      });
    }
  }
  
  if (deductionContent.length > 0) {
    y = addSection('Deductions & Credits', y, deductionContent);
  }
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    'This intake is for tax preparation only. Do not email extra sensitive info unless requested.',
    pageWidth / 2,
    pageHeight - 20,
    { align: 'center' }
  );
  
  doc.text(
    `Generated by BTown Accounting on ${new Date().toLocaleDateString()}`,
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  );
  
  // Return PDF as buffer
  return Buffer.from(doc.output('arraybuffer'));
}