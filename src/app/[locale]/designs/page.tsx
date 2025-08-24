'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/i18n/pure-static';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Eye, Download, Users, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/structured-data';
import type { LabDesign } from '@/types';

interface DesignFilters {
  search: string;
  category: string;
  sortBy: 'title' | 'createdAt' | 'featured';
  sortOrder: 'asc' | 'desc';
}

// Pre-conceived laboratory designs for schools to choose from
const mockDesigns: LabDesign[] = [
  {
    id: '1',
    title: 'Standard Chemistry Laboratory Design',
    description: 'Complete chemistry laboratory design with modern equipment layout, safety systems, and flexible workstations. Perfect for high schools and colleges.',
    category: 'chemistry',
    images: ['/images/designs/design1.jpeg'],
    specifications: {
      'Recommended Area': '400-600 sq ft',
      'Student Capacity': '24-30 students',
      'Safety Features': 'Fume hoods, emergency showers, fire suppression',
      'Equipment Included': 'Lab benches, storage, basic chemistry equipment',
      'Installation Time': '2-3 weeks'
    },
    featured: true,
    published: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Advanced Multi-Purpose Laboratory Design',
    description: 'Versatile laboratory design suitable for chemistry, biology, and physics. Modular setup allows for multiple teaching configurations.',
    category: 'biology',
    images: ['/images/designs/design2.jpeg'],
    specifications: {
      'Recommended Area': '600-800 sq ft',
      'Student Capacity': '20-32 students',
      'Safety Features': 'Advanced ventilation, emergency systems, chemical storage',
      'Equipment Included': 'Modular benches, microscopy station, digital displays',
      'Installation Time': '3-4 weeks'
    },
    featured: true,
    published: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  },
  {
    id: '3',
    title: 'Basic Science Laboratory Package',
    description: 'Entry-level laboratory design perfect for primary and secondary schools starting their science programs. Cost-effective and safe.',
    category: 'physics',
    images: ['/images/designs/design1.jpeg'],
    specifications: {
      'Recommended Area': '300-500 sq ft',
      'Student Capacity': '20-25 students',
      'Safety Features': 'Basic safety equipment, proper ventilation',
      'Equipment Included': 'Essential lab furniture, basic instruments',
      'Installation Time': '1-2 weeks'
    },
    featured: false,
    published: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '4',
    title: 'Premium Research Laboratory Design',
    description: 'High-end laboratory design for advanced research and university-level education. Includes cutting-edge equipment and technology.',
    category: 'engineering',
    images: ['/images/designs/design2.jpeg'],
    specifications: {
      'Recommended Area': '800-1200 sq ft',
      'Student Capacity': '15-20 researchers',
      'Safety Features': 'Advanced safety systems, clean room capabilities',
      'Equipment Included': 'Research-grade equipment, digital integration',
      'Installation Time': '4-6 weeks'
    },
    featured: false,
    published: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  },
  {
    id: '5',
    title: 'Computer Science & Engineering Lab',
    description: 'Modern computer laboratory with integrated hardware stations for programming, robotics, and engineering projects.',
    category: 'computer-science',
    images: ['/images/designs/design1.jpeg'],
    specifications: {
      'Recommended Area': '500-700 sq ft',
      'Student Capacity': '25-30 students',
      'Safety Features': 'Electrical safety, proper grounding, ventilation',
      'Equipment Included': 'Computer workstations, electronics benches, tools',
      'Installation Time': '2-3 weeks'
    },
    featured: false,
    published: true,
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '6',
    title: 'Biology & Life Sciences Laboratory',
    description: 'Specialized biology laboratory with microscopy stations, specimen storage, and life sciences equipment for comprehensive study.',
    category: 'biology',
    images: ['/images/designs/design2.jpeg'],
    specifications: {
      'Recommended Area': '500-750 sq ft',
      'Student Capacity': '20-28 students',
      'Safety Features': 'Biosafety cabinets, proper waste disposal, ventilation',
      'Equipment Included': 'Microscopes, incubators, specimen storage',
      'Installation Time': '3-4 weeks'
    },
    featured: false,
    published: true,
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-04-01')
  }
];

