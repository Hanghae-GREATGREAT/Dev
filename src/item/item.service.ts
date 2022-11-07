import { Items } from '../db/models';
import { ItemInputForm } from '../interfaces/interface';
import { HttpException, HttpStatus } from '../common';

class ItemService {
    async inputItems(item: ItemInputForm) {
        const existItem = await Items.findOne({ where: { name: item.name } });
        if (existItem?.name)
            throw new HttpException(
                '아이템이 이미 존재합니다.',
                HttpStatus.BAD_REQUEST
            );

        await Items.create(item);
    }
}

export default new ItemService();
