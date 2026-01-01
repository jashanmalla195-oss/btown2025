import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';
import { generateTaxIntakePDF } from '@/lib/utils/pdfGenerator';
import { validateFormData } from '@/lib/utils/validation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData, timestamp } = body;

    // Validate form data
    const validationResult = validateFormData(formData);
    if (!validationResult.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed',
          errors: validationResult.errors 
        },
        { status: 400 }
      );
    }

    // Generate unique intake ID
    const intakeId = `BTOWN-${new Date().getFullYear()}-${uuidv4().slice(0, 8).toUpperCase()}`;

    // Generate PDF
    const pdfBuffer = await generateTaxIntakePDF(formData, intakeId);

    // Save to database (in production, this would be a proper database)
    const submission = {
      intakeId,
      formData,
      timestamp: timestamp || new Date().toISOString(),
      status: 'submitted',
      createdAt: new Date().toISOString(),
    };

    // In a real app, save to database here
    // await db.submissions.create({ data: submission });

    // Send emails
    try {
      // Send admin notification
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@btownaccounting.ca',
        to: process.env.ADMIN_EMAIL || 'contact@btownaccounting.ca',
        subject: `New BTown Tax Intake - ${formData.firstName} ${formData.lastName} - ${intakeId}`,
        html: `
          <h2>New Tax Intake Submitted</h2>
          <p><strong>Intake ID:</strong> ${intakeId}</p>
          <p><strong>Client:</strong> ${formData.firstName} ${formData.lastName}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Tax Year:</strong> ${formData.taxYear}</p>
          <p><strong>Province:</strong> ${formData.province}</p>
          <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
          <p>Please review the attached PDF and begin tax preparation.</p>
        `,
        attachments: [
          {
            filename: `TaxIntake_${formData.lastName}_${intakeId}.pdf`,
            content: pdfBuffer.toString('base64'),
          },
        ],
      });

      // Send client confirmation
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'noreply@btownaccounting.ca',
        to: formData.email,
        subject: `Your BTown Tax Intake Confirmation - ${intakeId}`,
        html: `
          <h2>Thank you for your tax intake submission!</h2>
          <p>Dear ${formData.firstName},</p>
          <p>We've successfully received your tax intake information. Our team will review everything and begin preparing your tax return.</p>
          
          <h3>Your Intake Details:</h3>
          <ul>
            <li><strong>Intake ID:</strong> ${intakeId}</li>
            <li><strong>Tax Year:</strong> ${formData.taxYear}</li>
            <li><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</li>
          </ul>
          
          <h3>What happens next?</h3>
          <ol>
            <li>Our tax professionals will review your information</li>
            <li>We'll contact you if we need any additional details</li>
            <li>Your completed tax return will be sent to you for review</li>
          </ol>
          
          <p>Please keep your Intake ID for reference. If you have any questions, contact us at contact@btownaccounting.ca with your Intake ID.</p>
          
          <p>Thank you for choosing BTown Accounting!</p>
        `,
        attachments: [
          {
            filename: `TaxIntake_${formData.lastName}_${intakeId}.pdf`,
            content: pdfBuffer.toString('base64'),
          },
        ],
      });

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the entire submission if email fails
      // In production, you might want to retry or queue for later
    }

    return NextResponse.json({
      success: true,
      intakeId,
      message: 'Tax intake submitted successfully',
    });

  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}