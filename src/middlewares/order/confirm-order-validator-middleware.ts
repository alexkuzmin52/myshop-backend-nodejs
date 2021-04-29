import {IRequestExtended} from '../../models';
import {NextFunction, Response} from 'express';
import * as Joi from 'joi';
import {confirmOrderValidator} from '../../validators/order/confirm-order-validator';

export const ConfirmOrderValidatorMiddleware = (
  req: IRequestExtended,
  res: Response,
  next: NextFunction) => {
  const {error} =Joi.validate(req.body, confirmOrderValidator);
  if (error) {
    return next(new Error(error.details[0].message));
  }
  next();
};
