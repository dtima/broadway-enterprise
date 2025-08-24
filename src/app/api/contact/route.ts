import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ContactService } from '@/features/contact/services/contact-service';
import { validateBody } from '@/lib/api/validation';
import { handleApiError } from '@/lib/api/error-handler';
import { corsHeaders, securityHeaders } from '@/lib/api/cors';

const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.enum(['general', 'equipment', 'laboratory-design', 'stem-programs', 'support']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message too long'),
  preferredContact: z.enum(['email', 'phone']).optional(),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
});

export async function POST(request: NextRequest) {
  try {
    const validateBodyData = validateBody(ContactFormSchema);
    const formData = await validateBodyData(request);
    
    const submission = await ContactService.submitContactForm(formData);

    return NextResponse.json({
      success: true,
      data: {
        id: submission,
        message: 'Contact form submitted successfully',
      },
    }, {
      status: 201,
      headers: { ...corsHeaders, ...securityHeaders },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: { ...corsHeaders, ...securityHeaders },
  });
}
