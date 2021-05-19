import {NextFunction, Response} from 'express';

import {IRequestExtended, ISubCategory} from '../../models';
import {ResponseStatusCodeEnum} from '../../constants';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';

export const checkIsExistSubCategoryMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  const subTitle = req.body.title as Partial<ISubCategory>;

  const subcategory = await categoryService.findSubCategoryByTitle(subTitle as string);

  if (subcategory) {
    return next(new ErrorHandler(
      ResponseStatusCodeEnum.BAD_REQUEST,
      customErrors.BAD_REQUEST_CREATE_SUB_CATEGORY.message,
      customErrors.BAD_REQUEST_CREATE_SUB_CATEGORY.code
    ));
  }

  next();
};
