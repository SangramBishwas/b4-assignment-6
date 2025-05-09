import mongoose from 'mongoose';
import { IAuth, IJwtPayload, IUser, UserRole } from './auth.interface';
import AppError from '../../errors/appError';
import User from './auth.model';
import config from '../../config';
import { createToken, verifyToken } from './auth.utils';
import { Secret } from 'jsonwebtoken';
import status from 'http-status';

const loginUser = async (payload: IAuth) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const user = await User.findOne({ email: payload.email }).session(session);
    if (!user) {
      throw new AppError(status.NOT_FOUND, 'This user is not found!');
    }

    if (!user.isActive) {
      throw new AppError(status.FORBIDDEN, 'This user is not active!');
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
      throw new AppError(status.FORBIDDEN, 'Password does not match');
    }

    const jwtPayload: IJwtPayload = {
      _id: user._id as string,
      name: user.name as string,
      email: user.email as string,
      isActive: user.isActive,
      role: user.role,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );

    // console.log('accessToken', accessToken);

    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string,
    );

    // const updateUserInfo = await User.findByIdAndUpdate(
    //   user._id,
    //   { clientInfo: payload.clientInfo, lastLogin: Date.now() },
    //   { new: true, session },
    // );

    await session.commitTransaction();

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// Function to register user
const registerUser = async (userData: IUser) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if ([UserRole.ADMIN].includes(userData.role)) {
      throw new AppError(
        status.NOT_ACCEPTABLE,
        'Invalid role. Only User is allowed.',
      );
    }

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email: userData.email }).session(
      session,
    );
    if (existingUser) {
      throw new AppError(
        status.NOT_ACCEPTABLE,
        'Email is already registered',
      );
    }

    // Create the user
    const user = new User(userData);
    const createdUser = await user.save({ session });

    await session.commitTransaction();

    return await loginUser({
      email: createdUser.email,
      password: userData.password,
    });
  } catch (error) {
    console.log(error);
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    throw error;
  } finally {
    session.endSession();
  }
};

const refreshToken = async (token: string) => {
  let verifiedToken = null;
  try {
    verifiedToken = verifyToken(token, config.jwt_refresh_secret as Secret);
  } catch (err: any) {
    console.log(err);
    throw new AppError(status.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, 'User does not exist');
  }

  if (!isUserExist.isActive) {
    throw new AppError(status.BAD_REQUEST, 'User is not active');
  }

  const jwtPayload: IJwtPayload = {
    _id: isUserExist._id as string,
    name: isUserExist.name as string,
    email: isUserExist.email as string,
    isActive: isUserExist.isActive,
    role: isUserExist.role,
  };

  const newAccessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = { registerUser, loginUser, refreshToken };