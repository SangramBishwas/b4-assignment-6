/* eslint-disable no-unused-vars */

import { Model } from 'mongoose';


export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}


export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  lastLogin?: Date;
  isActive: boolean;
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
  profileImage?: string;
  address?: string;
  phoneNo?: string;
  gender?: string;
  dateOfBirth?: string;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface UserModel extends Model<IUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserExistsByEmail(id: string): Promise<IUser>;
  checkUserExist(userId: string): Promise<IUser>;
}

export type TUserRole = keyof typeof UserRole;

export interface IJwtPayload {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}
