import express from 'express';
import { viewProfile } from '../controllers/profile.js';
const router = express.Router();

router.get('/:username', viewProfile);

export default router; 