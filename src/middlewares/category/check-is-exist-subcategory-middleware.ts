import {NextFunction, Response} from 'express';

import {IRequestExtended, ISubCategory} from '../../models';
import {categoryService} from '../../services';
import {customErrors, ErrorHandler} from '../../errors';
import {ResponseStatusCodeEnum} from '../../constants';

export const checkIsExistSubCategoryMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
  // cange=============================================================================
  // const subTitle = req.body.sub_title as Partial<ISubCategory>;
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
