import { z } from 'zod';

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// Equipment inquiry schema
export const equipmentInquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  organization: z.string().optional(),
  phone: z.string().optional(),
  productId: z.string(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

// STEM program registration schema
export const stemRegistrationSchema = z.object({
  studentName: z.string().min(2, 'Student name must be at least 2 characters'),
  parentName: z.string().min(2, 'Parent name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  age: z.number().min(5).max(18, 'Age must be between 5 and 18'),
  programId: z.string(),
  emergencyContact: z.string().min(10, 'Emergency contact must be at least 10 characters'),
  medicalInfo: z.string().optional(),
});

// Lab access request schema
export const labAccessSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  organization: z.string().optional(),
  visitDate: z.string(),
  groupSize: z.number().min(1).max(50, 'Group size must be between 1 and 50'),
  purpose: z.string().min(10, 'Purpose must be at least 10 characters'),
  requirements: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type EquipmentInquiryData = z.infer<typeof equipmentInquirySchema>;
export type StemRegistrationData = z.infer<typeof stemRegistrationSchema>;
export type LabAccessData = z.infer<typeof labAccessSchema>;
