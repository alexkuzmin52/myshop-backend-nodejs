import {NextFunction, Request, Response} from 'express';
import * as Joi from 'joi';
import {AddReviewValidator} from '../../validators';

export const AddReviewValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction): void =>{
  const {error} = Joi.validate(req.body, AddReviewValidator);
  if (error) {
    return next(new Error(error.details[0].message));
  }
  next();
};
