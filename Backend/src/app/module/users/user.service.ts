import User from '../auth/auth.model';
import AppError from '../../errors/appError';
import status from 'http-status';
import { IJwtPayload, IUser } from '../auth/auth.interface';
import { IImageFile } from '../../interface/ImageFile';

const myProfile = async (id: string) => {

  const isUserExists = await User.findById(id);
  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, 'User not found!');
  }
  if (!isUserExists.isActive) {
    throw new AppError(status.BAD_REQUEST, 'User is not active!');
  }

  return {
    ...isUserExists.toObject(),
  };
};

const updateProfile = async (
  payload: IUser,
  file: IImageFile,
  authUser: IJwtPayload,
) => {
  const isUserExists = await User.findById(authUser._id);

  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, 'User not found!');
  }

  if (!isUserExists.isActive) {
    throw new AppError(status.BAD_REQUEST, 'User is not active!');
  }

  if (file && file.path) {
    payload.profileImage = file.path;
  }

  const result = await User.findOneAndUpdate(
    { _id: authUser._id },
    { $set: payload },
    { new: true, runValidators: true },
  );

  return result;
};

const deleteUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User not found!');
  }

  if (!user.isActive) {
    throw new AppError(status.BAD_REQUEST, 'Inactive users cannot be deleted!');
  }

  const deletedUser = await User.findByIdAndDelete(id);

  return deletedUser;
};

export const UserServices = {
  myProfile,
  deleteUser,
  updateProfile
};
