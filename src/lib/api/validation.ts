import { z } from 'zod';
import { NextResponse } from 'next/server';

export class ValidationError extends Error {
  constructor(public errors: z.ZodError) {
    super('Validation failed');
    this.name = 'ValidationError';
  }
}

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError(error);
    }
    throw error;
  }
}

export function validateBody<T>(schema: z.ZodSchema<T>) {
  return async (request: Request): Promise<T> => {
    try {
      const body = await request.json();
      return schema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error);
      }
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON in request body');
      }
      throw error;
    }
  };
}

export function createValidationResponse(error: z.ZodError) {
  const formattedErrors = error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code,
  }));

  return NextResponse.json({
    success: false,
    error: 'Validation failed',
    details: formattedErrors,
  }, { status: 400 });
}
