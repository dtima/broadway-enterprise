import { NextResponse } from 'next/server';
import { ValidationError } from './validation';
import { createValidationResponse } from './validation';

export interface ApiError {
  message: string;
  code?: string;
  statusCode: number;
  details?: unknown;
}

export class ApiException extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error);

  // Validation errors
  if (error instanceof ValidationError) {
    return createValidationResponse(error.errors);
  }

  // Custom API exceptions
  if (error instanceof ApiException) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      details: error.details,
    }, { status: error.statusCode });
  }

  // Firebase errors
  if (error && typeof error === 'object' && 'code' in error) {
    const firebaseError = error as { code: string; message: string };
    
    switch (firebaseError.code) {
      case 'permission-denied':
        return NextResponse.json({
          success: false,
          error: 'Access denied',
          code: 'PERMISSION_DENIED',
        }, { status: 403 });
      
      case 'not-found':
        return NextResponse.json({
          success: false,
          error: 'Resource not found',
          code: 'NOT_FOUND',
        }, { status: 404 });
      
      case 'unauthenticated':
        return NextResponse.json({
          success: false,
          error: 'Authentication required',
          code: 'UNAUTHENTICATED',
        }, { status: 401 });
      
      default:
        return NextResponse.json({
          success: false,
          error: 'Database operation failed',
          code: 'DATABASE_ERROR',
        }, { status: 500 });
    }
  }

  // Generic errors
  if (error instanceof Error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: 'INTERNAL_ERROR',
    }, { status: 500 });
  }

  // Unknown errors
  return NextResponse.json({
    success: false,
    error: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  }, { status: 500 });
}
