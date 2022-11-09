import { Request, Response, NextFunction } from 'express';
import ItemService from './item.service';
// import { ItemInputForm } from '../interfaces/interface';
// import { HttpException, HttpStatus } from '../common';

class ItemController {
    // async inputItems(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const {
    //             npcId,
    //             monsterId,
    //             name,
    //             attack,
    //             defense,
    //             type,
    //         }: ItemInputForm = req.body;
    //         if (!npcId || !monsterId || !name || !attack || !defense || !type)
    //             throw new HttpException(
    //                 '입력값을 확인해주세요',
    //                 HttpStatus.BAD_REQUEST
    //             );

    //         await ItemService.inputItems({
    //             npcId,
    //             monsterId,
    //             name,
    //             attack,
    //             defense,
    //             type,
    //         });

    //         res.status(200).end();
    //     } catch (error) {
    //         next();
    //     }
    // }

    // async itemsInput(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         await ItemService.itemsInput();
    //         res.status(200).send({ message: '장비 데이터 생성완료' });
    //     } catch (error) {
    //         next();
    //     }
    // }

    async itemList(req: Request, res: Response, next: NextFunction) {
        try {
            const itemList = await ItemService.itemList();

            res.status(200).json({ data: itemList });
        } catch (error) {
            next();
        }
    }
}

export default new ItemController();
