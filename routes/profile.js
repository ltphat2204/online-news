import express, { request } from 'express';
import { viewProfile, editProfile, verifyPassword, requestPremium } from '../controllers/profile.js';
const router = express.Router();

router.get('/:username', viewProfile);
router.post('/:username/edit', editProfile);
router.post('/:username/verify-password', verifyPassword);
router.post('/:username/premium-request', requestPremium);
export default router; 