import {Router} from 'express';
import {productController} from '../../controllers';
import {checkAccessTokenMiddleware, checkIsProductExistMiddleware, createProductMiddleware} from '../../middlewares';
import {checkIsProductAlreadyExistMiddleware} from '../../middlewares';

const router = Router();

router.get('/:productID', productController.getProduct);
router.get('/', productController.getProducts);
router.post('',checkAccessTokenMiddleware, checkIsProductAlreadyExistMiddleware, createProductMiddleware,
  productController.createProduct);
router.put('/:productID',checkAccessTokenMiddleware, checkIsProductExistMiddleware, createProductMiddleware,
  productController.updateProduct);
router.delete('/:productID',checkAccessTokenMiddleware, checkIsProductExistMiddleware, productController.deleteProduct);

export const productRouter = router;
