import { Request, Response, NextFunction } from 'express';
import MonsterService from './monster.service';

class MonsterController {
    async inputMonsters(req: Request, res: Response, next: NextFunction) {
        try {
            await MonsterService.inputMonsters();
            res.status(200).send({ message: '몬스터 데이터 생성 완료' });
        } catch (error) {
            next();
        }
    }

    async findMonster(req: Request, res: Response, next: NextFunction) {
        try {
            const { fieldId }= req.query;

            const findMonster = await MonsterService.findMonster(Number(fieldId));

            res.status(200).json({ data: findMonster });
        } catch (error) {
            next();
        }
    }
}

export default new MonsterController();
