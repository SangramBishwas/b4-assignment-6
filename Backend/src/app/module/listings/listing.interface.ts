import { Types } from 'mongoose';

export type ConditionType = 'new' | 'used' | 'refurbished';

export interface IListing {
  title: string;
  description: string;
  price: number;
  categories: Types.ObjectId;
  condition: ConditionType;
  images: string[];
  userID: Types.ObjectId;
  location?: string;
  status: 'available' | 'sold';
}