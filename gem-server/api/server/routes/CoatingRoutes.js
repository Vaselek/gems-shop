import { Router } from 'express';
import CoatingController from '../controllers/CoatingController';
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import upload from "../../multer";

const router = Router();

router.get('/', CoatingController.getAllCoatings);
router.post('/', [auth, permit('admin'), upload.none()], CoatingController.addCoating);
router.get('/:id', CoatingController.getACoating);
router.put('/:id', [auth, permit('admin'), upload.none()], CoatingController.updatedCoating);
router.delete('/:id', [auth, permit('admin')], CoatingController.deleteCoating);

export default router;