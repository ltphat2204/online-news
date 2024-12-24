import express from 'express';
import { getArticleList } from '../../controllers/admin/review.js';

const router = express.Router();

router.get('/', getArticleList);
// router.post('/edit', editAssignments);

export default router;