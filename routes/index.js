import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.views) {
        req.session.views = 1;
      } else {
        req.session.views++;
      }
    if (!req.session.auth) {
      req.session.auth = false;
    }
    res.locals.authUser = req.session.authUser;
    res.locals.auth = req.session.auth;
    res.render('home', {
        title: 'Trang chủ'
    });
});

export default router;