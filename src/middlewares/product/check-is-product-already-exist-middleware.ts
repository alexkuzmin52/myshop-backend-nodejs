import {NextFunction, Response} from 'express';
import {IProduct, IRequestExtended} from '../../models';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';
import {productService} from '../../services';

export const checkIsProductAlreadyExistMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<any> => {
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
