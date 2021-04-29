import {NextFunction, Request, Response} from 'express';
// import {IProduct} from '../../models';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';
import {productService} from '../../services';

export const checkIsProductExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  // const {title} = req.body as IProduct;
  // console.log('req.query.productID');
  // console.log(req.query.productID);
  // const productByTitle = await productService.findOneByProperty({title});
  const productByID = await productService.findByID(req.query.productID as string);

  if (!productByID) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_PRODUCT_UPDATE_NOT_FOUND.message,
      customErrors.BAD_REQUEST_PRODUCT_UPDATE_NOT_FOUND.code
    ));
  }
  next();
};
