import {NextFunction, Response} from 'express';
// import {IProduct} from '../../models';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';
import {productService} from '../../services';
import {IRequestExtended} from '../../models';

export const checkIsProductAddCartExistMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<any> => {
  const productByID = await productService.findByID(req.query.productID as string);
  console.log('checkIsProductAddCartExistMiddleware****************');
  // console.log(productByID);
  // console.log(req.body);
  const {count} = req.body;
  // console.log(count);
  if (!productByID) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_PRODUCT_UPDATE_NOT_FOUND.message,
      customErrors.BAD_REQUEST_PRODUCT_UPDATE_NOT_FOUND.code
    ));
  }
  if (productByID.stockCount < count) {
    // throw new Error(`Remaining products in stock: ${productByID.stockCount} ps`);
    return next(new Error(`Remaining products in stock: ${productByID.stockCount} ps`));

  }
  // else {
  //   console.log('77777777777777777777777777777777777777777777');
  //   console.log('productByID.stockCount');
  //   console.log(productByID.stockCount);
  //   console.log('count');
  //   console.log(count);
  //   productByID.stockCount = (productByID.stockCount - count);
  //   console.log('productByID.stockCount');
  //   console.log(productByID.stockCount);
  //   console.log('(productByID.stockCount - count)');
  //   console.log((productByID.stockCount - count));
  // }

  req.product = productByID;
  next();
};
