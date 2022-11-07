import { Router } from 'express';
import ItemController from './item.controller';

const router = Router();

router.post('/input', ItemController.inputItems);

export default router;
