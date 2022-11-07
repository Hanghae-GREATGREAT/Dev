import { Items } from '../db/models';
import { ItemInputForm } from '../interfaces/interface';
import { HttpException, HttpStatus } from '../common';
import fs from 'fs';
import path from 'path';

class ItemService {
    // async inputItems(item: ItemInputForm) {
    //     const existItem = await Items.findOne({ where: { name: item.name } });
    //     if (existItem?.name)
    //         throw new HttpException(
    //             '아이템이 이미 존재합니다.',
    //             HttpStatus.BAD_REQUEST
    //         );

    //     await Items.create(item);
    // }

    async itemsInput() {
        const names: string[] = [
            '나무몽둥이',
            '츄리닝',
            '기본검',
            '기본방어구',
            '롱소드',
            '다이아몬드 메일',
            '강철대검',
            '메이지 플레이크',
            '르탄이의 검',
            '르탄이의 방어구',
        ];
        const monsterIds: number[] = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
        const attack: number[] = [5, 0, 10, 0, 15, 0, 20, 0, 30, 0];
        const defense: number[] = [0, 5, 0, 10, 0, 15, 0, 20, 0, 30];
        const items: ItemInputForm[] = [];

        for (let i = 0; i < 10; i++) {
            const dumyitems = {
                npcId: (i % 2) + 1,
                monsterId: monsterIds[i % 10],
                name: names[i % 10],
                attack: attack[i % 10],
                defense: defense[i % 10],
                type: i % 2,
            };
            items.push(dumyitems);
        }
        await Items.bulkCreate(items);
    }

    async weaponList(npcId: number) {
        return Items.findAll({ where: { npcId } });
    }

    async armorList(npcId: number) {
        return Items.findAll({ where: { npcId } });
    }
}

export default new ItemService();
