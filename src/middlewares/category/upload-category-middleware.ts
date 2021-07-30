import {IRequestExtended} from '../../models';
import {NextFunction, Response} from 'express';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

export const uploadCategoryMiddleware = async (
  req: IRequestExtended,
  res: Response,
  next: NextFunction): Promise<void> => {
  const categoryByID = await categoryService.getCategoryByParams({id: +req.params.cat_id});
  if (!categoryByID) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_CATEGORY_UPDATE_NOT_FOUND.message
      // customErrors.BAD_REQUEST_PRODUCT_UPDATE_NOT_FOUND.code
    ));
  }
  req.category = categoryByID;
  next();

};
