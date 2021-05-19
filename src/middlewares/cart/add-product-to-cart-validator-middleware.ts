import * as Joi from 'joi';
import {NextFunction, Response} from 'express';

import {IRequestExtended} from '../../models';
import {addProductToCartValidator} from '../../validators';

export const addProductToCartValidatorMiddleware = (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {error} = Joi.validate( req.body, addProductToCartValidator);

  if (error) {
    return next(new Error(error.details[0].message));
  }

  next();
};
