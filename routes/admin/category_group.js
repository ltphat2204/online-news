import express from 'express';
import { getCategoryGroups, postCategoryGroup, patchCategoryGroup, deleteCategoryGroupById } from '../../controllers/category_group.js';

const router = express.Router();

router.get('/', getCategoryGroups);
router.post('/create', postCategoryGroup);
router.post('/edit', patchCategoryGroup);
router.post('/delete', deleteCategoryGroupById);

export default router;