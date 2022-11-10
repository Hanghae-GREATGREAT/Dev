import express from 'express';
import BattleController from './battle.controller';
import AuthMiddleware from '../middlewares/auth';
const Auth = AuthMiddleware.authMiddleware;
// Shortcut middleware import

const router = express.Router();

//DevOnlyDevOnly User 정보 확인 TEST용 Test DevOnlyDevOnly
router.get('/test', Auth, BattleController.test);

// 던전 입구(던전 선택)
router.get('/dungeon', Auth, BattleController.getDungeonList);

// 던전 내부 선택지(자동/수동)
router.post('/dungeon/enter', Auth, BattleController.dungeonInfo);

// 던전 진행(던전 상세정보 및 진행)
router.get('/dungeon/proceed', Auth, BattleController.dungeonProceed);

// 전투 로직
router.post('/dungeon/fight', Auth, BattleController.fight);
// 전투 결과
router.get('/dungeon/fight/action', Auth, BattleController.fightResult);

// 던전 자동 진행 (미구현)
router.get('/dungeon/auto', Auth, BattleController.dungeonProceed);

// 후순위 구현 예정
router.get('/challenge', Auth, BattleController.challengeInfo);
router.get('/challenge/survival', Auth, BattleController.survivalInfo);
router.get('/challenge/bossraid', Auth, BattleController.bossraidInfo);

export default router;
