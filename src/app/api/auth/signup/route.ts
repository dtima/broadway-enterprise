import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validateBody } from '@/lib/api/validation';
import { handleApiError } from '@/lib/api/error-handler';
import { corsHeaders, securityHeaders } from '@/lib/api/cors';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { adminAuth } from '@/lib/firebase/admin';
import { auth } from '@/lib/firebase/config';

const SignUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  role: z.enum(['viewer', 'editor']).default('viewer'),
});

export async function POST(request: NextRequest) {
  try {
    const validateBodyData = validateBody(SignUpSchema);
    const { email, password, displayName, role } = await validateBodyData(request);
    
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile
    await updateProfile(user, { displayName });
    
    // Set custom claims for RBAC using Admin SDK
    await adminAuth.setCustomUserClaims(user.uid, {
      role,
      permissions: role === 'editor' ? [
        'create:product', 'update:product', 'publish:product',
        'create:design', 'update:design', 'publish:design',
        'create:program', 'update:program', 'publish:program',
        'view:analytics'
      ] : ['view:analytics'],
    });
    
    // Get fresh token with custom claims
    const idToken = await user.getIdToken(true);
    
    return NextResponse.json({
      success: true,
      data: {
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role,
        },
        idToken,
      },
      message: 'Account created successfully',
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
