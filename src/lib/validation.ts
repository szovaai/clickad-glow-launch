import { z } from 'zod';

export const auditFormSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required").max(100),
  contactName: z.string().trim().min(1, "Your name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  website: z.string().trim().url("Invalid URL").max(500).optional().or(z.literal('')),
  industry: z.string().trim().max(100).optional(),
  notes: z.string().trim().max(1000).optional(),
});

export type AuditFormData = z.infer<typeof auditFormSchema>;
