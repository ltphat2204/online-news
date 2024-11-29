import express from 'express';
import { getUsers, postUsers, patchUser, deleteUserById } from '../../controllers/user.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/create', postUsers);
router.post('/edit', patchUser);
router.post('/delete', deleteUserById);

export default router;