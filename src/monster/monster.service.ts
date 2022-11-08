import { where } from 'sequelize';
import { Monsters } from '../db/models';
import { MonsterInputForm } from '../interfaces/interface';

class MonsterService {
    async inputMonsters(dungeonLevel: number) {
        const names: string[] = ['고블린', '오크', '늑대'];
        const defaultMonster: MonsterInputForm = {
            fieldId: 1,
            type: 0,
            name: '',
            hp: 50,
            attack: 5,
            defense: 5,
            exp: 10,
        };
        // const monsters: MonsterInputForm[] = [];

        // for (let i = 1; i <= 100; i++) {
        // const dumyMonsters = {
        //     fieldId: defaultMonster.fieldId * i,
        //     type: 0,
        //     name: names[i % 3],
        //     hp: Math.ceil(defaultMonster.hp * 1.5 * i),
        //     attack: Math.ceil(defaultMonster.attack * 1.5 * i),
        //     defense: Math.ceil(defaultMonster.defense * 1.5 * i),
        //     exp: Math.ceil(defaultMonster.exp * 1.5 * i),
        // };
        //     monsters.push(dumyMonsters);
        // }
        // // console.log(monsters);
        // await Monsters.bulkCreate(monsters);

        const dumyMonster = {
            fieldId: defaultMonster.fieldId * dungeonLevel,
            type: 0,
            name: names[dungeonLevel % 3],
            hp: Math.ceil(defaultMonster.hp * 1.5 * dungeonLevel),
            attack: Math.ceil(defaultMonster.attack * 1.5 * dungeonLevel),
            defense: Math.ceil(defaultMonster.defense * 1.5 * dungeonLevel),
            exp: Math.ceil(defaultMonster.exp * 1.5 * dungeonLevel),
        };

        const result = await Monsters.create(dumyMonster);

        return result.get();
    }

    async findMonster(fieldId: number) {
        return await Monsters.findAll({ where: { fieldId } });
    }

    async changeMonsterStatus(monsterId: number, hp: number) {
        return await Monsters.update({ hp: hp }, { where: { monsterId } });
    }

    async findMonsterById(monsterId: number) {
        return await Monsters.findByPk(monsterId);
    }
}

export default new MonsterService();
