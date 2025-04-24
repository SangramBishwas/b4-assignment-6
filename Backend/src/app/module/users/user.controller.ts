import { IImageFile } from '../../interface/ImageFile';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IJwtPayload } from '../auth/auth.interface';
import { UserServices } from './user.service';
import status from 'http-status';

const myProfile = catchAsync(async (req, res) => {

  const { id } = req.params;
  const result = await UserServices.myProfile(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateProfile(
    req.body,
    req.file as IImageFile,
    req.user as IJwtPayload,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Profile updated successfully`,
    data: result,
  });
});

const deleteProfile = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.deleteUser(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Profile deleted successfully`,
    data: result,
  });
});

export const UserController = {
  myProfile,
  deleteProfile,
  updateProfile
};
