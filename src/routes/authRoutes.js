import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailBodySchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const router = Router();

router.post('/register', celebrate(registerUserSchema), registerUser);
router.post('/login', celebrate(loginUserSchema), loginUser);
router.post('/refresh', refreshUserSession);
router.post('/logout', logoutUser);
router.post(
  '/request-reset-email',
  celebrate(requestResetEmailBodySchema),
  requestResetEmail,
);
router.post(
  '/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default router;
