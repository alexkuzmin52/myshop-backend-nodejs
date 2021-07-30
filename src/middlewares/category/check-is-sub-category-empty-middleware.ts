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
  // const subcategory = await categoryService.getSubCategoryByParams({id: +req.params.cat_id});
  const subcategory = await categoryService.getSubCategoryByParams({id:subCategory.id});
  console.log(' console.log(subcategory);');
  console.log(subcategory);
  console.log(Boolean(!subcategory));
  console.log(Boolean(subcategory));
  if (!subcategory) {
    console.log('---------------------- !subcategory');

    return next(new ErrorHandler(
      ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message
    ));
  }

  // if (subcategory.subSubCategories.length>0) {
  //   return next(new ErrorHandler(
  //     ResponseStatusCodeEnum.BAD_REQUEST,
  //     customErrors.BAD_REQUEST_SUB_CATEGORY_NOT_EMPTY.message,
  //     customErrors.BAD_REQUEST_SUB_CATEGORY_NOT_EMPTY.code
  //   ));
  // }

  req.body = subcategory;
  next();
};
