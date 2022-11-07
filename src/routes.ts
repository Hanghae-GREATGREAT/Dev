import { Router } from 'express';
import UserRouter from './user/user.routes';
import ItemRouter from './item/item.routes'


const router = Router();

router.get('/', async(req, res, next) => {
    res.status(200).json({
        message: 'INDEX PAGE',
    });
});

router.use('/user', UserRouter);
router.use('/items',ItemRouter)

export default router;
