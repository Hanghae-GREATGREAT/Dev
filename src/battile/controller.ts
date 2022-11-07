import { NextFunction, Request, Response } from 'express';

export default {
    // 던전
    dungeonInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: `${error}` });
            // next(error);
        }
    },
    select: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: `${error}` });
            // next(error);
        }
    },
    fight: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: `${error}` });
            // next(error);
        }
    },
    bonus: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: `${error}` });
            // next(error);
        }
    },
    challengeInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: `${error}` });
            // next(error);
        }
    },

    // 생존 모드(후순위 구현)
    survivalInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: `${error}` });
            // next(error);
        }
    },

    // 보스레이드(후순위 구현)
    bossraidInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: `${error}` });
            // next(error);
        }
    },
};
