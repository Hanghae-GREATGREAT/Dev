import { Request, Response, NextFunction } from 'express';
import SkillService from './skill.service';

class SkillController {
    async skillList(req: Request, res: Response, next: NextFunction) {
        try {
            const skills = await SkillService.skillList();
            res.status(200).json({ data: skills });
        } catch (error) {
            next();
        }
    }
}

export default new SkillController();
