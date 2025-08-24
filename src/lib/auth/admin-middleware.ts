import { NextRequest } from 'next/server';
import { adminAuth as auth } from '@/lib/firebase/admin';
import { DecodedIdToken } from 'firebase-admin/auth';

export interface AuthResult {
  success: boolean;
  user?: DecodedIdToken;
  error?: string;
}

export async function verifyAdminAuth(request: NextRequest): Promise<AuthResult> {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        error: 'Missing or invalid authorization header',
      };
    }

    const token = authHeader.substring(7);
    
    if (!token) {
      return {
        success: false,
        error: 'Missing authentication token',
      };
    }

    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(token);
    
    // Check if user has admin role
    const isAdmin = decodedToken.role === 'admin' || decodedToken.admin === true;
    
    if (!isAdmin) {
      return {
        success: false,
        error: 'Insufficient permissions - admin access required',
      };
    }

    return {
      success: true,
      user: decodedToken,
    };
  } catch (error) {
    console.error('Admin auth verification failed:', error);
    
    if (error && typeof error === 'object' && 'code' in error) {
      const firebaseError = error as { code: string; message: string };
      
      switch (firebaseError.code) {
        case 'auth/id-token-expired':
          return {
            success: false,
            error: 'Authentication token has expired',
          };
        case 'auth/id-token-revoked':
          return {
            success: false,
            error: 'Authentication token has been revoked',
          };
        case 'auth/invalid-id-token':
          return {
            success: false,
            error: 'Invalid authentication token',
          };
        default:
          return {
            success: false,
            error: 'Authentication verification failed',
          };
      }
    }

    return {
      success: false,
      error: 'Authentication verification failed',
    };
  }
}

export async function verifyUserAuth(request: NextRequest): Promise<AuthResult> {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        error: 'Missing or invalid authorization header',
      };
    }

    const token = authHeader.substring(7);
    
    if (!token) {
      return {
        success: false,
        error: 'Missing authentication token',
      };
    }

    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(token);
    
    return {
      success: true,
      user: decodedToken,
    };
  } catch (error) {
    console.error('User auth verification failed:', error);
    
    return {
      success: false,
      error: 'Authentication verification failed',
    };
  }
}
