import express from 'express';
import { getArticlesByCategoryIDController } from '../controllers/category.js';
const router = express.Router();

router.get('/:id', getArticlesByCategoryIDController);

export default router;