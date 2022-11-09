import { Router } from 'express';
import SkillController from './skill.controller';

const router = Router();

router.get('/', SkillController.skillList);

export default router;
