'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { LabDesign } from '@/types';

interface DesignCardProps {
  design: LabDesign;
}

export function DesignCard({ design }: DesignCardProps) {
  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={design.images[0] || '/placeholder-lab.jpg'}
          alt={design.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {design.featured && (
          <Badge className="absolute left-2 top-2" variant="secondary">
            Featured
          </Badge>
        )}
        <Badge className="absolute right-2 top-2" variant="outline">
          {design.category}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="line-clamp-2">{design.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {design.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {design.specifications && Object.keys(design.specifications).length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-medium">Key Specifications:</span>
            <div className="flex flex-wrap gap-1">
              {Object.entries(design.specifications).slice(0, 3).map(([key, value]) => (
                <Badge key={key} variant="outline" className="text-xs">
                  {key}: {value}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/designs/${design.id}`}>View Details</Link>
          </Button>
          <Button variant="outline" className="flex-1">
            Request Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
