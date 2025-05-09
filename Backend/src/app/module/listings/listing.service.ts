/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/appError';
import { ConditionType, IListing } from './listing.interface';
import { Listing } from './listing.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { Types } from 'mongoose';
import status from 'http-status';
import { IImageFiles } from '../../interface/ImageFile';

const createListingIntoDB = async (
  productData: Partial<IListing>,
  productImages: IImageFiles,
) => {
  const { images } = productImages;
  if (!images || images.length === 0) {
    throw new AppError(status.BAD_REQUEST, 'Product images are required.');
  }

  productData.images = images.map((image) => image.path);

  const newProduct = new Listing(productData); // Create a Listing instance

  const result = await newProduct.save();
  return result;
};

const getALlListingsFromDB = async (query: Record<string, unknown>) => {
  const {
    minPrice,
    maxPrice,
    categories,
    brands,
    location,
    condition,
    ...pQuery
  } = query;

  // Build the filter object
  const filter: Record<string, any> = {};

  // Filters functionals
  if (categories) {
    const categoryArray =
      typeof categories === 'string'
        ? categories.split(',')
        : Array.isArray(categories)
          ? categories
          : [categories];

    filter.categories = { $in: categoryArray };
  }

  if (location) {
    const locationArray =
      typeof location === 'string'
        ? location.split(',')
        : Array.isArray(location)
          ? location
          : [location];

    filter.location = { $in: locationArray };
  }

  if (brands) {
    const brandsArray =
      typeof brands === 'string'
        ? brands.split(',')
        : Array.isArray(brands)
          ? brands
          : [brands];

    filter.brands = { $in: brandsArray };
  }

  if (condition) {
    const validConditions: ConditionType[] = ['new', 'used', 'refurbished'];

    const conditionArray = Array.isArray(condition)
      ? condition.filter((c) => validConditions.includes(c as ConditionType))
      : validConditions.includes(condition as ConditionType)
        ? [condition]
        : [];

    if (conditionArray.length > 0) {
      filter.condition = { $in: conditionArray };
    }
  }

  const listingsQuery = new QueryBuilder(
    Listing.find(filter).populate('categories').populate({
      path: 'userID',
      select: 'name email lastLogin isActive',
    }),
    pQuery,
  )
    .search(['title', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields()
    .priceRange(Number(minPrice) || 0, Number(maxPrice) || Infinity);

  const products = await listingsQuery.modelQuery.lean();
  const meta = await listingsQuery.countTotal();

  return {
    result: products,
    meta,
  };
};

const getSingleListingFromDB = async (id: string) => {
  const product = await Listing.findById(id).populate('categories').populate({
    path: 'userID',
    select: 'name email lastLogin isActive',
  });

  if (!product) {
    throw new AppError(status.NOT_FOUND, 'Listing Product not found');
  }

  const productObj = product.toObject();

  return productObj;
};

const deleteListingFromDB = async (id: string) => {
  const product = await Listing.findOne({
    _id: id,
  });

  if (!product) {
    throw new AppError(status.NOT_FOUND, 'Product Not Found');
  }

  const result = await Listing.findByIdAndDelete(id);
  return result;
};

const updateListing = async (
  id: string,
  payload: Partial<IListing>,
  productImages: IImageFiles,
) => {
  const { images } = productImages;

  const listingProduct = await Listing.findOne({
    _id: id,
  });

  if (!listingProduct) {
    throw new AppError(status.NOT_FOUND, 'Listing Product Not Found');
  }

  if (images && images.length > 0) {
    payload.images = images.map((image) => image.path);
  }

  return await Listing.findByIdAndUpdate(id, payload, { new: true });
};

const changeListingStatus = async (id: string, status: string) => {
  const result = await Listing.findOneAndUpdate(
    {
      _id: new Types.ObjectId(id),
    },
    { status },
    { new: true },
  );

  return result;
};

export const ListingServices = {
  createListingIntoDB,
  getALlListingsFromDB,
  getSingleListingFromDB,
  deleteListingFromDB,
  updateListing,
  changeListingStatus,
};
