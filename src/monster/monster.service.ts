import { Monsters } from '../db/models';
import { MonsterInputForm } from '../interfaces/interface';

class MonsterService {
    // async inputMonsters() {
    //     const names: string[] = ['고블린', '오크', '늑대'];
    //     const defaultMonster = {
    //         fieldId: 1,
    //         type: 0,
    //         name: '',
    //         hp: 50,
    //         attack: 5,
    //         defense: 5,
    //         exp: 10,
    //     };
    //     const monsters = [];

    //     for (let i = 1; i <= 100; i++) {
    //         const dumyMonsters = {
    //             fieldId: defaultMonster.fieldId * i,
    //             type: 0,
    //             name: names[i % 3],
    //             hp: Math.ceil(defaultMonster.hp * 1.5 * i),
    //             attack: Math.ceil(defaultMonster.attack * 1.5 * i),
    //             defense: Math.ceil(defaultMonster.defense * 1.5 * i),
    //             exp: Math.ceil(defaultMonster.exp * 1.5 * i),
    //         };
    //         monsters.push(dumyMonsters);
    //     }
    //     // console.log(monsters);
    //     await Monsters.bulkCreate(monsters);
    // }

    // 1. 내 몬스터를 찾아 오는 역할
    async findMonster(monsterId: number) {
        return await Monsters.findByPk(monsterId);
    }

    // 2. 내 몬스터를 만드는 역할
    async createMonster(fieldId: number) {
        const names: string[] = ['고블린', '오크', '늑대'];
        const defaultMonster = {
            fieldId: 1,
            type: 0,
            hp: 50,
            attack: 5,
            defense: 5,
            exp: 10,
        };
        const dumyMonsters: MonsterInputForm = {
            fieldId,
            type: 0,
            name: names[fieldId % 3],
            hp: Math.ceil(defaultMonster.hp * 1.5 * fieldId),
            attack: Math.ceil(defaultMonster.attack * 1.5 * fieldId),
            defense: Math.ceil(defaultMonster.defense * 1.5 * fieldId),
            exp: Math.ceil(defaultMonster.exp * 1.5 * fieldId),
        };
        return await Monsters.create(dumyMonsters);
    }

    // 3. 내 몬스터를 잡아낸 역할
    async destroyMonster(monsterId: number) {
        await Monsters.destroy({ where: { monsterId } });
    }

    // 4. 내 몬스터와 전투중
    async updateMonster(monsterId: number, hp: number) {
        return await Monsters.update({ hp }, { where: { monsterId } });
    }
}

export default new MonsterService();
