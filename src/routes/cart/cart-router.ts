import {Router} from 'express';
import {
  // addProductToCartValidatorMiddleware,
  addProductToCartMiddleware,
  addProductToCartValidatorMiddleware,
  checkAccessTokenMiddleware,
  checkIsUserCartExistMiddleware
} from '../../middlewares';
import {cartController} from '../../controllers';
import {CheckIsValidObjectIdMiddleware} from '../../middlewares/check-is-valid-object-id-middleware';

const router = Router();

router.get('',
  checkAccessTokenMiddleware,
  checkIsUserCartExistMiddleware,
  cartController.getPopulatedUserCart);

router.get('/addProduct/:productID',
  checkAccessTokenMiddleware,
  CheckIsValidObjectIdMiddleware,
  addProductToCartMiddleware,
  checkIsUserCartExistMiddleware,
  cartController.addProductToCart);

router.delete('/deleteProduct/:productID',
  checkAccessTokenMiddleware,
  checkIsUserCartExistMiddleware,
  cartController.deleteProductInCart);

router.put('/updateProduct/:productID',
  checkAccessTokenMiddleware,
  addProductToCartValidatorMiddleware,
  checkIsUserCartExistMiddleware,
  cartController.changeCountProductInCart);

export const cartRouter = router;
