import {NextFunction, Response} from 'express';

import {IRequestExtended} from '../../models';
import {ResponseStatusCodeEnum} from '../../constants';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

export const uploadSubSubCategoryMiddleware = async (
  req: IRequestExtended,
  res: Response,
  next: NextFunction): Promise<void> => {
  console.log(req.params.cat_id);
  const subSubCategoryByID = await categoryService.getSubSubCategoryByParams({id: +req.params.cat_id});

  if (!subSubCategoryByID) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_CATEGORY_UPDATE_NOT_FOUND.message
    ));
  }
  req.subsubcategory = subSubCategoryByID;
  next();

};
