import express from 'express';
import { handlePostComment } from '../controllers/comments.js';
const router = express.Router();

router.post('/:id', handlePostComment);

export default router;