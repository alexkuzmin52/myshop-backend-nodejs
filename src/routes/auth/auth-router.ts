import {Router} from 'express';

import {
  checkAccessTokenMiddleware,
  checkIsUserConfirmMiddleware,
  checkIsUserExistMiddleware,
  emailAndPasswordValidatorMiddleware
} from '../../middlewares';
import {authController} from '../../controllers';

const router = Router();

router.post('/login',
  emailAndPasswordValidatorMiddleware,
  checkIsUserExistMiddleware,
  checkIsUserConfirmMiddleware,
  authController.loginUser
);
router.post('/logout',
  checkAccessTokenMiddleware,
  authController.userLogout
);

export const authRouter = router;
