import express from 'express';
import { viewProfile, editProfile, verifyPassword } from '../controllers/profile.js';
const router = express.Router();

router.get('/:username', viewProfile);
router.post('/:username/edit', editProfile);
router.post('/:username/verify-password', verifyPassword);

export default router; 