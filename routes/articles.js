import express from 'express';
import { showArticle } from '../controllers/articles.js';

const router = express.Router();

// GET /articles?id=
router.get('/', showArticle);

export default router;