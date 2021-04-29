import {NextFunction, Response} from 'express';
import {IRequestExtended} from '../../models';
// import {productService} from "../../services";
import * as Joi from 'joi';
// import {customErrors, ErrorHandler} from "../../errors";
import {addProductToCartValidator} from '../../validators';
// import {ResponseStatusCodeEnum} from "../../constants";

export const addProductToCartValidatorMiddleware = (req: IRequestExtended, res: Response, next: NextFunction) => {
  // const productID = req.query.productID as string;
  const {error} = Joi.validate( req.body, addProductToCartValidator);
  if (error) {
    return next(new Error(error.details[0].message));
  }
  next();

};
