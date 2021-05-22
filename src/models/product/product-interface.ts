import {ProductTypeEnum} from '../../constants';

export interface IReview {
  _id: string,
  comment?: string;
  rating?: number;
  userID?: string;
  createdAt: Date;
}

export interface IPackageDimensions {
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
}

export interface IItemDimensions {
  length?: number;
  width?: number;
  height?: number;
  weight?: number;
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
  originalPrice: number;
  equipment: string;
  fullCharacteristics: string;
  fullDescription: string;
  id: number;
  newFlag: boolean;
  overview_url: string;
  packageAmount?: number;
  packageDimensions?: IPackageDimensions;
  itemDimensions?: IItemDimensions;
  photo?: string[];
  price: number;
  promoFlag: boolean;
  provider: string;
  reviews?: IReview[];
  shortCharacteristics: string;
  shortDescription: string;
  stockCount: number;
  storeCount: number;
  title: string;
  updatedAt: string;
  userID: string;
}
