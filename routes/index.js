import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  res.render('home', {
    title: 'Trang chủ',
  });
});

export default router;