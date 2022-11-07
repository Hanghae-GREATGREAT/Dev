import { Router } from 'express';
import UserRouter from './user/user.routes';
import PageRouter from './page.routes';
import ItemRouter from './item/item.routes';

const router = Router();

router.get('/test', async (req, res, next) => {
    console.log(req.ip);
    res.status(200).json({
        message: 'INDEX PAGE',
    });
});

router.use('/user', UserRouter);
router.use('/', PageRouter);
router.use('/items',ItemRouter)
// router.get('/items', async (req, res, next) => {
//     console.log(req.ip);
//     res.status(200).json({
//         message: '이건되나용'
//     });
// });

export default router;
