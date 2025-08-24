'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Users, Clock, Calendar, Star, BookOpen, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import type { StemProgram } from '@/types';

interface ProgramFilters {
  search: string;
  ageGroup: string;
  sortBy: 'title' | 'price' | 'duration' | 'featured';
  sortOrder: 'asc' | 'desc';
}

// Mock data for demonstration
const mockPrograms: StemProgram[] = [
  {
    id: '1',
    title: 'Robotics Engineering Camp',
    description: 'Hands-on robotics program where students build and program autonomous robots using Arduino and sensors. Learn mechanical design, electronics, and programming.',
    ageGroup: '12-16',
    duration: '2 weeks',
    schedule: [
      { day: 'Monday-Friday', startTime: '9:00 AM', endTime: '3:00 PM' }
    ],
    capacity: 20,
    enrolled: 15,
    price: 899,
    featured: true,
    published: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Chemistry Lab Adventures',
    description: 'Explore the fascinating world of chemistry through safe, supervised experiments. Students learn about chemical reactions, molecular structures, and laboratory techniques.',
    ageGroup: '10-14',
    duration: '1 week',
    schedule: [
      { day: 'Monday-Friday', startTime: '10:00 AM', endTime: '2:00 PM' }
    ],
    capacity: 16,
    enrolled: 12,
    price: 549,
    featured: false,
    published: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '3',
    title: 'AI & Machine Learning Workshop',
    description: 'Introduction to artificial intelligence and machine learning concepts. Students create their own AI models and explore real-world applications.',
    ageGroup: '14-18',
    duration: '3 weeks',
    schedule: [
      { day: 'Monday-Wednesday', startTime: '1:00 PM', endTime: '4:00 PM' }
    ],
    capacity: 12,
    enrolled: 8,
    price: 1299,
    featured: true,
    published: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '4',
    title: 'Environmental Science Field Study',
    description: 'Outdoor learning experience combining ecology, environmental monitoring, and sustainability practices. Includes field trips and data collection.',
    ageGroup: '8-12',
    duration: '10 days',
    schedule: [
      { day: 'Tuesday-Thursday', startTime: '9:30 AM', endTime: '2:30 PM' }
    ],
    capacity: 18,
    enrolled: 14,
    price: 699,
    featured: false,
    published: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  }
];

const ageGroups = [
  { id: '6-10', name: '6-10 years' },
  { id: '8-12', name: '8-12 years' },
  { id: '10-14', name: '10-14 years' },
  { id: '12-16', name: '12-16 years' },
  { id: '14-18', name: '14-18 years' }
];

