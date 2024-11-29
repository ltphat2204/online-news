import express from 'express';
import { getCategory, postCategory, patchCategory, deleteCategoryById } from '../../controllers/category.js';

const router = express.Router();

router.get('/', getCategory);
router.post('/create', postCategory);
router.post('/edit', patchCategory);
router.post('/delete', deleteCategoryById);

export default router;