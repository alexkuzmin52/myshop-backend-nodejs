import {NextFunction, Response} from 'express';

import {IRequestExtended} from '../../models';
import {ResponseStatusCodeEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {productService} from '../../services';

export const checkIsProductAddCartExistMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<any> => {
  const productByID = await productService.findByID(req.query.productID as string);
  const {count} = req.body;
  if (!productByID) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_PRODUCT_UPDATE_NOT_FOUND.message,
      customErrors.BAD_REQUEST_PRODUCT_UPDATE_NOT_FOUND.code
    ));
  }

  if (productByID.stockCount < count) {
    return next(new Error(`Remaining products in stock: ${productByID.stockCount} ps`));

  }
  req.product = productByID;
  next();
};
//TODO
