import {Router} from 'express';

import {categoryController} from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkIsExistCategoryMiddleware,
  checkIsExistSubCategoryMiddleware,
  checkIsExistSubSubCategoryMiddleware,
  CheckIsSubCategoryAlreadyAddedToCategoryMiddleware,
  CheckIsSubSubCategoryAlreadyAddedToSubCategoryMiddleware,
  createCategoryValidatorMiddleware,
  createSubCategoryValidatorMiddleware,
  createSubSubCategoryValidatorMiddleware
} from '../../middlewares';

import {uploadCategory} from '../../config/category-multer-config';
import {uploadSubCategory} from '../../config/subcategory-multer-config';
import {uploadSubSubCategory} from '../../config/subsubcategory-multer-config';
// import {checkIsNotExistCategoryMiddleware} from "../../middlewares/category/check-is-not-exist-category-middleware";

const router = Router();

router.post('/',
  checkAccessTokenMiddleware,
  createCategoryValidatorMiddleware,
  checkIsExistCategoryMiddleware,
  categoryController.createCategory
);

router.post('/subcategory',
  checkAccessTokenMiddleware,
  createSubCategoryValidatorMiddleware,
  checkIsExistSubCategoryMiddleware,
  categoryController.createSubCategory
);

router.post('/subsubcategory',
  checkAccessTokenMiddleware,
  createSubSubCategoryValidatorMiddleware,
  checkIsExistSubSubCategoryMiddleware,
  categoryController.createSubSubCategory);

router.put('/addsubcategory',
  CheckIsSubCategoryAlreadyAddedToCategoryMiddleware,
  categoryController.addSubCategory
);

router.put('/addsubsubcategory',
  checkAccessTokenMiddleware,
  CheckIsSubSubCategoryAlreadyAddedToSubCategoryMiddleware,
  categoryController.addSubSubCategory
);

router.post('/logo/:cat_id',
  uploadCategory.single('file'),
  categoryController.updateCategory);
router.post('/subcategory/logo/:cat_id',
  uploadSubCategory.single('file'),
  categoryController.updateSubCategory);
router.post('/subsubcategory/logo/:cat_id',
  uploadSubSubCategory.single('file'),
  categoryController.updateSubSubCategory);

router.get('/subcategory',categoryController.GetAllSubCategories);
router.get('/subsubcategory',categoryController.GetAllSubSubCategories);

router.get('/:title',categoryController.GetCategory);
router.get('/subcategory/:title',categoryController.GetSubCategory);
router.get('/subsubcategory/:title',categoryController.GetSubSubCategory);
router.get('',categoryController.GetAllCategories);

router.get('/logo/:cat_id', categoryController.getLogo);
router.get('/subcategory/logo/:cat_id', categoryController.getSubLogo);
router.get('/subsubcategory/logo/:cat_id', categoryController.getSubSubLogo);

router.put('/:cat_id', checkAccessTokenMiddleware, categoryController.updateCategory);
router.put('/subcategory/:cat_id',checkAccessTokenMiddleware, categoryController.updateSubCategory);
router.put('/subsubcategory/:cat_id', categoryController.updateSubSubCategory);

router.delete('/', categoryController.DeleteCategory);
router.delete('/subcategory', categoryController.deleteSubCategory);
router.delete('/subsubcategory', categoryController.deleteSubSubCategory);

export const categoryRouter = router;
