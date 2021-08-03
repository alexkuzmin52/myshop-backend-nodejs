import {NextFunction, Response} from 'express';

import {ICategory, IRequestExtended} from '../../models';
import {ResponseStatusCodeEnum} from '../../constants';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

export const checkIsCategoryEmptyMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  const category = req.body as ICategory;
  const existCategory = await categoryService.getCategoryByParams({id: category.id});
  if (!existCategory) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message
    ));
  }

  req.body = category;
  next();
};
