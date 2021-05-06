import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';
import {createProductValidator} from '../../validators';
import {IProduct} from '../../models';

export const createProductValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // console.log('**************************************************************************');
  // console.log(req.body);
  const {error} = Joi.validate(req.body as IProduct, createProductValidator);
  if (error) {
    return next(new Error(error.details[0].message));
  }
  next();
};
