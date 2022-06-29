import {Router} from 'express';

import {userController} from '../../controllers';
import {
  checkAccessTokenMiddleware,
  checkIsEmailAlreadyExistMiddleware, checkIsUserExistMiddleware,
  confirmUserMiddleware,
  createUserMiddleware,
  emailValidatorMiddleware, forgotUserMiddleware, passwordValidatorMiddleware
} from '../../middlewares';
import {uploadUser} from '../../config';

const router = Router();

router.get('/filter', userController.getUsersByFilter);
router.get('', userController.getUsers);
router.get('/:userID', userController.getUser);
router.get('/photo/:userID/:userPhoto', userController.getUserPhoto);

router.post('/update/:userID', checkAccessTokenMiddleware, userController.updateUser);

router.post('/', createUserMiddleware, checkIsEmailAlreadyExistMiddleware, userController.createUser);
router.post('/photo', checkAccessTokenMiddleware, uploadUser.single('photo'), userController.addUserPhoto);
router.post('/confirm', confirmUserMiddleware, userController.confirmUser);
router.post('/password/forgot', emailValidatorMiddleware, checkIsUserExistMiddleware, userController.forgotPassword);
router.post('/password/reset', passwordValidatorMiddleware, forgotUserMiddleware, userController.resetPassword);

export const userRouter = router;
