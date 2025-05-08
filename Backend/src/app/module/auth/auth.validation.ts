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
      .optional(),
    gender: z.enum(['Male', 'Female', 'Other', "N/A"]).optional(),
    dateOfBirth: z
      .string()
      .optional(),
    address: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
  }),
});

export const AuthValidation = {
  userValidationSchema,
  userUpdateValidationSchema,
};