import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { validateBody } from '@/lib/api/validation';
import { handleApiError } from '@/lib/api/error-handler';
import { corsHeaders, securityHeaders } from '@/lib/api/cors';
import { verifyAdminAuth } from '@/lib/auth/admin-middleware';
import { adminAuth } from '@/lib/firebase/admin';
import { ROLE_PERMISSIONS } from '@/lib/auth/rbac';

const UpdateUserRoleSchema = z.object({
  uid: z.string().min(1, 'User ID is required'),
  role: z.enum(['admin', 'editor', 'viewer']),
});

export async function GET(request: NextRequest) {
  try {
    // Check if Firebase Admin is available
    if (!adminAuth) {
      return NextResponse.json({
        success: false,
        error: 'Firebase Admin not configured',
        code: 'SERVICE_UNAVAILABLE',
      }, { status: 503 });
    }

    // Verify admin authentication
    const authResult = await verifyAdminAuth(request);
    if (!authResult.success) {
      return NextResponse.json({
        success: false,
        error: authResult.error,
        code: 'UNAUTHORIZED',
      }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const maxResults = parseInt(searchParams.get('limit') || '100', 10);
    const pageToken = searchParams.get('pageToken') || undefined;

    const listUsersResult = await adminAuth.listUsers(maxResults, pageToken);
    
    const users = listUsersResult.users.map((userRecord: any) => ({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      disabled: userRecord.disabled,
      emailVerified: userRecord.emailVerified,
      creationTime: userRecord.metadata.creationTime,
      lastSignInTime: userRecord.metadata.lastSignInTime,
      role: userRecord.customClaims?.role || 'viewer',
      permissions: userRecord.customClaims?.permissions || [],
    }));

    return NextResponse.json({
      success: true,
      data: {
        users,
        pageToken: listUsersResult.pageToken,
      },
    }, {
      status: 200,
      headers: { ...corsHeaders, ...securityHeaders },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check if Firebase Admin is available
    if (!adminAuth) {
      return NextResponse.json({
        success: false,
        error: 'Firebase Admin not configured',
        code: 'SERVICE_UNAVAILABLE',
      }, { status: 503 });
    }

    // Verify admin authentication
    const authResult = await verifyAdminAuth(request);
    if (!authResult.success) {
      return NextResponse.json({
        success: false,
        error: authResult.error,
        code: 'UNAUTHORIZED',
      }, { status: 401 });
    }

    const validateBodyData = validateBody(UpdateUserRoleSchema);
    const { uid, role } = await validateBodyData(request);
    
    // Set custom claims for the user
    await adminAuth.setCustomUserClaims(uid, {
      role,
      permissions: ROLE_PERMISSIONS[role],
    });

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role}`,
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
