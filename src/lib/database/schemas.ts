import { z } from 'zod';

// Base schema for all documents
export const BaseDocumentSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
});

// Product schema
export const ProductSchema = BaseDocumentSchema.extend({
  name: z.string().min(1).max(200),
  description: z.string().min(10),
  shortDescription: z.string().max(300).optional(),
  price: z.number().positive(),
  currency: z.string().default('CAD'),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  specifications: z.record(z.string(), z.any()).optional(),
  images: z.array(z.string().url()).min(1),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  stockStatus: z.enum(['in-stock', 'out-of-stock', 'pre-order']).default('in-stock'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

// Product category schema
export const ProductCategorySchema = BaseDocumentSchema.extend({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  slug: z.string().min(1),
  parentCategory: z.string().optional(),
  image: z.string().url().optional(),
  sortOrder: z.number().default(0),
  published: z.boolean().default(true),
});

// Laboratory design schema
export const LabDesignSchema = BaseDocumentSchema.extend({
  title: z.string().min(1).max(200),
  description: z.string().min(10),
  shortDescription: z.string().max(300).optional(),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  images: z.array(z.string().url()).min(1),
  specifications: z.record(z.string(), z.any()).optional(),
  features: z.array(z.string()).optional(),
  targetAudience: z.array(z.string()).optional(),
  estimatedCost: z.object({
    min: z.number().positive(),
    max: z.number().positive(),
    currency: z.string().default('CAD'),
  }).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

// STEM program schema
export const StemProgramSchema = BaseDocumentSchema.extend({
  title: z.string().min(1).max(200),
  description: z.string().min(10),
  shortDescription: z.string().max(300).optional(),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  ageGroup: z.object({
    min: z.number().min(3).max(18),
    max: z.number().min(3).max(18),
  }),
  duration: z.object({
    value: z.number().positive(),
    unit: z.enum(['hours', 'days', 'weeks', 'months']),
  }),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  prerequisites: z.array(z.string()).optional(),
  learningObjectives: z.array(z.string()).min(1),
  materials: z.array(z.string()).optional(),
  images: z.array(z.string().url()).optional(),
  curriculum: z.array(z.object({
    module: z.string(),
    topics: z.array(z.string()),
    duration: z.string(),
  })).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

// Contact submission schema
export const ContactSubmissionSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.enum(['general', 'equipment', 'laboratory-design', 'stem-programs', 'support']),
  message: z.string().min(10).max(2000),
  preferredContact: z.enum(['email', 'phone']).optional(),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
  status: z.enum(['new', 'in-progress', 'resolved', 'closed']).default('new'),
  submittedAt: z.date(),
  respondedAt: z.date().optional(),
  assignedTo: z.string().optional(),
  notes: z.string().optional(),
});

// User profile schema
export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  displayName: z.string().min(2).max(100),
  role: z.enum(['admin', 'editor', 'viewer']).default('viewer'),
  permissions: z.array(z.string()).default([]),
  avatar: z.string().url().optional(),
  bio: z.string().max(500).optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  phone: z.string().optional(),
  preferences: z.object({
    language: z.enum(['en', 'fr']).default('en'),
    notifications: z.object({
      email: z.boolean().default(true),
      push: z.boolean().default(false),
    }).default({}),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
  }).default({}),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().optional(),
});

// Analytics event schema
export const AnalyticsEventSchema = z.object({
  id: z.string(),
  eventType: z.string(),
  eventName: z.string(),
  userId: z.string().optional(),
  sessionId: z.string(),
  properties: z.record(z.string(), z.any()).default({}),
  timestamp: z.date(),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  referrer: z.string().optional(),
  page: z.string().optional(),
});

// System log schema
export const SystemLogSchema = z.object({
  id: z.string(),
  level: z.enum(['debug', 'info', 'warn', 'error', 'fatal']),
  message: z.string(),
  service: z.string(),
  userId: z.string().optional(),
  requestId: z.string().optional(),
  metadata: z.record(z.string(), z.any()).default({}),
  timestamp: z.date(),
  stack: z.string().optional(),
});

// Collection names
export const COLLECTIONS = {
  PRODUCTS: 'products',
  PRODUCT_CATEGORIES: 'productCategories',
  LAB_DESIGNS: 'laboratoryDesigns',
  STEM_PROGRAMS: 'stemPrograms',
  CONTACT_SUBMISSIONS: 'contactSubmissions',
  USER_PROFILES: 'userProfiles',
  ANALYTICS_EVENTS: 'analyticsEvents',
  SYSTEM_LOGS: 'systemLogs',
} as const;

// Type exports
export type Product = z.infer<typeof ProductSchema>;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type LabDesign = z.infer<typeof LabDesignSchema>;
export type StemProgram = z.infer<typeof StemProgramSchema>;
export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
export type SystemLog = z.infer<typeof SystemLogSchema>;
