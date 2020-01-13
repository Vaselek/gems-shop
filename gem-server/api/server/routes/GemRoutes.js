import { Router } from 'express';
import GemController from '../controllers/GemController';
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const router = Router();

router.get('/', GemController.getAllGems);
router.post('/', [auth, permit('admin')], GemController.addGem);
router.get('/:id', GemController.getAGem);
router.put('/:id', [auth, permit('admin')], GemController.updatedGem);
router.delete('/:id', [auth, permit('admin')], GemController.deleteGem);

export default router;