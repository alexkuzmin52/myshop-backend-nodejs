import {IRequestExtended, ISubSubCategory} from '../../models';
import {NextFunction, Response} from 'express';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

export const CheckIsSubSubCategoryAlreadyAddedToSubCategoryMiddleware = async (
  req: IRequestExtended, res: Response, next: NextFunction) => {
  const {id} = req.body as Partial<ISubSubCategory>;
  const subSubCategory = await categoryService.getSubSubCategoryByParams({id});

  if (subSubCategory && subSubCategory.parentID > 0) {
    return next(new ErrorHandler(ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_SUB_SUB_CATEGORY_TO_SUB_CATEGORY_ALREADY_ADDED.message));
  }
  if (!subSubCategory) {
    return next(new ErrorHandler(ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message));

  }
  req.subsubcategory = subSubCategory;
  next();
};
