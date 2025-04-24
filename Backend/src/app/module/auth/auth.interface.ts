/* eslint-disable no-unused-vars */

import { Document, Model } from 'mongoose';


export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}


interface IUserInfo {
  userAgent?: string; 
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  userInfo: IUserInfo;
  lastLogin: Date;
  isActive: boolean;
  otpToken: string | null;
  readonly createdAt: Date;
  updatedAt: Date;
  profileImage?: string;
  address?: IAddress;
  phoneNo?: string;
  gender?: string;
  dateOfBirth?: string;
}

export interface IAuth {
  email: string;
  password: string;
  userInfo: IUserInfo;
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
