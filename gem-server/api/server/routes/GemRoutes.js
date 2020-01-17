import { Router } from 'express';
import GemController from '../controllers/GemController';
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import multer from 'multer';
import nanoid from 'nanoid';
import path from 'path';
import config from '../../../config';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

router.get('/', GemController.getAllGems);
router.post('/', [auth, permit('admin'), upload.single('image')], GemController.addGem);
router.get('/:id', GemController.getAGem);
router.put('/:id', [auth, permit('admin')], GemController.updatedGem);
router.delete('/:id', [auth, permit('admin')], GemController.deleteGem);

export default router;