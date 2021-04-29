import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';
import {objectIdValidator} from '../validators';
import {ErrorHandler} from '../errors';
import {ResponseStatusCodeEnum} from '../constants';

export const CheckIsValidObjectIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('req.query============================================================');
  console.log(req.query);
  console.log('req.query.productID============================================================');
  console.log(req.query.productID);
  console.log(typeof (req.query.productID));
  const val = Object.values(req.query);
  // console.log('val88888888888888888888888888888888888888888888');
  // console.log(val);
  // console.log(typeof (val));
  // const param = {param: val};
  const {error} = Joi.validate({param: val[0]}, objectIdValidator);
  if (error) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      error.details[0].message
    ));
  }

  next();
};
