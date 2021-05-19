import {Document, Model, model, Schema} from 'mongoose';

import {CartStatusEnum, TableNamesEnum} from '../../../constants';
import {ICart} from '../../../models';

export type CartType = ICart & Document;

export const CartSchema = new Schema<CartType>({
  products: [
    {
      _id: false,
      productID: {
        type: Schema.Types.ObjectId,
        ref: TableNamesEnum.PRODUCTS
      },
      id: {
        type: Number,
        required: true
      },
      count: {
        type: Number,
        required: true,
        default: 0
      },
      sumProduct: {
        type: Number,
        required: true,
        default: 0
      }
    }],
  userID: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.USER
  },
  status: {
    type: String,
    required: true,
    default: CartStatusEnum.IN_PROGRESS,
    enum: Object.values(CartStatusEnum)
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  sum: {
    type: Number,
    required: true,
    default: 0
  }
},
{
  timestamps: true
}
);

export const CartModel: Model<CartType> = model(TableNamesEnum.CART, CartSchema);
