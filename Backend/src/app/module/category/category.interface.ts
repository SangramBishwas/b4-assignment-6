import { Types } from 'mongoose';

export interface ICategory {
    name: string;
    description?: string;
    isActive: boolean;
    createdBy: Types.ObjectId;
    icon?: string;
    createdAt?: Date;
    updatedAt?: Date;
}