import express from 'express';
import { getArticles, postArticle, createArticleView, editArticleView, editArticle, deleteArticle } from '../../controllers/admin/articles.js';
import preloadCategories from '../../middlewares/preloadCategories.js'
import autoUploadFile from '../../middlewares/autoUploadFiles.js';

const router = express.Router();

router.get('/', preloadCategories, getArticles);
router.get('/create', preloadCategories, createArticleView);
router.post('/create', autoUploadFile, postArticle);
router.get('/edit', preloadCategories, editArticleView);
router.post('/edit', autoUploadFile, editArticle);
router.post('/delete', deleteArticle);

export default router;