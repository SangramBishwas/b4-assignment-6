import { z } from 'zod';

const listingValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, 'Title must be at least 1 characters long')
      .max(100),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long'),
    price: z.number().min(0, 'Price must be a positive number'),
    condition: z.enum(['new', 'used', 'refurbished']),
    userID: z.string({ required_error: 'Invalid User ID' }),
    location: z.string().optional(),
    status: z.enum(['available', 'sold']).default('available'),
    categories: z
      .string({
        required_error: 'Category ID is required',
      })
      .min(1, 'Category ID cannot be empty'),
  }),
});

const listingUpdateValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters long')
      .max(100)
      .optional(),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters long')
      .optional(),
    price: z.number().min(0, 'Price must be a positive number').optional(),
    condition: z.enum(['new', 'used', 'refurbished']).optional(),
    userID: z.string({ required_error: 'Invalid User ID' }).optional(),
    location: z.string().optional(),
    status: z.enum(['available', 'sold']).default('available').optional(),
  }),
});

export const ListingValidations = {
  listingValidationSchema,
  listingUpdateValidationSchema,
};