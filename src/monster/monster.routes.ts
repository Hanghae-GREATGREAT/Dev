import { Router } from 'express';
import MonsterController from './monster.controller';

const router = Router();

router.get('/', MonsterController.findMonster);
router.post('/input', MonsterController.inputMonsters);

export default router;
