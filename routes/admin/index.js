import express from 'express';
import categoryGroupRouter from './category_group.js';
import userRouter from './user.js';
import categoryRouter from './category.js';
import hashtagRouter from './hashtags.js';
import authorizeRole from '../../middlewares/authorizeRole.js';
import articleRouter from './articles.js';
import assignRouter from './assign.js';
import reviewRouter from './review.js';

const router = express.Router();
router.use('/', authorizeRole(['admin','writer','editor']));
router.use('/assign', authorizeRole(['admin']), assignRouter);
router.use('/review', authorizeRole(['admin', 'editor']), reviewRouter);

router.get('/', (req, res) => {
    res.render('admin/home', {
        title: 'Trang chủ'
    });
});


router.use('/user', userRouter);
router.use('/category-group', categoryGroupRouter)
router.use('/category', categoryRouter)
router.use('/hashtags', hashtagRouter)
router.use('/articles', articleRouter)

export default router;