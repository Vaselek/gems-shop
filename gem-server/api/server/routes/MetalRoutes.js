import { Router } from 'express';
import MetalController from '../controllers/MetalController';
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import upload from "../../multer";

const router = Router();

router.get('/', MetalController.getAllMetals);
router.post('/', [auth, permit('admin'), upload.none()], MetalController.addMetal);
router.get('/:id', MetalController.getAMetal);
router.put('/:id', [auth, permit('admin')], MetalController.updatedMetal);
router.delete('/:id', [auth, permit('admin')], MetalController.deleteMetal);

export default router;