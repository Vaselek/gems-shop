import { Router } from 'express';
import StoneController from '../controllers/StoneController';

const router = Router();

router.get('/', StoneController.getAllStones);
router.post('/', StoneController.addStone);
router.get('/:id', StoneController.getAStone);
router.put('/:id', StoneController.updatedStone);
router.delete('/:id', StoneController.deleteStone);

export default router;