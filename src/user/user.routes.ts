import { Router } from 'express';
import UserController from './user.controller';


const router = Router();

router.post('/signup', UserController.signup);

router.post('/signin', UserController.signin);

router.get('/signout', UserController.signout);


export default router;