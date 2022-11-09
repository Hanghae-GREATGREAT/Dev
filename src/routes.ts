import { Router } from 'express';
import UserRouter from './user/user.routes';
import PageRouter from './page.routes';
import BattleRouter from './battle/battle.routes';
import ItemRouter from './item/item.routes';
import SkillRouter from './skill/skill.routes';
// import MonsterRouter from './monster/monster.routes';


const router = Router();

import { Characters } from './db/models';
// import CharacterService from './character/character.service'
router.get('/test', async (req, res, next) => {
    const result = await Characters.refreshStatus(1, 10, 10)
    // const result = await Characters.addExp(1, 10)
    
    res.status(200).json({
        message: 'INDEX PAGE',
        result: result,
    });
});

router.use('/', PageRouter);

router.use('/user', UserRouter);
router.use('/battle', BattleRouter);
router.use('/items', ItemRouter);
router.use('/skills', SkillRouter);
// router.use('/monster', MonsterRouter);


export default router;
