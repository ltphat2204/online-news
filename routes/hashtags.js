import express from 'express';
import { getHashtagArticlesPage } from '../controllers/hashtags.js';
const router = express.Router();

router.get('/:id', getHashtagArticlesPage);

export default router;