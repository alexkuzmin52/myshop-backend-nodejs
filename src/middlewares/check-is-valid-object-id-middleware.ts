import * as Joi from 'joi';
import {NextFunction, Request, Response} from 'express';

import {ErrorHandler} from '../errors';
import {ResponseStatusCodeEnum} from '../constants';
import {objectIdValidator} from '../validators';

export const CheckIsValidObjectIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const val = Object.values(req.query);
  const {error} = Joi.validate({param: val[0]}, objectIdValidator);

  if (error) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      error.details[0].message
    ));
  }

  next();
};
//TODO
