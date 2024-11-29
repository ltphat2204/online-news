import express from 'express';
import { 
    getHashtags,
    postHashtag,
    patchHashtag,
    deleteHashtagByID
} from '../../controllers/hashtags.js';

const router = express.Router();

router.get('/', getHashtags);
router.post('/create', postHashtag);
router.post('/edit', patchHashtag);
router.post('/delete', deleteHashtagByID);

export default router;