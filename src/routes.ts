import { Router } from 'express';
import UserRouter from './user/user.routes';
import PageRouter from './page.routes';


const router = Router();

router.get('/test', async(req, res, next) => {
    res.status(200).json({
        message: 'INDEX PAGE',
    });
});

router.use('/user', UserRouter);
router.use('/', PageRouter);

export default router;
