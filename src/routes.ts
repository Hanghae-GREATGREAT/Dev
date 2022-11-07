import { Router } from 'express';
import UserRouter from './user/user.routes';
import PageRouter from './page.routes';
import BattleRouter from './battile/battle.routes';

const router = Router();

router.get('/test', async (req, res, next) => {
    console.log(req.ip);
    res.status(200).json({
        message: 'INDEX PAGE',
    });
});

router.use('/user', UserRouter);
router.use('/battle', BattleRouter);
router.use('/', PageRouter);

export default router;
