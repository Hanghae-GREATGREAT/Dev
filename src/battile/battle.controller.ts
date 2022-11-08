import BattileService from './battle.service';
import { NextFunction, request, Request, Response } from 'express';
import { InputForm } from '../interfaces/dungeon';
import MonsterService from '../monster/monster.service';
import { HttpException, HttpStatus } from '../common';
import { number } from 'joi';
import battleService from './battle.service';

export default {
    test: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user } = await req.app.locals;

            /**
             * userId : 101,
             * characterId : 100,
             * questId : 1,
             * inventory : '',
             */

            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    /** 던전 리스트 요청 */
    getDungeonList: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await BattileService.getDungeonList();

            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    },

    /** 던전선택 요청 */
    dungeonInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 사용자 던전 선택값
            const { input }: InputForm = req.body;

            // 돌아가기
            if (input === 6) res.redirect('/battle/dungeon');

            // 던전 진행정보 locals.dungeonStatus 생성
            const dungeonIndex = input - 1;
            const dungeonStatus = {
                dungeonIndex,
            };

            req.app.locals.dungeonStatus = dungeonStatus;

            // 선택한 던전으로 리다이렉션
            res.status(200).redirect('/battle/dungeon/proceed');
        } catch (error) {
            next(error);
        }
    },

    /** 던전 진행 */
    dungeonProceed: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { dungeonIndex } = req.app.locals.dungeonStatus;

            const dungeonInfo = await BattileService.selectedDungeonInfo(
                dungeonIndex,
            );

            const script = `${dungeonInfo.name}(${dungeonInfo.recommendLevel})\n\n${dungeonInfo.script}`;

            // 던전 진행정보 가공해서 뿌려주기
            const result = {
                script,
                opsions: '1. 진행하기\n2. 자동 진행\n3. 돌아가기\n',
            };

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    /**진행하기 선택에 따른 이벤트 발생 */
    event: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { dungeonIndex } = req.app.locals.dungeonStatus;
            const { input }: InputForm = req.body;

            // 자동진행 선택시 리다이렉션
            if (input === 2) res.redirect('/battle/dungeon/auto');
            // 돌아가기 선택시 리다이렉션
            if (input === 3) res.redirect('/battle/dungeon');

            // 던전 진행상황 갱신
            const dungeonStatus = {
                dungeonIndex,
                userStatus: null,
                monsterStatus: false,
            };
            req.app.locals.dungeonStatus = dungeonStatus;

            // 전투 스테이지 리다이렉션
            return res.status(200).redirect('/battle/dungeon/fight');
        } catch (error) {
            next(error);
        }
    },

    /** 전투 스테이지 진행 */
    fight: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 유저(캐릭터) 정보 불러오기
            const { user } = req.app.locals;
            const characterId: number = user.characterId;
            const characterStatus = await BattileService.getCharacterStatus(
                characterId,
            );
            // 던전 진행상황 불러오기
            const dungeonStatus = req.app.locals.dungeonStatus;

            // 전투 상황 파악(기존 몬스터 존재 여부)
            let monsterScript = '';
            const { monsterStatus } = await req.app.locals.dungeonStatus;
            if (!monsterStatus.monsterId) {
                // fieldId 불러오기
                const fieldId = dungeonStatus.dungeonIndex + 1;
                // 몬스터 생성
                const monster = await MonsterService.inputMonsters(fieldId);
                console.log('2. monster : ', monster);

                // 던전 진행상황에 생성된 몬스터 등록
                req.app.locals.dungeonStatus.monsterStatus = monster;
                // 몬스터 스크립트
                monsterScript = `${monster.name}이(가) 나타났다!`;
            } else {
                // 기존 전투가 진행중이라면 기존 몬스터 정보 불러오기
                const { monsterId } =
                    req.app.locals.dungeonStatus.monsterStatus;
                console.log(monsterId);
                const monster: any = await MonsterService.findMonsterById(
                    monsterId,
                );
                monsterScript = `${monster.name}이(가) 분노한다!`;
            }

            // console.log(
            //     '2. monsterStatus : ',
            //     await req.app.locals.dungeonStatus.monsterStatus,
            // );

            // 유저 선택지 생성
            const options = '1. 공격 한다\n2. 스킬1\n3. 스킬2\n4. 도망간다';

            // 던전 진행상황 업데이트

            // 결과 스크립트 생성
            const resultScript = { script: monsterScript, options: options };

            res.status(200).json(resultScript);
        } catch (error) {
            next(error);
        }
    },

    /** 전투 선택지 결과 및 진행 */
    fightAction: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 선택지 파악
            const { input } = req.body;
            // 유저 데이터 파악
            const { user } = req.app.locals;
            const characterId: number = user.characterId;
            const characterStatus = await BattileService.getCharacterStatus(
                characterId,
            );
            // 몬스터 데이터 파악
            // 던전 진행상황 파악

            // 선택지 실행
            // const actionResult = await BattileService.fightAction(input);
            // 결과 스크립트 작성
            // const resultScript = await battleService.resultScript(actionResult);

            // 결과 반환
            const { monsterId } = await req.app.locals.dungeonStatus
                .monsterStatus;

            res.status(200).json({ msg: monsterId });
        } catch (error) {
            next(error);
        }
    },

    /** 자동 진행 */
    auto: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({ msg: '자동진행' });
        } catch (error) {
            next(error);
        }
    },

    challengeInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
        } catch (error) {
            next(error);
        }
    },

    // 생존 모드(후순위 구현)
    survivalInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
        } catch (error) {
            next(error);
        }
    },

    // 보스레이드(후순위 구현)
    bossraidInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
        } catch (error) {
            next(error);
        }
    },
};
