import {ProductTypeEnum} from '../../constants';

export interface IReviews {
  comment?: string;
  rating?: number;
  user?: string;
}
export interface IDimensions {
  length?: number;
  width?: number;
  height?: number;
}

export interface IProduct {
  _id: string,
  accountingType: ProductTypeEnum;
  brand: string;
  category: string;
  code: number;
  countryOfManufacture: string;
  createdAt: string;
  discount: number;
  discountFlag: boolean;
  discountPrice: number;
  equipment: string;
  fullCharacteristics: string;
  fullDescription: string;
  id: number;
  newFlag: boolean;
  packageAmount?: number;
  packageDimensions?: [IDimensions];
  packageWeight?: number;
  photo?: string[];
  price: number;
  promoFlag: boolean;
  provider: string;
  reviews?: IReviews[];
  shortCharacteristics: string;
  shortDescription: string;
  stockCount: number;
  storeCount: number;
  // subCategory?: string;
  // subSubCategory?: string;
  title: string;
  updatedAt: string;
  userID: string;
}
