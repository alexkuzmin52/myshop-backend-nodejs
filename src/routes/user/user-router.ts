import {Router} from 'express';

import {userController} from '../../controllers';
import {
  checkIsEmailAlreadyExistMiddleware, checkIsUserExistMiddleware,
  confirmUserMiddleware,
  createUserMiddleware,
  emailValidatorMiddleware, forgotUserMiddleware, passwordValidatorMiddleware
} from '../../middlewares';
import {upload} from '../../config'; //TODO uploadUser?

const router = Router();

router.post('/',upload.single('photo'), createUserMiddleware, checkIsEmailAlreadyExistMiddleware, userController.createUser);
router.post('/confirm', confirmUserMiddleware, userController.confirmUser);
router.post('/password/forgot', emailValidatorMiddleware, checkIsUserExistMiddleware, userController.forgotPassword);
router.post('/password/reset', passwordValidatorMiddleware, forgotUserMiddleware, userController.resetPassword);

export const userRouter = router;
