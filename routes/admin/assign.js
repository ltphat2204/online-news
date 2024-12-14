import express from 'express';
import { getEditorLists, editAssignments } from '../../controllers/admin/assign.js';
import preloadCategories from '../../middlewares/preloadCategories.js';

const router = express.Router();

router.get('/', preloadCategories, getEditorLists);
router.post('/edit', editAssignments);

export default router;