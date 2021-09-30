import {Router} from 'express';

import {productController} from '../../controllers';
import {
  AddReviewValidatorMiddleware, checkAccessTokenMiddleware,
  checkIsProductAlreadyExistMiddleware,
  checkIsProductExistMiddleware,
  createProductValidatorMiddleware
} from '../../middlewares';
import {uploadCSVProduct, uploadProduct} from '../../config';

const router = Router();

router.get('/filter', productController.getProductsByFilter);
router.get('/categories', productController.getCategoriesWithProducts);
router.get('/property', productController.getAllPropertiesOfProducts);

router.get('/:productID', productController.getProduct);
router.get('/csv/file', productController.getCsvFile);
router.get('/', productController.getProducts);
router.get('/review/:productID', productController.getProductReviews);

router.post('',
  checkAccessTokenMiddleware,
  createProductValidatorMiddleware,
  checkIsProductAlreadyExistMiddleware,
  productController.createProduct);

router.post('/csv',
  uploadCSVProduct.single('csv_file'),
  checkAccessTokenMiddleware,
  productController.createProductFromCSV);

router.put('/:productID',
  checkAccessTokenMiddleware,
  createProductValidatorMiddleware,
  checkIsProductExistMiddleware,
  productController.updateProduct);

router.put('/review/:productID',
  checkAccessTokenMiddleware,
  AddReviewValidatorMiddleware,
  checkIsProductExistMiddleware,
  productController.addProductReview);

router.delete('/:productID',
  checkAccessTokenMiddleware,
  checkIsProductExistMiddleware,
  productController.deleteProduct);

router.delete('/review/:productID/:commentID',
  checkAccessTokenMiddleware,
  checkIsProductExistMiddleware,
  productController.deleteComment);

router.delete('/reviews/:userID',
  checkAccessTokenMiddleware,
  productController.deleteUserComments);

router.delete('/photo/:productID/:photoTitle',
  checkAccessTokenMiddleware,
  checkIsProductExistMiddleware,
  productController.deletePhotoProduct);

router.post('/addPhoto/:productID',
  checkAccessTokenMiddleware,
  checkIsProductExistMiddleware,
  uploadProduct.single('photo'),
  productController.addProductSinglePhoto);

/********************************multer array files*****************************************/
router.post('/photos/:productID',
  // checkAccessTokenMiddleware,
  checkIsProductExistMiddleware,
  uploadProduct.array('photos', 6),
  productController.addProductMultiPhoto);

/********************************get multiply files with productPhotos************************/
// router.get('/photos/:productID', productController.getProductPhotos);
router.get('/photo/:productID/:photoTitle',
  checkIsProductExistMiddleware,
  productController.getProductPhoto);

export const productRouter = router;
