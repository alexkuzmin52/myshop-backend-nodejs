// import {NextFunction, Response} from 'express';
//
// import {ICategory, IRequestExtended} from '../../models';
// import {categoryService} from '../../services';
// import {customErrors, ErrorHandler} from '../../errors';
// import {ResponseStatusCodeEnum} from '../../constants';

// export const checkIsExistCategoryMiddleware = async (req: IRequestExtended, res: Response, next: NextFunction): Promise<void> => {
//   const {title} = req.body as Partial<ICategory>;
//   const category = await categoryService.findCategoryByTitle(title as string);
//
//   if (category) {
//     return next(new ErrorHandler(
//       ResponseStatusCodeEnum.BAD_REQUEST,
//       customErrors.BAD_REQUEST_CREATE_CATEGORY.message,
//       customErrors.BAD_REQUEST_CREATE_CATEGORY.code));
//   }
//
//   next();
// };
//TODO
