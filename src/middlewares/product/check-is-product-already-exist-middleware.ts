import {NextFunction, Request, Response} from 'express';
import {IProduct} from '../../models';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';
import {productService} from '../../services';

export const checkIsProductAlreadyExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const {title} = req.body as IProduct;
  const productByTitle = await productService.findOneByProperty({title});

  if (productByTitle) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_PRODUCT_TITLE.message,
      customErrors.BAD_REQUEST_PRODUCT_TITLE.code
    ));
  }
  next();
};
