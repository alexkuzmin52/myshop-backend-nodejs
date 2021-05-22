import * as autoIncrement from 'mongoose-auto-increment';
import * as mongoose from 'mongoose';
import {Document, Model, model, Schema, SchemaTypes} from 'mongoose';

import {IProduct} from '../../../models';
import {ProductTypeEnum, TableNamesEnum} from '../../../constants';
import {config} from '../../../config';

export type ProductType = IProduct & Document;

const packageDimensionsSubModel = {
  length: {
    type: Number,
    required: false,
    default: 0
  },
  width: {
    type: Number,
    required: false,
    default: 0
  },
  height: {
    type: Number,
    required: false,
    default: 0
  },
  weight: {
    type: Number,
    required: false,
    default: 0
  }
};
const itemDimensionsSubModel = {
  length: {
    type: Number,
    required: false,
    default: 0
  },
  width: {
    type: Number,
    required: false,
    default: 0
  },
  height: {
    type: Number,
    required: false,
    default: 0
  },
  weight: {
    type: Number,
    required: false,
    default: 0
  }
};
const reviewSubModel = {
  comment: {
    type: String,
    required: true,
    default: ''
  },
  rating: {
    type: Number,
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.USER
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  }
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

    originalPrice: {
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
    overview_url: {
      type: String,
      default: 'http://www.google.com'
    },
    packageAmount: {
      type: Number,
      required: false,
      default: 1
    },
    packageDimensions: packageDimensionsSubModel,
    itemDimensions: itemDimensionsSubModel,
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
    reviews: [reviewSubModel],

    // reviews: {type: [reviewSubModel], excludeIndexes: true},
    // reviews: {
    //   type: SchemaTypes.ObjectId,
    //   ref: TableNamesEnum.REVIEWS
    // },
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

autoIncrement.initialize(mongoose.connection);

ProductSchema.plugin(autoIncrement.plugin, {
  model: 'ProductModel',
  field: 'id',
  startAt: config.START_NUMBER_PRODUCT_ID,
  incrementBy: 1
});
export const ProductModel: Model<ProductType> = model(TableNamesEnum.PRODUCTS, ProductSchema);

