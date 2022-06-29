import {Router} from 'express';

import {categoryController} from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkIsCategoryEmptyMiddleware,
  checkIsExistCategoryMiddleware,
  checkIsExistSubCategoryMiddleware,
  checkIsExistSubSubCategoryMiddleware,
  CheckIsSubCategoryAlreadyAddedToCategoryMiddleware,
  checkIsSubCategoryEmptyMiddleware,
  CheckIsSubSubCategoryAlreadyAddedToSubCategoryMiddleware,
  checkIsSubSubCategoryEmptyMiddleware,
  createCategoryValidatorMiddleware,
  createSubCategoryValidatorMiddleware,
  createSubSubCategoryValidatorMiddleware,
  uploadCategoryMiddleware,
  uploadSubCategoryMiddleware,
  uploadSubSubCategoryMiddleware
} from '../../middlewares';
import {uploadCategory, uploadCSV, uploadSubCategory, uploadSubSubCategory} from '../../config';

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
  CheckIsSubSubCategoryAlreadyAddedToSubCategoryMiddleware,
  categoryController.addSubSubCategory
);

router.post('/logo/:cat_id',
  checkAccessTokenMiddleware,
  uploadCategoryMiddleware,
  uploadCategory.single('file'),
  categoryController.updateCategory);
router.post('/subcategory/logo/:cat_id',
  checkAccessTokenMiddleware,
  uploadSubCategoryMiddleware,
  uploadSubCategory.single('file'),
  categoryController.updateSubCategory);
router.post('/subsubcategory/logo/:cat_id',
  checkAccessTokenMiddleware,
  uploadSubSubCategoryMiddleware,
  uploadSubSubCategory.single('file'),
  categoryController.updateSubSubCategory);

router.get('/subcategory', categoryController.GetAllSubCategories);
router.get('/subsubcategory', categoryController.GetAllSubSubCategories);

router.get('/:cat_id', categoryController.GetCategory);
router.get('/subcategory/:cat_id', categoryController.GetSubCategoriesFromCategory);
router.get('/subcategory/sub/:cat_id', categoryController.GetSubCategory);
router.get('/subsubcategory/:cat_id', categoryController.GetSubSubCategoriesFromSubCategory);
router.get('', categoryController.GetAllCategories);

router.get('/logo/:cat_id', uploadCategoryMiddleware, categoryController.getLogo);
router.get('/subcategory/logo/:cat_id', uploadSubCategoryMiddleware, categoryController.getSubLogo);
router.get('/subsubcategory/logo/:cat_id', uploadSubSubCategoryMiddleware,categoryController.getSubSubLogo);

router.put('/:cat_id', checkAccessTokenMiddleware, categoryController.updateCategory);
router.put('/subcategory/:cat_id', checkAccessTokenMiddleware, categoryController.updateSubCategory);
router.put('/subsubcategory/:cat_id', checkAccessTokenMiddleware, categoryController.updateSubSubCategory);

//TODO check is product link exist
router.delete('/:cat_id', checkAccessTokenMiddleware, checkIsCategoryEmptyMiddleware,
  categoryController.DeleteCategory);
router.delete('/subcategory/:cat_id', checkAccessTokenMiddleware, checkIsSubCategoryEmptyMiddleware,
  categoryController.deleteSubCategory);
router.delete('/subsubcategory/:cat_id', checkAccessTokenMiddleware, checkIsSubSubCategoryEmptyMiddleware,
  categoryController.deleteSubSubCategory);

router.post('/csv', uploadCSV.single('csv_file'), categoryController.createCategoriesFromCSV);
router.post('/csv/ext', uploadCSV.single('csv_file'), categoryController.createCategoriesFromCSVExt);
router.post('/subcategory/csv', uploadCSV.single('csv_file'), categoryController.createSubCategoriesFromCSV);
router.post('/subsubcategory/csv', uploadCSV.single('csv_file'), categoryController.createSubSubCategoriesFromCSV);

export const categoryRouter = router;
