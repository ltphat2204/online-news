import express from 'express';
import { getArticleList, updateArticle } from '../../controllers/admin/review.js';
import preloadCategories from '../../middlewares/preloadCategories.js';

const router = express.Router();

router.get('/', preloadCategories, getArticleList);
router.post('/approve', updateArticle);

export default router;