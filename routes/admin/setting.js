import express from 'express';
import { getSettingController, postSettingController } from '../../controllers/admin/setting.js';

const router = express.Router();
router.get('/', getSettingController);
router.post('/', postSettingController);
export default router;