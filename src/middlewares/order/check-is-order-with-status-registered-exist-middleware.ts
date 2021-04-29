import {IRequestExtended, IUser} from '../../models';
import {NextFunction, Response} from 'express';
import {orderService} from '../../services';
import {CartType} from '../../database';

export const CheckIsOrderWithStatusRegisteredExistMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {_id} = req.user as IUser;
  const userCart = req.cart as CartType;
  const userOrder = await orderService.getConfirmedUserOrder(_id);
  if (!userOrder) {
    await orderService.createOrder({userID: _id, cartID: userCart._id});
  }
  next();

};
