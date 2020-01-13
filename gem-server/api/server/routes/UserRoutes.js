import { Router } from 'express';
import UserController from '../controllers/UserController';
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const router = Router();

router.get('/', [auth, permit('admin')], UserController.getAllUsers);
router.post('/', UserController.addUser);
router.post('/sessions', UserController.loginUser);
router.delete('/sessions', UserController.logoutUser);
router.get('/:id', [auth, permit('admin')], UserController.getAUser);
router.put('/admin/:id', [auth, permit('admin')], UserController.updateUserByAdmin);
router.put('/:id', [auth], UserController.updateUser);
router.delete('/:id', [auth, permit('admin')], UserController.deleteUser);

export default router;