import {Router} from 'express';
import {productController} from '../../controllers';
import {checkAccessTokenMiddleware, checkIsProductExistMiddleware, createProductValidatorMiddleware} from '../../middlewares';
import {checkIsProductAlreadyExistMiddleware} from '../../middlewares';
import {uploadProduct} from '../../config/multer/product/product-multer-config';

const router = Router();

router.get('/:productID', productController.getProduct);
router.get('/', productController.getProducts);

router.post('',
  checkAccessTokenMiddleware,
  createProductValidatorMiddleware,
  checkIsProductAlreadyExistMiddleware,
  productController.createProduct);

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

// router.post('/addPhotos/:productID',
//   checkAccessTokenMiddleware,
//   checkIsProductExistMiddleware,
//   uploadProduct.array('photos', 10),
//   productController.addProductSinglePhoto)

export const productRouter = router;
