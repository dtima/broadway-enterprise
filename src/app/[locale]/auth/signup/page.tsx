'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Building2,
  ArrowRight, 
  AlertCircle,
  CheckCircle,
  Loader2,
  Github,
  Chrome,
  Shield
} from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  organization: string;
  role: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const organizationRoles = [
  { value: 'educator', label: 'Educator/Teacher' },
  { value: 'researcher', label: 'Researcher' },
  { value: 'administrator', label: 'Administrator' },
  { value: 'student', label: 'Student' },
  { value: 'procurement', label: 'Procurement Officer' },
  { value: 'other', label: 'Other' }
];

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth();
  const [formData, setFormData] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    role: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization is required';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SignUpForm, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    // Clear submit status
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const displayName = `${formData.firstName} ${formData.lastName}`;
      await signUp(formData.email, formData.password, displayName);
      setSubmitStatus('success');
      // Redirect to email verification page or dashboard
      router.push('/auth/verify-email');
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
      setSubmitStatus('success');
      router.push('/dashboard');
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || `Failed to sign up with ${provider}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            Broadway Enterprise
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-muted-foreground">
            Join thousands of educators and researchers worldwide
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-green-800 font-medium">Account created successfully!</p>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Please check your email to verify your account.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <p className="text-red-800 font-medium">Sign up failed</p>
                </div>
                <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
              </div>
            )}

            {/* Social Sign Up */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialSignUp('google')}
                disabled={isLoading}
                className="w-full"
              >
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialSignUp('github')}
                disabled={isLoading}
                className="w-full"
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="First name"
                      className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Last Name
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Last name"
                    className={errors.lastName ? 'border-red-500' : ''}
                    disabled={isLoading}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Organization
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={formData.organization}
                    onChange={(e) => handleInputChange('organization', e.target.value)}
                    placeholder="Your school, university, or company"
                    className={`pl-10 ${errors.organization ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                </div>
                {errors.organization && (
                  <p className="text-red-500 text-sm mt-1">{errors.organization}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Role
                </label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => handleInputChange('role', value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationRoles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a strong password"
                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Must contain uppercase, lowercase, and number
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Confirm Password
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-0.5"
                  disabled={isLoading}
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary hover:text-primary/80 underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary hover:text-primary/80 underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/auth/signin"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            By creating an account, you agree to receive updates about new products and services.
          </p>
        </div>
      </div>
    </div>
  );
}
