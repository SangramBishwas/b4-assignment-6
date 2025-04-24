/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema } from 'mongoose';
import AppError from '../../errors/appError';
import { IAddress, IUser, UserModel, UserRole } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import status from 'http-status';

const addressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

// Create the User schema based on the interface
const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.USER],
      default: UserRole.USER,
    },
    userInfo: {
      device: {
        type: String,
        enum: ['pc', 'mobile'],
        required: true,
      },
      browser: {
        type: String,
        required: true,
      },
      ipAddress: {
        type: String,
        required: true,
      },
      pcName: {
        type: String,
      },
      os: {
        type: String,
      },
      userAgent: {
        type: String,
      },
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    otpToken: {
      type: String,
      default: null,
    },
    profileImage: { type: String, required: false },
    phoneNo: { type: String, required: false },
    gender: { type: String, required: false },
    dateOfBirth: { type: String, required: false },
    address: { type: addressSchema, required: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.checkUserExist = async function (userId: string) {
  const existingUser = await this.findById(userId);

  if (!existingUser) {
    throw new AppError(status.NOT_FOUND, 'The user is not found');
  }

  if (!existingUser.isActive) {
    throw new AppError(status.NOT_FOUND, 'User is not active!');
  }

  return existingUser;
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);
export default User;