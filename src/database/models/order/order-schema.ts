import {Document, Model, model, Schema} from 'mongoose';

import {IOrder} from '../../../models';
import {OrderDeliveryEnum, OrderPaymentMethodEnum, OrderStatusEnum, TableNamesEnum} from '../../../constants';

export type OrderType = IOrder & Document;

export const OrderSchema = new Schema({
  No: {
    type: Number,
    required: true,
    default: Date.now()

  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.USER,
    required: true
  },
  cartID: {
    type: Schema.Types.ObjectId,
    ref: TableNamesEnum.CART,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(OrderStatusEnum),
    default: OrderStatusEnum.REGISTERED
  },
  paymentMethod: {
    type: String,
    enum: Object.values(OrderPaymentMethodEnum),
    default: OrderPaymentMethodEnum.BY_CARD_ONLINE
  },
  payment: {
    type: Number,
    default: 0
  },
  confirmedDate: {
    type: Date,
    default: new Date(0)
  },
  completedDate: {
    type: Date,
    default: new Date(0)
  },
  sentDate: {
    type: Date,
    default: new Date(0)
  },
  receivedDate: {
    type: Date,
    default: new Date(0)
  },
  deliveredDate: {
    type: Date,
    default: new Date(0)
  },
  returnedDate: {
    type: Date,
    default: new Date(0)
  },
  reasonForReturning: {
    type: String,
    default: ''
  },
  paidDate: {
    type: Date,
    default: new Date(0)
  },
  delivery: {
    type: String,
    enum: Object.values(OrderDeliveryEnum),
    default: OrderDeliveryEnum.FROM_STORE
  },
  address: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  }
},
{
  timestamps: true
}
);

export const OrderModel: Model<OrderType> = model(TableNamesEnum.ORDER, OrderSchema);
