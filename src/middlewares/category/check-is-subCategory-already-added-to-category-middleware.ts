import {IRequestExtended, ISubCategory} from '../../models';
import {NextFunction, Response} from 'express';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

export const CheckIsSubCategoryAlreadyAddedToCategoryMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction) => {
  const {id} = req.body as Partial<ISubCategory>;
  console.log(id);
  const subCategory = await categoryService.getSubCategoryByParams({id});
  if (subCategory && subCategory.parentID > 0) {
    return next(new ErrorHandler(ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_SUB_CATEGORY_TO_CATEGORY_ALREADY_ADDED.message));
  }
  if (!subCategory) {
    return next(new ErrorHandler(ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message));

  }
  req.subcategory = subCategory;
  next();
};
