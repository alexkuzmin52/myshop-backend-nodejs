import {NextFunction, Response} from 'express';

import {ICart, IRequestExtended, IUser} from '../../models';
import {logService, orderService} from '../../services';
// import {customErrors, ErrorHandler} from '../../errors';
import {ActionEnum, OrderStatusEnum} from '../../constants';

export const CheckIsUserOrderExistMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {_id} = req.user as IUser;
  const userCart = req.cart as ICart;
  let userOrder = await orderService.getUserOrderById(userCart._id);
  console.log('1111111111111111111111111111111111111111111111111111111111');
  console.log(userOrder);
  if (!userOrder || userOrder.status !== OrderStatusEnum.REGISTERED) {
    console.log('22222222222222222222222222222222222222222222222222222222222222');
    const initOrder = {
      userID: _id,
      cartID: userCart?._id
      // payment: userCart.sum
    };
    userOrder = await orderService.createOrder(initOrder);
    console.log(userOrder);

    // userOrder = await orderService.getUserOrder(_id);
    await logService.createLog({event: ActionEnum.USER_ORDER_CREATE, userId: _id, data: userOrder});
  }
  // if (!userOrder) {
  //   return next(new ErrorHandler(ResponseStatusCodeEnum.NOT_FOUND,
  //     customErrors.BAD_REQUEST_CONFIRM_ORDER_NOT_FOUND.message,
  //     customErrors.BAD_REQUEST_CONFIRM_ORDER_NOT_FOUND.code
  //   ));
  // }
  req.order = userOrder;
  next();
};

