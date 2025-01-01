import express from 'express';
import { getArticleList, updateArticle, disapproveArticle } from '../../controllers/admin/review.js';
import preloadCategories from '../../middlewares/preloadCategories.js';

const router = express.Router();

router.get('/', preloadCategories, getArticleList);
router.post('/approve', updateArticle);
router.post('/disapprove', disapproveArticle);

export default router;