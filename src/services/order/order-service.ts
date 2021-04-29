import {IOrder} from '../../models';
import {OrderModel, OrderType} from '../../database';
import {OrderStatusEnum, TableNamesEnum} from '../../constants';

export class OrderService {
  createOrder = (order: Partial<IOrder>): Promise<OrderType> => {
    return new OrderModel(order).save();
  }

  getUserOrder(_id: string): Promise<OrderType | null> {
    return OrderModel.findOne({cartID: _id})
      .select('No cartID paymentMethod payment delivery')
      .populate({
        path: 'cartID',
        model: TableNamesEnum.CART,
        select: 'amount sum products',
        populate: {
          path: 'products.productID',
          model: TableNamesEnum.PRODUCTS,
          select: 'price title sumProduct stockCount photo _id'
        }
      })
      .exec();
  }

  getConfirmedUserOrder(_id: string): Promise<OrderType | null> {
    return OrderModel.findOne({userID: _id, status: OrderStatusEnum.REGISTERED}).exec();
  }

  updateOrder(_id: string, userOrder: Partial<IOrder>): Promise<OrderType | null> {
    return OrderModel.findOneAndUpdate({cartID: _id}, userOrder, {new: true}).exec();
  }

  removeOrder(_id: string): Promise<OrderType | null> {
    return OrderModel.findByIdAndDelete(_id).exec();
  }

  getUserOrderById(_id: string): Promise<IOrder | null> {
    return OrderModel.findOne({userID: _id}).exec();
  }
}

export const orderService = new OrderService();
