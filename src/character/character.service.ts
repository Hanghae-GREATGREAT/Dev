import { Characters } from "../db/models";


class CharacterService {

    async findOneByUserId(userId: number) {
        const result =  await Characters.findOne({
            where: { userId }
        });

        if (!result) {
            return null;
        }
        return result;
    }
}


export default new CharacterService();