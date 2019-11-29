import { Router } from 'express';
import GemController from '../controllers/GemController';

const router = Router();

router.get('/', GemController.getAllGems);
router.post('/', GemController.addGem);
router.get('/:id', GemController.getAGem);
router.put('/:id', GemController.updatedGem);
router.delete('/:id', GemController.deleteGem);

export default router;