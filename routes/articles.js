import express from 'express';
import { getArticles } from '../controllers/articles.js';

const router = express.Router();

// GET /articles
router.get('/', getArticles)

// GET /articles/:slug
// => /articles/2
router.get('/:slug')

export default router;