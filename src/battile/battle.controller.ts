import { NextFunction, Request, response, Response } from 'express';
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
            // 권장레벨 및 진입불가 예외처리
            const dungeons = [
                '1. 알비 던전',
                '2. 라비 던전',
                '3. 폐허 뒷길',
                '4. 마왕성 주변',
                '5. 마왕성',
            ];

            const result = {
                script: '던전 입장할 던전을 선택 해주세요',
                options: `${dungeons[0]}\n${dungeons[1]}\n${dungeons[2]}\n${dungeons[3]}\n${dungeons[4]}\n`,
            };

            res.status(200).send(result);
        } catch (error) {
            next(error);
        }
    },
    // 던전 정보
    dungeonInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            //params로 입력받은 던전레벨 예외처리
            const { input }: InputForm = req.body;
            if (input > 6)
                throw new HttpException(
                    'undefined Level',
                    HttpStatus.BAD_REQUEST,
                );
            if (input === 6) res.redirect('/battle/dungeon');
            res.status(200).json({ msg: 'OK' });
        } catch (error) {
            next(error);
        }
    },
    dungeonProceed: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user } = req.app.locals.user;

            // 던전 정보 가공해서 뿌려주기

            res.status(200).json({ data: user });
        } catch (error) {
            next(error);
        }
    },
    fight: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // 전투 시작 선택지 리다이렉션으로 접근

            // 전투 선택지 확인

            /**
             * 전투 로직 불러오기
             *
             * 전투
             */

            // 결과 반환
            res.status(200);
        } catch (error) {
            next(error);
        }
    },
    bonus: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
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
