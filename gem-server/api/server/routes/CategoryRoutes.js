import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import auth from '../middleware/auth';
import permit from "../middleware/permit";

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', [auth, permit('admin')], CategoryController.addCategory);
router.get('/:id', CategoryController.getACategory);
router.put('/:id', [auth, permit('admin')], CategoryController.updatedCategory);
router.delete('/:id', [auth, permit('admin')], CategoryController.deleteCategory);

export default router;