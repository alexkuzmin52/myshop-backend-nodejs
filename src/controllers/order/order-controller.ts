import {NextFunction, Response} from 'express';

import {cartService, logService, orderService, productService} from '../../services';
import {ICart, IOrder, IRequestExtended, IUser} from '../../models';
import {ActionEnum, OrderStatusEnum, ResponseStatusCodeEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
// import {CartType} from '../../database';

export class OrderController {

  confirmOrder = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const {_id} = req.user as IUser;
      const update = req.body as Partial<IOrder>;
      // const userOrder = req.order as IOrder;
      const userCart = req.cart as ICart;

      if (!userCart.products.length) {
        throw new ErrorHandler(ResponseStatusCodeEnum.NOT_FOUND,
          customErrors.BAD_REQUEST_USER_CART_IS_EMPTY.message,
          customErrors.BAD_REQUEST_USER_CART_IS_EMPTY.code
        );
      }

      update.confirmedDate = new Date();
      update.status = OrderStatusEnum.CONFIRMED;
      update.payment = userCart.sum;
      await orderService.updateOrder(userCart._id, update);
      for (const product of userCart.products) {
        const productFromDB = await productService.findProductByID(product.productID);

        if (productFromDB) {
          productFromDB.stockCount -= product.count;
          await productFromDB.save();
        }
      }

      const responseConfirmedOrder = await orderService.getUserOrder(userCart._id);

      await cartService.deleteUserCart(userCart._id);

      await logService.createLog({event: ActionEnum.USER_ORDER_CONFIRMED, userId: _id, data: responseConfirmedOrder});
      res.json(responseConfirmedOrder);
    } catch (e) {
      return next(e);
    }
  }

  getUserOrder = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const {_id} = req.cart as ICart;
      const userOrder = await orderService.getUserOrder(_id);
      console.log(JSON.stringify(userOrder));
      res.json(userOrder);
    } catch (e) {
      return next(e);
    }
  }

  removeUserOrder = async (req: IRequestExtended, res: Response, next: NextFunction) => {
    try {
      const {_id, userID} = req.order as IOrder;
      console.log(_id);
      await orderService.removeOrder(_id);
      await logService.createLog({event:ActionEnum.USER_ORDER_DELETE, userId: userID, data: _id});
      res.json({message: 'User order successfully deleted'});
    } catch (e) {
      return next(e);
    }

  }
}

export const orderController = new OrderController();
