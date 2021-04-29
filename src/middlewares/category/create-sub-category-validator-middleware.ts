import * as Joi from 'joi';
import {NextFunction, Request, Response} from 'express';

import {ISubCategory} from '../../models';
import {createSubCategoryValidator} from '../../validators';

export const createSubCategoryValidatorMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const subCategory = req.body as ISubCategory;
  const {error} = Joi.validate(subCategory, createSubCategoryValidator);

  if (error) {
    return next(new Error(error.details[0].message));
  }

  next();
};
