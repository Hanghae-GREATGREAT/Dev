import BattleService from './battle.service';
import { NextFunction, request, Request, Response } from 'express';
import { dungeonInfoForm, InputForm } from '../interfaces/dungeon';
import MonsterService from '../monster/monster.service';
import { HttpException, HttpStatus } from '../common';

export default {
    test: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user } = req.app.locals;

            /**
             * userId : 101,
             * characterId : 100,
             */
            console.log(typeof user);

            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    },

    /** 던전 리스트 요청 */
    getDungeonList: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 던전 리스트 스크립트 불러오기
            const result = await BattleService.getDungeonList();
            // 스크립트 반환
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
            // 사용자 정보 불러오기
            const { characterId } = req.app.locals.user;

            // 사용자가 선택한 던전의 상세정보 불러오기
            const dungeonIndex: number = input - 1;
            const dungeonInfo: dungeonInfoForm =
                await BattleService.dungeonInfo(dungeonIndex);

            // 던전 정보 스크립트 작성
            const dongeonInfoScript = `${dungeonInfo.name}(${dungeonInfo.recommendLevel})\n\n${dungeonInfo.script}`;
            // 선택지 스크립트 작성
            const options = '1. 진행하기\n2. 자동 진행\n3. 돌아가기\n';

            // 결과 스크립트 작성
            const result = {
                script: dongeonInfoScript,
                opsions: options,
            };

            // 던전 진행정보 생성
            const dungeonLevel = input;
            const data = {
                dungeonLevel,
                characterId: 101,
                monsterId: 0,
            };
            // 진행상황 저장
            req.app.locals.dungeonStatus = data;

            // 스크립트 반환
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    /** 던전 진행 */
    dungeonProceed: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 진행정보 불러오기
            const { dungeonStatus } = req.app.locals;

            const monsterId = dungeonStatus.monsterId;
            let monsterScript = '';
            if (monsterId === 0) {
                // fieldId 불러오기
                const fieldId = dungeonStatus.dungeonLevel;
                // 몬스터 생성
                const monster = await MonsterService.createMonster(fieldId);
                console.log('생성 monster : ', monster.monsterId);

                // 던전 진행상황에 생성된 몬스터 등록
                req.app.locals.dungeonStatus.monsterId = monster.monsterId;
                // 몬스터 스크립트
                monsterScript = `${monster.name}이(가) 나타났다!`;
            } else {
                // 기존 전투가 진행중이라면 기존 몬스터 정보 불러오기
                const { monsterId } = req.app.locals.dungeonStatus;
                console.log('기존 몬스터 : ', monsterId);
                const monster: any = await MonsterService.findMonsterById(
                    monsterId,
                );
                monsterScript = `${monster.name}이(가) 분노한다!`;
            }

            const resultScript = {
                script: monsterScript,
                opsions: '1. 공격 한다\n2. 스킬1\n3. 스킬2\n4. 도망간다',
            };

            res.status(200).json(resultScript);
        } catch (error) {
            next(error);
        }
    },

    /** 전투 스테이지 진행 */
    fight: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 유저 선택지 (일반 공격 or 스킬 공격)
            const { input } = req.body;
            // 던전 진행상황 불러오기
            const { characterId, monsterId } = req.app.locals.dungeonStatus;

            // 캐릭터 스테이터스
            const character = await BattleService.getCharacter(characterId);
            let playerHP = character!.hp;
            let playerMP = character!.mp;
            const playerAttack = character!.attack;
            const playerDefence = character!.defense;
            // 몬스터 스테이터스
            const monster = await BattleService.getMonster(monsterId);
            let monsterHP = monster!.hp;
            const monsterAttack = monster!.attack;
            const monsterDefence = monster!.defense;

            // 전투 턴 스크립트 선언
            let turnScript = [];

            // 유저 턴 로직
            if (input === 1) {
                // 일반 공격 로직
                const hitStrength = Math.floor(Math.random() * 40) + 80; // 80 ~ 120
                const damage = Math.floor((playerAttack * hitStrength) / 100);

                const userActionScript = `당신의 공격으로 ${
                    monster!.name
                }에게 ${damage}의 피해를 입혔다.`;

                monsterHP -= damage;
                turnScript.push(userActionScript);
            } else {
                // 스킬 공격 로직

                const userActionScript = `당신의 (유저스킬N.name)공격으로 (몬스터.name)에게 00의 피해를 입혔다.`;
                turnScript.push(userActionScript);
            }

            // 몬스터 턴 로직
            if (monsterHP > 0) {
                const hitStrength = Math.floor(Math.random() * 40) + 80; // 80 ~ 120
                const damage = Math.floor((monsterAttack * hitStrength) / 100);

                const monsterActionScript = `${
                    monster!.name
                }의 공격은 당신에게 ${damage}의 피해를 입혔다.`;
                turnScript.push(monsterActionScript);
            } else {
                // 몬스터 사망
            }

            // 유저 사망여부 판단
            if (playerHP > 0) {
            }
            // 전투 스크립트
            // 전투결과 스크립트
            // 몬스터 스크립트

            // 유저 선택지 생성
            const options = '1. 공격 한다\n2. 스킬1\n3. 스킬2\n4. 도망간다';

            // 던전 진행상황 업데이트

            // 결과 스크립트 생성
            const resultScript = { script: turnScript, options: options };

            res.status(200).json(resultScript);
        } catch (error) {
            next(error);
        }
    },

    /** 전투 선택지 결과*/
    fightResult: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 선택지 파악
            const { input } = req.body;
            // 유저 데이터 파악
            const { user } = req.app.locals;
            const characterId: number = user.characterId;
            const characterStatus = await BattleService.getCharacter(
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
