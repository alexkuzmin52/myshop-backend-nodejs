import {IOrder} from '../../../models';
import {Document, Model, model, Schema} from 'mongoose';
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
    // required: true,
    default: OrderStatusEnum.REGISTERED
  },
  paymentMethod: {
    type: String,
    enum: Object.values(OrderPaymentMethodEnum),
    // required: true,
    default: OrderPaymentMethodEnum.BY_CARD_ONLINE
  },
  payment: {
    type: Number,
    // required: true,
    default: 0
  },
  confirmedDate: {
    type: Date,
    // required: true,
    default: new Date(0)
  },
  completedDate: {
    type: Date,
    // required: true,
    default: new Date(0)
  },
  sentDate: {
    type: Date,
    // required: true,
    default: new Date(0)
  },
  receivedDate: {
    type: Date,
    // required: true,
    default: new Date(0)
  },
  deliveredDate: {
    type: Date,
    // required: true,
    default: new Date(0)
  },
  returnedDate: {
    type: Date,
    // required: true,
    default: new Date(0)
  },
  reasonForReturning: {
    type: String,
    // required: true,
    default: ''
  },
  paidDate: {
    type: Date,
    // required: true,
    default: new Date(0)
  },
  delivery: {
    type: String,
    enum: Object.values(OrderDeliveryEnum),
    // required: true,
    default: OrderDeliveryEnum.FROM_STORE
  },
  address: {
    type: String,
    // required: true,
    default: ''
  },
  phone: {
    type: String,
    // required: true,
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
