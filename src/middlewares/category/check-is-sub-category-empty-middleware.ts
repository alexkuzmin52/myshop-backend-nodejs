import {NextFunction, Response} from 'express';

import {IRequestExtended, ISubCategory} from '../../models';
import {ResponseStatusCodeEnum} from '../../constants';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

export const checkIsSubCategoryEmptyMiddleware = async (
  req: IRequestExtended,
  res: Response,
  next: NextFunction): Promise<void> => {
  const subCategory =req.body as ISubCategory;
  const subcategory = await categoryService.getSubCategoryByParams({id:subCategory.id});

  if (!subcategory) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message
    ));
  }

  req.body = subcategory;
  next();
};
