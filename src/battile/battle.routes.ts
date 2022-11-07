import express from 'express';
import BattleController from './battle.controller';
import Auth from '../middlewares/auth';
// Shortcut middleware import

const router = express.Router();

// 던전 입구(선택)
router.get('/dungeon', BattleController.dungeonSelect);
// N레벨 던전 입장
router.get('/dungeon/enter/', BattleController.dungeonInfo);

// 던전 진행
router.get('/dungeon/proceed', BattleController.dungeonProceed);

// 전투
router.get('/dungeon/fight', BattleController.fight);

// 보너스
router.get('/dungeon/bonus', BattleController.bonus);

// 후순위 구현 예정
router.get('/challenge', BattleController.challengeInfo);
router.get('/challenge/survival', BattleController.survivalInfo);
router.get('/challenge/bossraid', BattleController.bossraidInfo);

export default router;
