import express from 'express';
import { getRender, getCategory, postCategory, patchCategory, deleteCategoryById } from '../../controllers/category.js';
import preloadCategoryGroups from '../../middlewares/preloadCategoryGroups.js';

const router = express.Router();

router.get('/', preloadCategoryGroups, getRender);
router.post('/create', postCategory);
router.post('/edit', patchCategory);
router.post('/delete', deleteCategoryById);
router.get('/getPage', getCategory);
export default router;