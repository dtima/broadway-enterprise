'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

interface EquipmentCardProps {
  product: Product;
}

export function EquipmentCard({ product }: EquipmentCardProps) {
  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0] || '/placeholder-equipment.jpg'}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {product.featured && (
          <Badge className="absolute left-2 top-2" variant="secondary">
            Featured
          </Badge>
        )}
        <Badge 
          className="absolute right-2 top-2" 
          variant={product.availability === 'in-stock' ? 'default' : 'destructive'}
        >
          {product.availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-2">{product.name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Category</span>
          <Badge variant="outline">{product.category}</Badge>
        </div>
        
        {product.price && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="font-semibold">${product.price}</span>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/catalog/${product.id}`}>View Details</Link>
          </Button>
          <Button variant="outline" className="flex-1">
            Request Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
