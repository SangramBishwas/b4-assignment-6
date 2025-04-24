import { z } from 'zod';
import { UserRole } from './auth.interface';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum([UserRole.USER, UserRole.ADMIN]).default(UserRole.USER),
  }),
});

const userUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    phoneNo: z
      .string()
      .regex(/^\d{11}$/, 'Phone number must be exactly 11 digits long')
      .optional(),
    gender: z.enum(['Male', 'Female', 'Other']).default('Other').optional(),
    dateOfBirth: z
      .string()
      .optional()
      .refine((value) => !value || !isNaN(Date.parse(value)), {
        message: 'Invalid date format. Must be a valid date.',
      })
      .optional(),
    profileImage: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const AuthValidation = {
  userValidationSchema,
  userUpdateValidationSchema,
};