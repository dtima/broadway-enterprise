'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: boolean;
}

const sizeClasses = {
  sm: 'h-8 w-auto',
  md: 'h-12 w-auto', 
  lg: 'h-16 w-auto',
  xl: 'h-20 w-auto'
};

export function Logo({ className, size = 'md', priority = false }: LogoProps) {
  return (
    <div className={cn('flex items-center', className)}>
      <Image
        src="/images/logo/BE.jpeg"
        alt="Broadway Enterprise"
        width={80}
        height={80}
        priority={priority}
        className={cn(
          'object-contain transition-all duration-200 hover:scale-105',
          sizeClasses[size]
        )}
      />
    </div>
  );
}
