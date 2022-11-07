import { Router } from 'express';
import UserRouter from './user/user.routes';
import BattleRouter from './battile/battle.routes';

const router = Router();

router.get('/', async (req, res, next) => {
    res.status(200).json({
        message: 'INDEX PAGE',
    });
});

router.use('/user', UserRouter);
router.use('/battle', BattleRouter);

export default router;
