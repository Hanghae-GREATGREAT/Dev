import { Characters, Fields, Titles, Users } from "../db/models";
import { UserSession } from "../interfaces/user";


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

    async refreshStatus(characterId: number, damage: number, cost: number): Promise<UserSession | null> {
        const result = await Characters.findByPk(characterId, {
            include: [ Users, Fields, Titles ]
        });
        // const questId = await QuestCompletes.findOne()        
        if (!result) return null;

        const { hp, mp } = result.get();
        const newHp = hp - damage > 0 ? hp - damage : 0;
        const newMp = mp - cost > 0 ? mp - cost : 0;
        result.update({ hp: newHp, mp: newMp });        

        return {
            username: result.User.getDataValue('username'),
            name: result.get('name'),
            level: result.get('level'),
            maxhp: result.get('maxhp'),
            maxmp: result.get('maxmp'),
            hp: newHp,
            mp: newMp,
            exp: result.get('exp'),
            questId: 1
        }
    }

    async addExp(characterId: number, exp: number) {
        const result = await Characters.findByPk(characterId, {
            include: [ Users, Fields, Titles ]
        });
        if (!result) return null;
        
        result.increment({ exp });

        return {
            username: result.User.getDataValue('username'),
            name: result.get('name'),
            level: result.get('level'),
            maxhp: result.get('maxhp'),
            maxmp: result.get('maxmp'),
            hp: result.get('hp'),
            mp: result.get('mp'),
            exp: result.get('exp') + exp,
            questId: 1
        }
    }

}


export default new CharacterService();