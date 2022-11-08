import { Router } from 'express';
import UserRouter from './user/user.routes';
import PageRouter from './page.routes';
import BattleRouter from './battle/battle.routes';
import ItemRouter from './item/item.routes';
// import SkillRouter from './skill/skill.routes';
// import MonsterRouter from './monster/monster.routes';


const router = Router();

router.get('/test', async (req, res, next) => {
    console.log(req.ip);
    res.status(200).json({
        message: 'INDEX PAGE',
    });
});

router.use('/', PageRouter);

router.use('/user', UserRouter);
router.use('/battle', BattleRouter);
router.use('/items', ItemRouter);
// router.use('/skill', SkillRouter);
// router.use('/monster', MonsterRouter);


export default router;
