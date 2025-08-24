'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  CheckCircle,
  Loader2,
  Github,
  Chrome
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

interface SignInForm {
  email: string;
  password: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function SignInPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>
      <p className="text-gray-600">Sign in page coming soon...</p>
    </div>
  );
}
