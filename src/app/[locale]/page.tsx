import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, seoConfigs, generateOrganizationSchema } from '@/lib/seo/metadata';
import { StructuredData } from '@/components/seo/structured-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { 
  ArrowRight, 
  Beaker, 
  Microscope, 
  GraduationCap, 
  Building2, 
  Users, 
  Star,
  CheckCircle,
  Award,
  Globe,
  Zap,
  Shield,
  TrendingUp,
  Play,
  Quote,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' }
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fr' ? 'Accueil - Broadway Enterprise' : 'Home - Broadway Enterprise',
    description: locale === 'fr' ? 'Solutions éducatives STEM innovantes' : 'Innovative STEM educational solutions'
  };
}

const stats = [
  { label: 'Active Institutions', value: '500+' },
  { label: 'Equipment Delivered', value: '10,000+' },
  { label: 'Students Impacted', value: '50,000+' },
  { label: 'Countries Served', value: '25+' }
];

const features = [
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'All equipment meets international safety and quality standards'
  },
  {
    icon: Globe,
    title: 'Global Shipping',
    description: 'Worldwide delivery with expert installation and support'
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Quick turnaround times for urgent educational needs'
  },
  {
    icon: Award,
    title: 'Expert Support',
    description: '24/7 technical support from our team of specialists'
  }
];

const testimonials = [
  {
    quote: "Broadway Enterprise upgraded our labs with quality equipment and custom designs, boosting student engagement in science.",
    author: "Principal",
    role: "Government Bilingual High School",
    institution: "Yaoundé"
  },
  {
    quote: "Broadway Enterprise delivered detailed setup, staff training, and support—our labs are now a major draw for parents.",
    author: "Founder",
    role: "Bright Future College",
    institution: "Yaoundé"
  },
  {
    quote: "Our labs went from basic to world-class thanks to Broadway Enterprise's cutting-edge equipment and reliable service.",
    author: "Proprietor",
    role: "Excellence Academy",
    institution: "Yaoundé"
  }
];

const projectImages = [
  { src: '/images/Projects/be1.jpeg', alt: 'Laboratory Setup Project 1' },
  { src: '/images/Projects/be2.jpeg', alt: 'Laboratory Setup Project 2' },
  { src: '/images/Projects/be3.jpeg', alt: 'Laboratory Setup Project 3' },
  { src: '/images/Projects/be4.jpeg', alt: 'Laboratory Setup Project 4' },
  { src: '/images/Projects/be5.jpeg', alt: 'Laboratory Setup Project 5' },
  { src: '/images/Projects/be6.jpg', alt: 'Laboratory Setup Project 6' },
  { src: '/images/Projects/be7.jpg', alt: 'Laboratory Setup Project 7' },
  { src: '/images/Projects/be8.jpg', alt: 'Laboratory Setup Project 8' },
  { src: '/images/Projects/be9.jpg', alt: 'Laboratory Setup Project 9' },
  { src: '/images/Projects/be10.jpg', alt: 'Laboratory Setup Project 10' },
  { src: '/images/Projects/be11.jpg', alt: 'Laboratory Setup Project 11' }
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container relative px-4 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Beaker className="mr-2 h-4 w-4" />
              Leading STEM Education Platform
            </Badge>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Empowering{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Scientific Discovery
              </span>{' '}
              Through Innovation
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Transform your educational institution with cutting-edge laboratory equipment, 
              custom designs, and comprehensive STEM programs that inspire the next generation of scientists.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="px-8 py-6 text-lg">
                <Link href="/catalog">
                  Explore Equipment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg" asChild>
                <Link href="/designs">
                  <Play className="mr-2 h-5 w-5" />
                  View Lab Designs
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Broadway Enterprise?
            </h2>
            <p className="text-lg text-muted-foreground">
              We're committed to providing exceptional quality and service to educational institutions worldwide.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-gradient-to-b from-muted/50 to-muted/20 text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Core Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive solutions for modern educational institutions
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Laboratory Design</CardTitle>
                <CardDescription className="text-base">
                  Custom laboratory designs tailored to your specific research and teaching requirements. 
                  From concept to completion, we create spaces that inspire innovation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    3D Visualization & Planning
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Safety Compliance
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Installation & Setup
                  </li>
                </ul>
                <Button asChild className="w-full group-hover:bg-primary/90">
                  <Link href="/designs">
                    View Portfolio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <Microscope className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl">Scientific Equipment</CardTitle>
                <CardDescription className="text-base">
                  Premium laboratory equipment from leading manufacturers worldwide. 
                  Everything you need for cutting-edge research and education.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Latest Technology
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Warranty & Support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Training Included
                  </li>
                </ul>
                <Button asChild className="w-full group-hover:bg-primary/90">
                  <Link href="/catalog">
                    Browse Catalog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <GraduationCap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">STEM Programs</CardTitle>
                <CardDescription className="text-base">
                  Engaging educational programs designed to inspire students and enhance 
                  learning outcomes across all STEM disciplines.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Age-Appropriate Curricula
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Hands-On Activities
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Expert Instructors
                  </li>
                </ul>
                <Button asChild className="w-full group-hover:bg-primary/90">
                  <Link href="/programs">
                    View Programs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Leading Institutions
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our clients say about working with Broadway Enterprise
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-gradient-to-b from-muted/50 to-background">
                <CardContent className="pt-6">
                  <Quote className="mb-4 h-8 w-8 text-primary/60" />
                  <blockquote className="mb-6 text-lg italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.institution}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Realizations */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Our Realizations
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover our completed laboratory projects and installations across educational institutions
            </p>
          </div>
          
          {/* Mobile-First Swippable Gallery */}
          <div className="relative">
            {/* Mobile: Horizontal scroll */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {projectImages.map((image, index) => (
                  <div key={index} className="flex-none w-80 snap-center">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projectImages.map((image, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* View More Button */}
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/designs">
                Choose a Design
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="bg-gradient-to-r from-primary/5 to-purple-500/5 py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Who We Serve
            </h2>
            <p className="text-lg text-muted-foreground">
              Supporting educational excellence across diverse institutions and programs
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20">
                <Building2 className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Universities & Colleges</h3>
              <p className="text-muted-foreground">
                Advanced research facilities and teaching laboratories for higher education institutions 
                pursuing cutting-edge scientific research and innovation.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20">
                <GraduationCap className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="mb-4 text-xl font-bold">K-12 Schools</h3>
              <p className="text-muted-foreground">
                Age-appropriate laboratory setups and STEM programs designed to inspire 
                young minds and build foundational scientific knowledge.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/20">
                <Beaker className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Research Institutes</h3>
              <p className="text-muted-foreground">
                Specialized equipment and custom solutions for independent research organizations 
                and government laboratories conducting advanced scientific studies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-16 md:py-24 text-white">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Transform Your Laboratory?
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
              Join thousands of institutions worldwide who trust Broadway Enterprise 
              for their scientific equipment and educational needs.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-lg">
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg border-white text-white hover:bg-white hover:text-primary">
                <Link href="/catalog">
                  Browse Equipment
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-primary-foreground/80">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                Free Consultation
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                Global Shipping
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                Expert Support
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
