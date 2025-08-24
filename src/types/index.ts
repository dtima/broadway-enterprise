// User and Authentication Types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: UserRole;
}

export type UserRole = 'admin' | 'editor' | 'viewer';

// Product and Equipment Types
export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: string;
  specifications: Record<string, string>;
  price: number;
  currency: string;
  images: string[];
  availability: 'in-stock' | 'out-of-stock' | 'pre-order';
  stockStatus: 'in-stock' | 'out-of-stock' | 'pre-order' | 'low-stock';
  tags?: string[];
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image?: string;
  productCount: number;
}

// Laboratory Design Types
export interface LabDesign {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  specifications: Record<string, string>;
  caseStudy?: CaseStudy;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  testimonial?: string;
  images: string[];
}

// STEM Program Types
export interface StemProgram {
  id: string;
  title: string;
  description: string;
  ageGroup: string;
  duration: string;
  schedule: ProgramSchedule[];
  capacity: number;
  enrolled: number;
  price: number;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProgramSchedule {
  day: string;
  startTime: string;
  endTime: string;
}

// Content Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  category: string;
  image?: string;
  registrationRequired: boolean;
  capacity?: number;
  registered?: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Form Types
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: Date;
}

export interface EquipmentInquiry {
  id: string;
  name: string;
  email: string;
  organization?: string;
  phone?: string;
  productId: string;
  quantity: number;
  message: string;
  status: 'new' | 'quoted' | 'converted' | 'closed';
  createdAt: Date;
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
