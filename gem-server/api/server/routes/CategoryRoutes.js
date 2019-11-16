import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', CategoryController.addCategory);
router.get('/:id', CategoryController.getACategory);
router.put('/:id', CategoryController.updatedCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;