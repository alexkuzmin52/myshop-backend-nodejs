import {NextFunction, Response} from 'express';

import {IRequestExtended} from '../../models';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

export const checkIsCategoryEmptyMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {

  const category = await categoryService.getCategoryByParams({id: +req.params.cat_id});
  if (!category) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message
    ));
  }

  if (category.subCategories.length > 0) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_CATEGORY_NOT_EMPTY.message,
      customErrors.BAD_REQUEST_CATEGORY_NOT_EMPTY.code
    ));
  }

  req.body = category;
  next();
};
