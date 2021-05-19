import * as Joi from 'joi';
import {NextFunction, Request, Response} from 'express';

import {IProduct} from '../../models';
import {createProductValidator} from '../../validators';

export const createProductValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {error} = Joi.validate(req.body as IProduct, createProductValidator);

  if (error) {
    return next(new Error(error.details[0].message));
  }

  next();
};
