import { NextRequest, NextResponse } from 'next/server';
import { EquipmentService } from '@/features/equipment/services/equipment-service';
import { handleApiError } from '@/lib/api/error-handler';
import { corsHeaders } from '@/lib/api/cors';

export async function GET(request: NextRequest) {
  try {
    const categories = await EquipmentService.getCategories();

    return NextResponse.json({
      success: true,
      data: categories,
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
