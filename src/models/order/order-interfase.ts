import {OrderDeliveryEnum} from '../../constants';
import {OrderPaymentMethodEnum} from '../../constants';
import {OrderStatusEnum} from '../../constants';

//TODO
export interface ICustomer {
  name: string,
  surname: string,
  phone: string,
  city: string
}

export interface IOrder {
  _id: string,
  No: number;
  userID: string;
  cartID: string;
  status: OrderStatusEnum;
  payment: number;
  paymentMethod: OrderPaymentMethodEnum;
  confirmedDate?: Date;
  completedDate?: Date;
  sentDate?: Date;
  receivedDate?: Date;
  reasonForReturning?: string;
  deliveredDate?: Date;
  returnedDate?: Date;
  paidDate?: Date;
  delivery: OrderDeliveryEnum;
  address: string;
  phone: string;
  city: string;
}
