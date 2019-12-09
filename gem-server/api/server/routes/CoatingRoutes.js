import { Router } from 'express';
import CoatingController from '../controllers/CoatingController';

const router = Router();

router.get('/', CoatingController.getAllCoatings);
router.post('/', CoatingController.addCoating);
router.get('/:id', CoatingController.getACoating);
router.put('/:id', CoatingController.updatedCoating);
router.delete('/:id', CoatingController.deleteCoating);

export default router;