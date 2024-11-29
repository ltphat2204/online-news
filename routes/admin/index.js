import express from 'express';
import categoryGroupRouter from './category_group.js';
import userRouter from './user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin/home', {
        title: 'Trang chủ'
    });
});

router.use('/category-group', categoryGroupRouter);
router.use('/user', userRouter);
export default router;