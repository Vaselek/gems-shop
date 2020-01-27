import { Router } from 'express';
import StoneController from '../controllers/StoneController';
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import upload from "../../multer";

const router = Router();

router.get('/', StoneController.getAllStones);
router.post('/', [auth, permit('admin'), upload.none()], StoneController.addStone);
router.get('/:id', StoneController.getAStone);
router.put('/:id', [auth, permit('admin')], StoneController.updatedStone);
router.delete('/:id', [auth, permit('admin')], StoneController.deleteStone);

export default router;