const categories = [
  { id: 'chemistry', name: 'Chemistry' },
  { id: 'biology', name: 'Biology' },
  { id: 'physics', name: 'Physics' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'computer-science', name: 'Computer Science' }
];

export default function DesignsPage() {
  const t = useTranslations('designs');
  const [designs, setDesigns] = useState<LabDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<DesignFilters>({
    search: '',
    category: '',
    sortBy: 'featured',
    sortOrder: 'desc'
  });

  useEffect(() => {
    loadDesigns();
  }, [filters]);

  const loadDesigns = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredDesigns = [...mockDesigns];
      
      // Apply search filter
      if (filters.search) {
        filteredDesigns = filteredDesigns.filter(design =>
          design.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          design.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      // Apply category filter
      if (filters.category) {
        filteredDesigns = filteredDesigns.filter(design =>
          design.category === filters.category
        );
      }
      
      // Apply sorting
      filteredDesigns.sort((a, b) => {
        let aValue, bValue;
        
        switch (filters.sortBy) {
          case 'title':
            aValue = a.title;
            bValue = b.title;
            break;
          case 'createdAt':
            aValue = a.createdAt.getTime();
            bValue = b.createdAt.getTime();
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
      
      setDesigns(filteredDesigns);
    } catch (error) {
      console.error('Error loading designs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof DesignFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      sortBy: 'featured',
      sortOrder: 'desc'
    });
  };

  const DesignCard = ({ design }: { design: LabDesign }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            src={design.images[0] || '/placeholder-lab.jpg'}
            alt={design.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
          {design.featured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500">
              Featured
            </Badge>
          )}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="secondary" asChild>
              <Link href={`/designs/${design.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {categories.find(cat => cat.id === design.category)?.name || design.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {design.createdAt.toLocaleDateString()}
          </span>
        </div>
        <CardTitle className="text-lg mb-2 line-clamp-2">{design.title}</CardTitle>
        <CardDescription className="line-clamp-3 mb-4">
          {design.description}
        </CardDescription>
        
        {/* Key specifications */}
        <div className="space-y-2 mb-4">
          {design.specifications.Area && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 mr-2" />
              {design.specifications.Area}
            </div>
          )}
          {design.specifications.Capacity && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-3 w-3 mr-2" />
              {design.specifications.Capacity}
            </div>
          )}
        </div>

        {design.caseStudy && (
          <div className="bg-muted/50 rounded-md p-3 mb-4">
            <h4 className="font-medium text-sm mb-1">Case Study Available</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {design.caseStudy.client} - {design.caseStudy.challenge}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button className="flex-1" asChild>
            <Link href="/en/contact">
              Choose This Design
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href={`/designs/${design.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Laboratory Designs', url: '/designs' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container py-8">
        <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Choose Your Laboratory Design</h1>
          <p className="text-lg text-muted-foreground">
            Select from our pre-conceived laboratory designs tailored for educational institutions. Each design includes complete specifications, equipment lists, and installation timelines.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search designs..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
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
                <SelectItem value="createdAt">Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {loading ? 'Loading...' : `${designs.length} designs found`}
          </p>
          {(filters.search || filters.category) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>

        {/* Designs Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="p-0">
                  <Skeleton className="aspect-[4/3] rounded-t-lg" />
                </CardHeader>
                <CardContent className="p-4">
                  <Skeleton className="h-4 mb-2" />
                  <Skeleton className="h-6 mb-2" />
                  <Skeleton className="h-4 mb-4" />
                  <Skeleton className="h-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : designs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {designs.map((design) => (
              <DesignCard key={design.id} design={design} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <Search className="h-12 w-12 text-muted-foreground mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No designs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your School's Laboratory?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Choose one of our proven laboratory designs and we'll handle everything from equipment procurement 
            to installation and staff training. Get your students engaged in hands-on science learning.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/en/contact">
                Request Quote
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/en/contact">
                Schedule Site Visit
              </Link>
            </Button>
          </div>
        </div>
        </div>
      </div>
    </main>
  );
}
