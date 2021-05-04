import * as Joi from 'joi';
import {NextFunction, Request, Response} from 'express';

import {createSubSubCategoryValidator} from '../../validators';
import {ISubSubCategory} from '../../models';

export const createSubSubCategoryValidatorMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const subSubCategory = req.body as Partial<ISubSubCategory>;
  const {error} = Joi.validate(subSubCategory, createSubSubCategoryValidator);

  if (error) {
    return next(new Error(error.details[0].message));
  }

  next();
};
