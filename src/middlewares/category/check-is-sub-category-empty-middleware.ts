import {NextFunction, Response} from 'express';

import {IRequestExtended} from '../../models';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

export const checkIsSubCategoryEmptyMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {

  const subcategory = await categoryService.getSubCategoryByParams({id: +req.params.cat_id});
  // req.params.cat_id
  if (!subcategory) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message
    ));
  }

  const subSubCategory = await categoryService.getSubSubCategoryByParams({parentID: subcategory.id});
  if (subSubCategory) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_SUB_CATEGORY_NOT_EMPTY.message,
      customErrors.BAD_REQUEST_CATEGORY_NOT_EMPTY.code
    ));
  }
  req.body = subcategory;
  next();
};
