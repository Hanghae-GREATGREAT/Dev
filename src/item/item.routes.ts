import { Router } from 'express';
import ItemController from './item.controller';

const router = Router();

// router.post('/input', ItemController.inputItems);
router.post('/input', ItemController.itemsInput);


export default router;
