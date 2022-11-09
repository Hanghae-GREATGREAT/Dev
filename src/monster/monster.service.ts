import { where } from 'sequelize';
import { Monsters } from '../db/models';
import { MonsterInputForm } from '../interfaces/interface';

class MonsterService {
    // 1. 내 몬스터를 찾아 오는 역할
    async findMonster(monsterId: number) {
        return await Monsters.findByPk(monsterId);
    }

    // 2. 내 몬스터를 만드는 역할
    async createMonster(fieldId: number) {
        // 여기에 일반, 희귀, 보스 몬스터를 결정할 확률을 만드는 코드를 만들자.
        // 0이 나올 확률은 80, 1은 15, 2는 5
        // 기본적으로 monsterId 1, 2, 3 은 첫 던전의 일반 3가지 몬스터
        // 경험치 획득량은 캐릭터 필요 경험치랑 참고하자.
        // 확률적으로 1이 나오면 이름 앞에 '정예'를 넣어주고 각 능력치가 1.5배
        // 2가 나오면 이름앞에 '보스'를 넣어주고 각 능력치가 3배

        const first: string[] = ['다람쥐', '고슴도치', '늑대'];
        const second: string[] = ['고슴도치', '고블린', '고블린 대장'];
        const therd: string[] = ['고블린', '오크', '오크 대장'];
        const fourth: string[] = ['오크', '도적', '도적 대장'];
        const fifth: string[] = ['도적', '좀비', '좀비 숙주'];
        const sixth: string[] = ['좀비', '구울', '리치'];
        const seventh: string[] = ['구울', '임프', '데몬 임프'];
        const eighth: string[] = ['임프', '머미', '디아블로'];
        const ninth: string[] = ['머미', '리퍼', '메피스토'];
        const tenth: string[] = ['리퍼', '뱀파이어', '바알'];

        const names = [
            '뮤츠',
            first,
            second,
            therd,
            fourth,
            fifth,
            sixth,
            seventh,
            eighth,
            ninth,
            tenth,
        ];
        let name: string;
        let ratio: number;
        let type = this.isRere();
        if (type === 0) {
            name = names[fieldId][0];
            ratio = fieldId * 1;
        }
        if (type === 1) {
            name = names[fieldId][1];
            ratio = fieldId * 1.5;
        }
        if (type === 2) {
            name = names[fieldId][2];
            ratio = fieldId * 3;
        }

        const defaultMonster = {
            hp: 50,
            attack: 5,
            defense: 5,
            exp: 10,
        };
        if (!type) type = 0;
        const dumyMonsters: MonsterInputForm = {
            fieldId,
            type,
            name: name!,
            hp: Math.ceil(defaultMonster.hp * ratio!),
            attack: Math.ceil(defaultMonster.attack * ratio!),
            defense: Math.ceil(defaultMonster.defense * ratio!),
            exp: Math.ceil(defaultMonster.exp * ratio!),
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

    async changeMonsterStatus(monsterId: number, hp: number) {
        return await Monsters.update({ hp: hp }, { where: { monsterId } });
    }

    async findMonsterById(monsterId: number) {
        return await Monsters.findByPk(monsterId);
    }
}

export default new MonsterService();
