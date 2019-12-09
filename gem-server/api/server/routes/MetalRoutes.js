import { Router } from 'express';
import MetalController from '../controllers/MetalController';

const router = Router();

router.get('/', MetalController.getAllMetals);
router.post('/', MetalController.addMetal);
router.get('/:id', MetalController.getAMetal);
router.put('/:id', MetalController.updatedMetal);
router.delete('/:id', MetalController.deleteMetal);

export default router;