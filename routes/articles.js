import express from 'express';
import { showArticle,searchArticles } from '../controllers/articles.js';
import { searchCategoryByCategoryGroup } from '../controllers/category.js';
const router = express.Router();

// GET /articles?id=
router.get('/', showArticle);
router.get('/search', searchArticles);
router.get('/searchCategory', searchCategoryByCategoryGroup);
export default router;