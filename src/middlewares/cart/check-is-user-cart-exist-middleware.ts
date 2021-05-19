import {NextFunction, Response} from 'express';

import {CartModel} from '../../database';
import {CartStatusEnum} from '../../constants';
import {IRequestExtended, IUser} from '../../models';
import {cartService} from '../../services';

export const checkIsUserCartExistMiddleware = async (
  req: IRequestExtended,
  res: Response,
  next: NextFunction) => {
  const {_id} = req.user as IUser;
  let userCart = await CartModel.findOne({userID: _id, status: CartStatusEnum.IN_PROGRESS});

  if (!userCart) {
    userCart = await cartService.createUserCart(_id);
  }

  req.cart = userCart;
  next();
};
