import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { EquipmentService } from '@/features/equipment/services/equipment-service';
import { validateRequest } from '@/lib/api/validation';
import { handleApiError } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

const GetEquipmentSchema = z.object({
  page: z.string().optional().transform(val => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform(val => val ? parseInt(val, 10) : 10),
  category: z.string().optional(),
  sortBy: z.enum(['name', 'price', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    
    const validatedParams = validateRequest(GetEquipmentSchema, params);
    const result = await EquipmentService.getProducts(validatedParams);

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    }, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}
