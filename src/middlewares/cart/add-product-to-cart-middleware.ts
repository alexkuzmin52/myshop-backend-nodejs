import {IRequestExtended} from '../../models';
import {NextFunction, Response} from 'express';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';
import {productService} from '../../services';

export const addProductToCartMiddleware = async (req: IRequestExtended,
  res: Response,
  next: NextFunction): Promise<any> => {
  const productID = req.query.productID as string;
  const productFromDB = await productService.findByID(productID);

  if (!productFromDB) {
    return next(new ErrorHandler(ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_ADD_PRODUCT_TO_CART_NOT_FOUND.message));
  }

  if (productFromDB.stockCount < 1) {
    return next(new ErrorHandler(ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_ADD_PRODUCT_TO_CART_LACK_OF_STOCK.message));
  }

  req.product = productFromDB;
  next();
};
