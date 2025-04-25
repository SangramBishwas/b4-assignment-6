import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';
import { UserRole } from '../module/auth/auth.interface';
import User from '../module/auth/auth.model';
import status from 'http-status';
// import User from '../modules/auth/auth.model';
// import { UserRole } from '../modules/auth/auth.interface';

const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    if (!token) {
      token = req.cookies?.refreshToken;
    }

    // console.log('auth__token', token);

    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
    }

    try {
      const secret =
        req.cookies?.refreshToken && !req.headers.authorization
          ? config.jwt_refresh_secret
          : config.jwt_access_secret;

      const decoded = jwt.verify(token, secret as string) as JwtPayload;

      const { role, email } = decoded;

      // console.log('roles__', requiredRoles, role);

      const user = await User.findOne({ email, role, isActive: true });

      if (!user) {
        throw new AppError(status.NOT_FOUND, 'This user is not found!');
      }

      if (requiredRoles && !requiredRoles.includes(role)) {
        throw new AppError(status.UNAUTHORIZED, 'You are not authorized!');
      }

      // req.user = decoded as JwtPayload & { role: string };

      req.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
      } as JwtPayload;

      // console.log('decoded_user', req.user);
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(
          new AppError(
            status.UNAUTHORIZED,
            'Token has expired! Please login again.',
          ),
        );
      }
      return next(new AppError(status.UNAUTHORIZED, 'Invalid token!'));
    }
  });
};

export default auth;