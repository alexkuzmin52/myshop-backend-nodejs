import {Router} from 'express';

import {
  addProductToCartMiddleware,
  addProductToCartValidatorMiddleware,
  checkAccessTokenMiddleware,
  checkIsUserCartExistMiddleware
} from '../../middlewares';
import {cartController} from '../../controllers';

const router = Router();

router.get('',
  checkAccessTokenMiddleware,
  checkIsUserCartExistMiddleware,
  cartController.getPopulatedUserCart);

router.get('/addProduct/:productID',
  checkAccessTokenMiddleware, //TODO
  // CheckIsValidObjectIdMiddleware,
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
