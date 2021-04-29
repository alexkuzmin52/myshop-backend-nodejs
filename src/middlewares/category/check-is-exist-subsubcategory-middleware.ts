import {NextFunction, Response} from 'express';

import {IRequestExtended} from '../../models';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

export const checkIsExistSubSubCategoryMiddleware = async (
  req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  const subsubTitle = req.body.title;
  const subSubcategory = await categoryService.findSubSubCategoryByTitle(subsubTitle as string);
  if (subSubcategory) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_CREATE_SUB_SUB_CATEGORY.message,
      customErrors.BAD_REQUEST_CREATE_SUB_SUB_CATEGORY.code));
  }
  next();
};
