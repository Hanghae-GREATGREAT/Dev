import { Router } from 'express';
import ItemController from './item.controller';

const router = Router();

// router.post('/input', ItemController.inputItems);
router.post('/input', ItemController.itemsInput);
router.get('/weapons',ItemController.weaponList)
router.get('/armors',ItemController.armorList)

export default router;
