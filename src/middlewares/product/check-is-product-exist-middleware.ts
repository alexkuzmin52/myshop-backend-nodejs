import {NextFunction, Request, Response} from 'express';

import {ResponseStatusCodeEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {productService} from '../../services';

export const checkIsProductExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const productByID = await productService.findOneByProperty({ id: + req.params.productID});

  if (!productByID) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_PRODUCT_UPDATE_NOT_FOUND.message,
      customErrors.BAD_REQUEST_PRODUCT_UPDATE_NOT_FOUND.code
    ));
  }

  next();
};
