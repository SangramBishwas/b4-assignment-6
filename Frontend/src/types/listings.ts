import { TCategory } from "./category";


export type TUser = {
    _id: string;
    name: string;
    email: string;
    lastLogin: string;
    isActive: boolean;
};

export type TLIsting = {
    id?: string;
    _id?: string;
    title: string;
    description: string;
    price: number;
    condition: "new" | "used" | "refurbished";
    images: string[];
    categories: TCategory;
    userID: TUser;
    location?: string;
    status: "available" | "sold";
    createdAt: string;
    updatedAt: string;
};