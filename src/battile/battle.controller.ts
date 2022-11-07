import BattileService from './battle.service';
import { NextFunction, request, Request, Response } from 'express';
import { InputForm } from '../interfaces/dungeon';
import { HttpException, HttpStatus } from '../common';

export default {
    /**
     * const sessionData = {
                userId,
                characterId: character.characterId,
                questId,
                inventory: ''
            }
     */

    // 던전 선택화면
    dungeonSelect: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await BattileService.getDungeonList();

            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    },

    // 던전 선택 요청
    dungeonInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 사용자 던전 선택값
            const { input }: InputForm = req.body;

            // 오타 검열
            if (input > 6)
                throw new HttpException(
                    'undefined Level',
                    HttpStatus.BAD_REQUEST,
                );
            // 돌아가기
            if (input === 6) res.redirect('/battle/dungeon');

            const dungeonStatus = {
                dungeonIndex: input - 1,
                runCount: 0,
            };

            req.app.locals.dungeonStatus = dungeonStatus;

            res.status(200).redirect('/battle/dungeon/proceed');
        } catch (error) {
            next(error);
        }
    },
    dungeonProceed: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const { user } = req.app.locals.user;

            const { dungeonIndex } = req.app.locals.dungeonStatus;

            const dungeonInfo = await BattileService.selectedDungeonInfo(
                dungeonIndex,
            );

            // 던전 정보 가공해서 뿌려주기
            const result = {
                dungeonName: dungeonInfo.name,
                recommendLevel: dungeonInfo.recommendLevel,
                script: dungeonInfo.script,
                opsions: '1. 진행하기\n2. 돌아가기',
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
            console.log(`dungeonIndex= ${dungeonIndex}`);
            const { input }: InputForm = req.body;

            // 돌아가기 선택시 리다이렉션
            if (input === 2) res.redirect('/battle/dungeon');

            // 턴 카운트 1회 증가
            const dungeonStatus = {
                dungeonIndex,
                runCount: +1,
            };

            const eventNum = Math.floor(Math.random() * 100);
            console.log(`eventNum = ${eventNum}`);

            if (eventNum < 5) {
                // 5% 확률로 보너스 스테이지
                return res.redirect('/battle/dungeon/bonus');
            } else {
                if (eventNum < 85) {
                    // 80% 확률로 일반 전투 진행
                    Object.assign(dungeonStatus, { mobRating: 'nomal' });
                } else {
                    // 10% 확률로 레어몹 전투 진행
                    Object.assign(dungeonStatus, { mobRating: 'rare' });
                }
            }
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
            const dungeonStatus = req.app.locals.dungeonStatus;

            // 전투 선택지 확인

            /**
             * 전투 로직 불러오기
             *
             * 전투
             */

            // 결과 반환
            res.status(200).json({
                data: dungeonStatus,
                msg: '전투 스테이지 진입',
            });
        } catch (error) {
            next(error);
        }
    },

    /** 보너스 스테이지 진행 */
    bonus: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json({ msg: '보너스 스테이지 진입' });
        } catch (error) {
            next(error);
        }
    },

    /** 진행 결과 반환 */
    result: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.sendStatus(200);
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
