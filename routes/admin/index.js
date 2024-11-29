import express from 'express';
import categoryGroupRouter from './category_group.js';
import hashtagRouter from './hashtags.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/home', {
        title: 'Trang chủ'
    });
});

router.use('/category-group', categoryGroupRouter)
router.use('/hashtags', hashtagRouter)

export default router;