import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { EquipmentService } from '@/features/equipment/services/equipment-service';
import { validateBody } from '@/lib/api/validation';
import { handleApiError } from '@/lib/api/error-handler';
import { corsHeaders, securityHeaders } from '@/lib/api/cors';
import { verifyAdminAuth } from '@/lib/auth/admin-middleware';

const CreateProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200, 'Name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  shortDescription: z.string().max(300, 'Short description too long').optional(),
  price: z.number().positive('Price must be positive'),
  currency: z.string().default('CAD'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional(),
  specifications: z.record(z.string(), z.any()).optional(),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  stockStatus: z.enum(['in-stock', 'out-of-stock', 'pre-order']).default('in-stock'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

const UpdateProductSchema = CreateProductSchema.partial();

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAdminAuth(request);
    if (!authResult.success) {
      return NextResponse.json({
        success: false,
        error: authResult.error,
        code: 'UNAUTHORIZED',
      }, { status: 401 });
    }

    const validateBodyData = validateBody(CreateProductSchema);
    const productData = await validateBodyData(request);
    
    const product = await EquipmentService.createProduct({
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: authResult.user.uid,
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully',
    }, {
      status: 201,
      headers: { ...corsHeaders, ...securityHeaders },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
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
    const params = Object.fromEntries(searchParams.entries());
    
    // Admin can see unpublished products
    const result = await EquipmentService.getAllProducts(params);

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
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
