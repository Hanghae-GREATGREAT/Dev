import { Monsters } from '../db/models';
import { MonsterInputForm } from '../interfaces/interface';

class MonsterService {
    async inputMonsters() {
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
        const monsters: MonsterInputForm[] = [];

        for (let i = 1; i <= 100; i++) {
            const dumyMonsters = {
                fieldId: defaultMonster.fieldId * i,
                type: 0,
                name: names[i % 3],
                hp: Math.ceil(defaultMonster.hp * 1.5 * i),
                attack: Math.ceil(defaultMonster.attack * 1.5 * i),
                defense: Math.ceil(defaultMonster.defense * 1.5 * i),
                exp: Math.ceil(defaultMonster.exp * 1.5 * i),
            };
            monsters.push(dumyMonsters);
        }
        // console.log(monsters);
        await Monsters.bulkCreate(monsters);
    }

    async findMonster(fieldId: number) {
        return await Monsters.findAll({ where: { fieldId } });
    }
}

export default new MonsterService();
