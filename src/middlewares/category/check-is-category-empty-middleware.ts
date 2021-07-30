import {NextFunction, Response} from 'express';

import {ICategory, IRequestExtended} from '../../models';
import {ResponseStatusCodeEnum} from '../../constants';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

export const checkIsCategoryEmptyMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  console.log(req.body);
  const category = req.body as ICategory;
  // const category = await categoryService.getCategoryByParams({id: +req.params.cat_id});
  const existCategory = await categoryService.getCategoryByParams({id: category.id});
  if (!existCategory) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.NOT_FOUND,
      customErrors.NOT_FOUND.message
    ));
  }

  // if (category.subCategories.length > 0) {
  //   return next(new ErrorHandler(
  //     ResponseStatusCodeEnum.BAD_REQUEST,
  //     customErrors.BAD_REQUEST_CATEGORY_NOT_EMPTY.message,
  //     customErrors.BAD_REQUEST_CATEGORY_NOT_EMPTY.code
  //   ));
  // }

  req.body = category;
  next();
};
