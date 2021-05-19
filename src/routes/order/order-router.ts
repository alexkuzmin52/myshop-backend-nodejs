import {Router} from 'express';

import {orderController} from '../../controllers';
import {
  checkAccessTokenMiddleware,
  CheckIsEnoughProductsInStock,
  CheckIsOrderWithStatusRegisteredExistMiddleware,
  checkIsUserCartExistMiddleware,
  CheckIsUserOrderExistMiddleware,
  ConfirmOrderValidatorMiddleware
} from '../../middlewares';

const router = Router();

router.get('',
  checkAccessTokenMiddleware,
  checkIsUserCartExistMiddleware,
  CheckIsOrderWithStatusRegisteredExistMiddleware,
  CheckIsEnoughProductsInStock,
  orderController.getUserOrder);

router.put('/confirm',
  checkAccessTokenMiddleware,
  ConfirmOrderValidatorMiddleware,
  checkIsUserCartExistMiddleware,
  CheckIsOrderWithStatusRegisteredExistMiddleware,
  CheckIsEnoughProductsInStock,
  orderController.confirmOrder);

router.delete('/delete',
  checkAccessTokenMiddleware,
  CheckIsUserOrderExistMiddleware,
  orderController.removeUserOrder);

export const orderRouter = router;
