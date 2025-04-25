import { IImageFile } from './../../interface/ImageFile';
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import { IJwtPayload } from '../auth/auth.interface';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.createCategory(
        req.body,
        req.file as IImageFile,
        req.user as IJwtPayload,
    );

    // console.log('cc cate', req.body);

    sendResponse(res, {
        statusCode: status.CREATED,
        success: true,
        message: 'Category created succesfully',
        data: result,
    });
});

const getAllCategory = catchAsync(async (req, res) => {
    const result = await CategoryService.getAllCategory(req.query);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Category are retrieved succesfully',
        meta: result.meta,
        data: result.result,
    });
});

const deleteCategory = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CategoryService.deleteCategoryIntoDB(
        id,
        req.user as IJwtPayload,
    );

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Category is deleted successfully',
        data: result,
    });
});

export const CategoryController = {
    createCategory,
    getAllCategory,
    deleteCategory,
};