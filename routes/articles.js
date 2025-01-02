import express from 'express';
import { showArticle, searchArticles, exportToPdf } from '../controllers/articles.js';
import { searchCategoryByCategoryGroup } from '../controllers/category.js';
const router = express.Router();

// GET /articles?id=
router.get('/', showArticle);
router.get('/search', searchArticles);
router.get('/searchCategory', searchCategoryByCategoryGroup);
router.get('/:id/export', exportToPdf);
export default router;