import express from 'express';
import { getPendingPremiumUserController, responsePremium } from '../../controllers/admin/premium.js';


const router = express.Router();

router.get('/', getPendingPremiumUserController);
router.post('/response', responsePremium);

export default router;