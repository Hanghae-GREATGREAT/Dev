import { Skills } from '../db/models';

class SkillService {
    async skillList() {
        return Skills.findAll()
    }
}

export default new SkillService();
