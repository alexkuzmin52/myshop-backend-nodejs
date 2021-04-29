import {IProduct} from '../../../models/product/product-interface';
import {Document, Model, model, Schema, SchemaTypes} from 'mongoose';
import {ProductTypeEnum, TableNamesEnum} from '../../../constants';

export type ProductType = IProduct & Document;
const dimensions = {
  length: Number,
  width: Number,
  height: Number
};

export const ProductSchema = new Schema<IProduct>(
  {
    accountingType: {
      type: String,
      required: true,
      enum: Object.values(ProductTypeEnum)
    },
    brand: {
      type: String,
      required: false,
      default: ''
    },
    category: {
      type: String,
      required: true
    },
    code: {
      type: Number,
      required: false,
      default: 0
    },
    countryOfManufacture: {
      type: String,
      required: false,
      default: 'Ukraine'
    },
    discount: {
      type: Number,
      required: false,
      default: 0
    },
    discountFlag: {
      type: Boolean,
      required: false,
      default: false
    },

    discountPrice: {
      type: Number,
      required: false,
      default: 0
    },
    equipment: {
      type: String,
      required: false,
      default: 'Product'
    },
    fullCharacteristics: {
      type: String,
      required: false,
      default: ''
    },
    fullDescription: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: Number,
      required: false,
      default: 0
    },
    newFlag: {
      type: Boolean,
      required: false,
      default: false
    },
    packageAmount: {
      type: Number,
      required: false,
      default: 1
    },
    packageDimensions: dimensions,
    packageWeight: {
      type: Number,
      required: false,
      default: 0
    },
    photo: {
      type: Array,
      required: false,
      default: null
    },
    price: {
      type: Number,
      required: true
    },
    promoFlag: {
      type: Boolean,
      required: false,
      default: false
    },
    provider: {
      type: String,
      required: true
    },
    reviews: {
      type: SchemaTypes.ObjectId,
      ref: TableNamesEnum.REVIEWS
    },
    shortCharacteristics: {
      type: String,
      required: false,
      default: ''
    },
    shortDescription: {
      type: String,
      required: false,
      default: ''
    },
    stockCount: {
      type: Number,
      required: true
    },
    storeCount: {
      type: Number,
      required: true
    },
    subCategory: {
      type: String,
      required: false,
      default: ''
    },
    subSubCategory: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    userID: {
      type: SchemaTypes.ObjectId,
      ref: TableNamesEnum.USER
    }
  },
  {timestamps: true}
);
export const ProductModel: Model<ProductType> = model(TableNamesEnum.PRODUCTS, ProductSchema);

