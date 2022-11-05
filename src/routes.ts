import { Router } from 'express';
import BattleRouter from './battile/route';

const router = Router();

router.use('/battle', BattleRouter);

export default router;
