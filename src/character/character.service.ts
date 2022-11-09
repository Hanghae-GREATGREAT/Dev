import { Characters, Fields, Titles, Users } from "../db/models";


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

    async findOneByName(name: string) {
        const result =  await Characters.findOne({
            where: { name },
            include: [Users, Fields, Titles]
        });

        if (!result) {
            return null;
        }
        return {
            ...result.get(),
            User: result.User.getDataValue('username'),
            Title: result.Title.getDataValue('name'),
            Field: {
                name: result.Field.getDataValue('name'),
                level: result.Field.getDataValue('level'),
            }
        };
    }

    async createNewCharacter(userId: number) {
        Characters.create({ userId, fieldId: 1, titleId: 1, });
    }
}


export default new CharacterService();