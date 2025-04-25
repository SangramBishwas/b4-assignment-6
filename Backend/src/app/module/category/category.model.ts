import { Schema, model, Document } from 'mongoose';
import { ICategory } from './category.interface';

interface ICategoryDocument extends Document, ICategory { }

const categorySchema = new Schema<ICategoryDocument>(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        icon: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

export const Category = model<ICategoryDocument>('Category', categorySchema);