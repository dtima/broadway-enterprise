import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validateBody } from '@/lib/api/validation';
import { handleApiError } from '@/lib/api/error-handler';
import { corsHeaders, securityHeaders } from '@/lib/api/cors';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const validateBodyData = validateBody(SignInSchema);
    const { email, password } = await validateBodyData(request);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get ID token with custom claims
    const idToken = await user.getIdToken();
    const tokenResult = await user.getIdTokenResult();
    
    return NextResponse.json({
      success: true,
      data: {
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: tokenResult.claims.role || 'viewer',
          permissions: tokenResult.claims.permissions || [],
        },
        idToken,
      },
      message: 'Sign in successful',
    }, {
      status: 200,
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
