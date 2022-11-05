import { Router } from 'express';
import userRouter from './user';
import postRouter from './post';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);

export default router;
