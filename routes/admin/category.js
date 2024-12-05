import express from 'express';
import { getCategory, postCategory, patchCategory, deleteCategoryById} from '../../controllers/category.js';
import preloadCategoryGroups from '../../middlewares/preloadCategoryGroups.js';

const router = express.Router();

router.get('/', preloadCategoryGroups, getCategory);
router.post('/create', postCategory);
router.post('/edit', patchCategory);
router.post('/delete', deleteCategoryById);

export default router;