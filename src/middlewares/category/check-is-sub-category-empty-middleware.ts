import {NextFunction, Response} from 'express';

import {IRequestExtended} from '../../models';
import {ResponseStatusCodeEnum} from '../../constants';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

export const checkIsSubCategoryEmptyMiddleware = async (
  req: IRequestExtended,
  res: Response,
  next: NextFunction): Promise<void> => {
  const subcategory = await categoryService.getSubCategoryByParams({id: +req.params.cat_id});

  if (!subcategory) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message
    ));
  }

  if (subcategory.subSubCategories.length>0) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_SUB_CATEGORY_NOT_EMPTY.message,
      customErrors.BAD_REQUEST_SUB_CATEGORY_NOT_EMPTY.code
    ));
  }

  req.body = subcategory;
  next();
};
