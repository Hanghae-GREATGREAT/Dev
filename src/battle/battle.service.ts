import { dungeonInfoForm, InputForm } from '../interfaces/dungeon';
import { Characters, Fields, Monsters } from '../db/models';
import characterService from '../character/character.service';
import MonsterService from '../monster/monster.service';

class BattleService {
    // 모든 던전이름 목록 반환
    async getDungeonList() {
        // 각 던전 선택지 및 정보 JSON으로 뿌려주기

        const dungeons = this.dungeons();

        const result = {
            script: '입장할 던전을 선택해주세요.',
            options: `1. ${dungeons[0].name}\n2. ${dungeons[1].name}\n3. ${dungeons[2].name}\n4. ${dungeons[3].name}\n5. ${dungeons[4].name}`,
        };

        return result;
    }

    /**
     * 사용자가 선택한 던전정보 반환
     */
    async dungeonInfo(dungeonIndex: number) {
        const dungeons: dungeonInfoForm[] = this.dungeons();

        return dungeons[dungeonIndex];
    }

    /** 캐릭터 정보 */
    async getCharacter(characterId: number) {
        return await Characters.findByPk(characterId);
    }
    async updateCharacter(characterId: number, damage: number, cost: number) {
        // await characterService.refreshStatus(characterId, damage, cost);
    }
    async addExp(characterId: number, exp: number) {}

    /** 몬스터 정보 */
    async getMonster(monsterId: number) {
        return await Monsters.findByPk(monsterId);
    }
    async updateMonster(monsterId: number, hp: number) {
        await MonsterService.updateMonster(monsterId, hp);
    }
    async destroyMonster(monsterId: number) {
        await MonsterService.destroyMonster(monsterId);
    }

    async fightAction(input: number) {
        return '';
    }
    async resultScript(actionResult: string) {
        return '';
    }

    /** 던전 목록 반환 */
    dungeons() {
        const dungeons = [
            {
                dungeonNo: 1,
                name: '알비 던전',
                recommendLevel: 'Lv. 0 ~ 9',
                script: '코네일 마을의 던전. 비교적 약한 마물들이 출현하여 전투의 기본을 익히기 좋은 곳이다.',
            },
            {
                dungeonNo: 2,
                name: '라비 던전',
                recommendLevel: 'Lv. 10 ~ 19',
                script: '지속적으로 마을을 위협하는 스켈레톤이 소환되는 던전.',
            },
            {
                dungeonNo: 3,
                name: '칼페온 신전',
                recommendLevel: 'Lv. 20 ~ 29',
                script: '과거 칼페온 외곽의 신전이었지만 지금은 이교도들이 점령하여 흑마술을 연구하고있다.',
            },
            {
                dungeonNo: 4,
                name: '마왕성 주변',
                recommendLevel: 'Lv. 30 ~ 39',
                script: '이곳에서 멀쩡히 돌아온 사람은 아무도 없다.',
            },
            {
                dungeonNo: 5,
                name: '마왕성',
                recommendLevel: 'Lv. 40 ~ 50',
                script: '마왕 큐티폴리베어의 성.',
            },
        ];

        return dungeons;
    }
}

export default new BattleService();
