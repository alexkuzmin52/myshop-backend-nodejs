import {Router} from 'express';

import {productController} from '../../controllers';
import {checkAccessTokenMiddleware,
  checkIsProductAlreadyExistMiddleware,
  checkIsProductExistMiddleware,
  createProductValidatorMiddleware} from '../../middlewares';
import {uploadCSVProduct, uploadProduct} from '../../config';

const router = Router();

router.get('/filter', productController.getProductsByFilter);
router.get('/:productID', productController.getProduct);
router.get('/', productController.getProducts);

router.post('',
  checkAccessTokenMiddleware,
  createProductValidatorMiddleware,
  checkIsProductAlreadyExistMiddleware,
  productController.createProduct);

router.post('/csv', uploadCSVProduct.single('csv_file'), productController.createProductFromCSV);

router.put('/:productID',
  checkAccessTokenMiddleware,
  createProductValidatorMiddleware,
  checkIsProductExistMiddleware,
  productController.updateProduct);

router.delete('/:productID',
  checkAccessTokenMiddleware,
  checkIsProductExistMiddleware,
  productController.deleteProduct);

router.post('/addPhoto/:productID',
  checkAccessTokenMiddleware,
  checkIsProductExistMiddleware,
  uploadProduct.single('photo'),
  productController.addProductSinglePhoto);

//TODO
// router.post('/addPhotos/:productID',
//   checkAccessTokenMiddleware,
//   checkIsProductExistMiddleware,
//   uploadProduct.array('photos', 10),
//   productController.addProductSinglePhoto)

export const productRouter = router;
