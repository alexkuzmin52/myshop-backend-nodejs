import * as Joi from 'joi';
import {NextFunction, Request, Response} from 'express';

import {ICategory} from '../../models';
import {createCategoryValidator} from '../../validators';

export const createCategoryValidatorMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const category = req.body as ICategory;
  const {error} = Joi.validate(category, createCategoryValidator);

  if (error) {
    return next(new Error(error.details[0].message));
  }

  next();
};
