import express from 'express';
import { viewProfile, editProfile } from '../controllers/profile.js';
const router = express.Router();

router.get('/:username', viewProfile);
router.post('/:username/edit', editProfile);

export default router; 