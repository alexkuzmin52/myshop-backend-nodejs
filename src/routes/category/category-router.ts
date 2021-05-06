import {Router} from 'express';

import {categoryController} from '../../controllers';
import {
  checkAccessTokenMiddleware, checkIsCategoryEmptyMiddleware,
  checkIsExistCategoryMiddleware,
  checkIsExistSubCategoryMiddleware,
  checkIsExistSubSubCategoryMiddleware,
  CheckIsSubCategoryAlreadyAddedToCategoryMiddleware, checkIsSubCategoryEmptyMiddleware,
  CheckIsSubSubCategoryAlreadyAddedToSubCategoryMiddleware, checkIsSubSubCategoryEmptyMiddleware,
  createCategoryValidatorMiddleware,
  createSubCategoryValidatorMiddleware,
  createSubSubCategoryValidatorMiddleware
} from '../../middlewares';

import {uploadCategory} from '../../config/multer/category/category-multer-config';
import {uploadSubCategory} from '../../config/multer/category/subcategory-multer-config';
import {uploadSubSubCategory} from '../../config/multer/category/subsubcategory-multer-config';
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
  checkAccessTokenMiddleware,
  CheckIsSubCategoryAlreadyAddedToCategoryMiddleware,
  categoryController.addSubCategory
);

router.put('/addsubsubcategory',
  checkAccessTokenMiddleware,
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

router.get('/subcategory', categoryController.GetAllSubCategories);
router.get('/subsubcategory', categoryController.GetAllSubSubCategories);

router.get('/:cat_id', categoryController.GetCategory);
router.get('/subcategory/:cat_id', categoryController.GetSubCategory);
router.get('/subsubcategory/:cat_id', categoryController.GetSubSubCategory);
router.get('', categoryController.GetAllCategories);

router.get('/logo/:cat_id', categoryController.getLogo);
router.get('/subcategory/logo/:cat_id', categoryController.getSubLogo);
router.get('/subsubcategory/logo/:cat_id', categoryController.getSubSubLogo);

router.put('/:cat_id', checkAccessTokenMiddleware, categoryController.updateCategory);
router.put('/subcategory/:cat_id', checkAccessTokenMiddleware, categoryController.updateSubCategory);
router.put('/subsubcategory/:cat_id', checkAccessTokenMiddleware, categoryController.updateSubSubCategory);

router.delete('/:cat_id', checkAccessTokenMiddleware, checkIsCategoryEmptyMiddleware,
  categoryController.DeleteCategory);
router.delete('/subcategory/:cat_id', checkAccessTokenMiddleware, checkIsSubCategoryEmptyMiddleware,
  categoryController.deleteSubCategory);
router.delete('/subsubcategory/:cat_id', checkAccessTokenMiddleware, checkIsSubSubCategoryEmptyMiddleware,
  categoryController.deleteSubSubCategory);

export const categoryRouter = router;
