import {NextFunction, Response} from 'express';

import {CartType} from '../../database';
import {IRequestExtended} from '../../models';
import {ResponseStatusCodeEnum} from '../../constants';
import {customErrors, ErrorHandler} from '../../errors';
import {productService} from '../../services';

export const CheckIsEnoughProductsInStock = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const userCart = req.cart as CartType;

  for (const product of userCart.products) {
    const updatedProduct = await productService.findProductByID(product.productID);

    if (!updatedProduct || updatedProduct && updatedProduct.stockCount < product.count) {
      return next(new ErrorHandler(
        ResponseStatusCodeEnum.BAD_REQUEST,
        customErrors.BAD_REQUEST_REGISTER_ORDER_LACK_OF_PRODUCTS.message,
        customErrors.BAD_REQUEST_REGISTER_ORDER_LACK_OF_PRODUCTS.code
      ));
    }
  }
  next();
};
