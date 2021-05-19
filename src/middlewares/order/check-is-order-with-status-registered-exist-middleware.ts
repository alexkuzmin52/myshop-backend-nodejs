import {NextFunction, Response} from 'express';

import {CartType} from '../../database';
import {IRequestExtended, IUser} from '../../models';
import {orderService} from '../../services';

export const CheckIsOrderWithStatusRegisteredExistMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {_id} = req.user as IUser;
  const userCart = req.cart as CartType;
  const userOrder = await orderService.getConfirmedUserOrder(_id);

  if (!userOrder) {
    await orderService.createOrder({userID: _id, cartID: userCart._id});
  }

  next();

};
