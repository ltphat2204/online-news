import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  if (!req.session.auth) {
    req.session.auth = false;
  }
  res.render('home', {
    title: 'Trang chủ',
  });
});

export default router;