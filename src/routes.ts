import { Router } from 'express';

import UserRouter from './user/user.routes';


const router = Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'INDEX PAGE',
    });
});

router.use('/user', UserRouter);


export default router;