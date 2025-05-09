import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WishlistServices } from './wishlist.service';
import { IJwtPayload } from '../auth/auth.interface';

const addToWishlist = catchAsync(async (req, res) => {
    const wishlist = await WishlistServices.addToWishlist(
        req.body,
        req.user as IJwtPayload,
    );

    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'Wishlist added successfully',
        data: wishlist,
    });
});

const getMyWishlist = catchAsync(async (req, res) => {
    const result = await WishlistServices.getWishlist(req.user as IJwtPayload);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Wishlist retrived successfully',
        data: result,
    });
});

const deleteWishlist = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await WishlistServices.deleteWishlist(
        id,
        req.user as IJwtPayload,
    );

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Wishlist removed successfully',
        data: result,
    });
});

export const WishlistControllers = {
    addToWishlist,
    getMyWishlist,
    deleteWishlist,
};