export default function ProgramsPage() {
  const t = useTranslations('programs');
  const [programs, setPrograms] = useState<StemProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ProgramFilters>({
    search: '',
    ageGroup: 'all',
    sortBy: 'featured',
    sortOrder: 'desc'
  });

  useEffect(() => {
    loadPrograms();
  }, [filters]);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let filteredPrograms = [...mockPrograms];
      
      // Apply search filter
      if (filters.search) {
        filteredPrograms = filteredPrograms.filter(program =>
          program.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          program.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      // Apply age group filter
      if (filters.ageGroup && filters.ageGroup !== 'all') {
        filteredPrograms = filteredPrograms.filter(program =>
          program.ageGroup === filters.ageGroup
        );
      }
      
      // Apply sorting
      filteredPrograms.sort((a, b) => {
        let aValue, bValue;
        
        switch (filters.sortBy) {
          case 'title':
            aValue = a.title;
            bValue = b.title;
            break;
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'duration':
            aValue = a.duration;
            bValue = b.duration;
            break;
          case 'featured':
            aValue = a.featured ? 1 : 0;
            bValue = b.featured ? 1 : 0;
            break;
          default:
            return 0;
        }
        
        if (filters.sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      
      setPrograms(filteredPrograms);
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof ProgramFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      ageGroup: 'all',
      sortBy: 'featured',
      sortOrder: 'desc'
    });
  };

  const getAvailabilityStatus = (program: StemProgram) => {
    const spotsLeft = program.capacity - program.enrolled;
    if (spotsLeft === 0) return { status: 'full', text: 'Full', variant: 'destructive' as const };
    if (spotsLeft <= 3) return { status: 'limited', text: `${spotsLeft} spots left`, variant: 'secondary' as const };
    return { status: 'available', text: 'Available', variant: 'default' as const };
  };

  const ProgramCard = ({ program }: { program: StemProgram }) => {
    const availability = getAvailabilityStatus(program);
    
    return (
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="p-0">
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-80" />
                <p className="text-sm font-medium opacity-90">{program.ageGroup} years</p>
              </div>
            </div>
            {program.featured && (
              <Badge className="absolute top-3 left-3 bg-yellow-500">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            <Badge 
              variant={availability.variant}
              className="absolute top-3 right-3"
            >
              {availability.text}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg mb-2 line-clamp-2">{program.title}</CardTitle>
          <CardDescription className="line-clamp-3 mb-4">
            {program.description}
          </CardDescription>
          
          {/* Program details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-3 w-3 mr-2" />
              {program.enrolled}/{program.capacity} enrolled
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-2" />
              {program.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3 w-3 mr-2" />
              {program.schedule[0].day} • {program.schedule[0].startTime}-{program.schedule[0].endTime}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              ${program.price}
            </div>
            <Badge variant="outline">
              Ages {program.ageGroup}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex gap-2 w-full">
            <Button className="flex-1" asChild>
              <Link href={`/programs/${program.id}`}>
                View Details
              </Link>
            </Button>
            <Button 
              variant="outline" 
              disabled={availability.status === 'full'}
            >
              {availability.status === 'full' ? 'Full' : 'Enroll'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'STEM Programs', url: '/programs' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <BreadcrumbStructuredData items={breadcrumbs} />
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "STEM Programs",
          "description": "Discover engaging STEM programs designed to inspire young minds and build essential skills for the future.",
          "url": "https://broadway-enterprise.com/programs",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": programs.length,
            "itemListElement": programs.slice(0, 10).map((program, index) => ({
              "@type": "Course",
              "position": index + 1,
              "name": program.title,
              "description": program.description,
              "provider": {
                "@type": "Organization",
                "name": "Broadway Enterprise"
              },
              "offers": {
                "@type": "Offer",
                "price": program.price,
                "priceCurrency": "USD"
              }
            }))
          }
        }}
      />
      <div className="container py-8">
        <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">STEM Programs</h1>
          <p className="text-lg text-muted-foreground">
            Discover engaging STEM programs designed to inspire young minds and build essential skills for the future.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={filters.ageGroup} onValueChange={(value) => handleFilterChange('ageGroup', value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Age Group" />
              </SelectTrigger>
              <SelectContent>
                                  <SelectItem value="all">All Ages</SelectItem>
                {ageGroups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.sortBy} onValueChange={(value: any) => handleFilterChange('sortBy', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="title">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="duration">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {loading ? 'Loading...' : `${programs.length} programs found`}
          </p>
          {(filters.search || filters.ageGroup) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>

        {/* Programs Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="p-0">
                  <Skeleton className="aspect-[16/9] rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-4">
                  <Skeleton className="h-6 mb-2" />
                  <Skeleton className="h-4 mb-4" />
                  <Skeleton className="h-16 mb-4" />
                  <Skeleton className="h-8" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : programs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <Search className="h-12 w-12 text-muted-foreground mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No programs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="grid gap-6 md:grid-cols-3 mt-16">
          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Expert Instructors</h3>
              <p className="text-muted-foreground">
                Learn from industry professionals and experienced educators
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Small Class Sizes</h3>
              <p className="text-muted-foreground">
                Personalized attention with low student-to-instructor ratios
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Hands-on Learning</h3>
              <p className="text-muted-foreground">
                Project-based curriculum with real-world applications
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of students who have discovered their passion for STEM through our programs. 
            Early bird discounts available for upcoming sessions.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
