import express from 'express';
import BattleController from './controller';
// Shortcut middleware import

const router = express.Router();

// 던전 입구
router.get('/dungeon', BattleController.dungeonInfo);

// 선택
router.get('/dungeon/action', BattleController.select);

// 전투
router.get('/dungeon/fight', BattleController.fight);

// 보너스
router.get('/dungeon/bonus', BattleController.bonus);

// 후순위 구현 예정
router.get('/challenge', BattleController.challengeInfo);
router.get('/challenge/survival', BattleController.survivalInfo);
router.get('/challenge/bossraid', BattleController.bossraidInfo);

export default router;
