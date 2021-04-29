import {Router} from 'express';

import {testCategoryController} from '../../controllers';
import {
  checkIsExistCategoryMiddleware,
  checkIsExistSubCategoryMiddleware,
  checkIsExistSubSubCategoryMiddleware,
  createCategoryValidatorMiddleware,
  createSubCategoryValidatorMiddleware,
  createSubSubCategoryValidatorMiddleware
} from '../../middlewares';

// import {uploadCategory} from '../../config/category-multer-config';
// import {uploadSubCategory} from '../../config/subcategory-multer-config';
// import {uploadSubSubCategory} from '../../config/subsubcategory-multer-config';

const router = Router();
router.post('/',
  createCategoryValidatorMiddleware,
  checkIsExistCategoryMiddleware,
  testCategoryController.testCreateCategory
);

router.post('/subCategory',
  createSubCategoryValidatorMiddleware,
  checkIsExistSubCategoryMiddleware,
  testCategoryController.testCreateSubCategory
);

router.post('/subSubCategory',
  createSubSubCategoryValidatorMiddleware,
  checkIsExistSubSubCategoryMiddleware,
  testCategoryController.testCreateSubSubCategory);

router.put('/addSubToCat',
  testCategoryController.addSubToCat);

router.put('/addSubSubToSub',
  testCategoryController.addSubSubToSub);

// router.post('/logo/:cat_id',
//   uploadCategory.single('file'),
//   testCategoryController.updateCategory);
// router.post('/subcategory/logo/:cat_id',
//   uploadSubCategory.single('file'),
//   testCategoryController.updateSubCategory);
// router.post('/subsubcategory/logo/:cat_id',
//   uploadSubSubCategory.single('file'),
//   testCategoryController.updateSubSubCategory);
//
// router.get('/subcategory',testCategoryController.GetAllSubCategories);
// router.get('/subsubcategory',testCategoryController.GetAllSubSubCategories);
//
// router.get('/:title',testCategoryController.GetCategory);
// router.get('/subcategory/:title',testCategoryController.GetSubCategory);
// router.get('/subsubcategory/:title',testCategoryController.GetSubSubCategory);
// router.get('',testCategoryController.GetAllCategories);
//
// router.get('/logo/:cat_id', testCategoryController.getLogo);
// router.get('/subcategory/logo/:cat_id', testCategoryController.getSubLogo);
// router.get('/subsubcategory/logo/:cat_id', testCategoryController.getSubSubLogo);
//
// router.put('/:cat_id', testCategoryController.updateCategory);
// router.put('/subcategory/:cat_id', testCategoryController.updateSubCategory);
// router.put('/subsubcategory/:cat_id', testCategoryController.updateSubSubCategory);
//
// router.delete('/', testCategoryController.DeleteCategory);
// router.delete('/subcategory', testCategoryController.deleteSubCategory);
// router.delete('/subsubcategory', testCategoryController.deleteSubSubCategory);

export const testCategoryRouter = router;
