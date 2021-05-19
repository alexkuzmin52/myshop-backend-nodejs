import {NextFunction, Response} from 'express';

import {ActionEnum, OrderStatusEnum} from '../../constants';
import {ICart, IRequestExtended, IUser} from '../../models';
import {logService, orderService} from '../../services';

export const CheckIsUserOrderExistMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {_id} = req.user as IUser;
  const userCart = req.cart as ICart;

  let userOrder = await orderService.getUserOrderById(userCart._id);

  if (!userOrder || userOrder.status !== OrderStatusEnum.REGISTERED) {
    const initOrder = {
      userID: _id,
      cartID: userCart?._id
    };
    userOrder = await orderService.createOrder(initOrder);
    await logService.createLog({event: ActionEnum.USER_ORDER_CREATE, userId: _id, data: userOrder});
  }

  req.order = userOrder;
  next();
};

