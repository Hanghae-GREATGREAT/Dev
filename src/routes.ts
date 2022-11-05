import { Router } from 'express';

import UserRouter from './user/user.routes';


const router = Router();

router.use('/user', UserRouter);


export default router;