import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { EquipmentService } from '@/features/equipment/services/equipment-service';
import { handleApiError } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

const GetProductByIdSchema = z.object({
  id: z.string().min(1, 'Product ID is required'),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const validatedParams = GetProductByIdSchema.parse({ id });
    const product = await EquipmentService.getProductById(validatedParams.id);

    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Product not found',
        code: 'NOT_FOUND',
      }, { 
        status: 404,
        headers: corsHeaders,
      });
    }

    return NextResponse.json({
      success: true,
      data: product,
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
