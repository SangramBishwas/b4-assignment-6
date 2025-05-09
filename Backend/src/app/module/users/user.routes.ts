import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../auth/auth.interface';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middleware/bodyParser';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from '../auth/auth.validation';


const router = Router();

router.get('/:id', auth(UserRole.USER), UserController.myProfile);

router.put(
  '/:id',
  auth(UserRole.USER),
  multerUpload.single('profileImage'),
  parseBody,
  validateRequest(AuthValidation.userUpdateValidationSchema),
  UserController.updateProfile,
);

router.delete('/:id',auth(UserRole.USER), UserController.deleteProfile);

export const UserRoutes = router;