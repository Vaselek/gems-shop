import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import auth from '../middleware/auth';
import permit from "../middleware/permit";
import upload from "../../multer";


const router = Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', [auth, permit('admin'), upload.none()], CategoryController.addCategory);
router.get('/:id', CategoryController.getACategory);
router.put('/:id', [auth, permit('admin'), upload.none()], CategoryController.updatedCategory);
router.delete('/:id', [auth, permit('admin')], CategoryController.deleteCategory);

export default router;