import express from 'express';
import { getCategoryGroupsDetail } from '../controllers/category_group.js';

const router = express.Router();

router.get('/:id', getCategoryGroupsDetail); // Use URL parameters

export default router;
