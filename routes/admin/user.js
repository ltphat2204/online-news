import express from 'express';
import { getUsers, postUsers, patchUser, deleteUserById, searchUsers } from '../../controllers/user.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/create', postUsers);
router.post('/edit', patchUser);
router.post('/delete', deleteUserById);
router.get('/search', searchUsers);

export default router;