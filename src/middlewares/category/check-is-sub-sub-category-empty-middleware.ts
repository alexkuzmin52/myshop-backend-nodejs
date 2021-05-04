import {NextFunction, Response} from 'express';

import {IRequestExtended} from '../../models';
import {ResponseStatusCodeEnum} from '../../constants';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

export const checkIsSubSubCategoryEmptyMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {

  const subsubcategory = await categoryService.getSubSubCategoryByParams({id: +req.params.cat_id});

  if (!subsubcategory) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message
    ));
  }
  //TODO
  // const subSubCategory = await categoryService.getSubSubCategoryByParams({parentID: subcategory.id});
  // if (subSubCategory) {
  //   return next(new ErrorHandler(
  //     ResponseStatusCodeEnum.BAD_REQUEST,
  //     customErrors.BAD_REQUEST_SUB_CATEGORY_NOT_EMPTY.message,
  //     customErrors.BAD_REQUEST_CATEGORY_NOT_EMPTY.code
  //   ));
  // }
  req.body = subsubcategory;
  next();
};
