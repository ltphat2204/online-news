import express from "express";
import { checkAvailable,
         handleLogin,
         handleLogout,
         handleRegister} from "../../controllers/auth.js";
import passport from '../../config/passport.js';

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Đăng ký",
  });
});

router.post("/register", handleRegister);

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Đăng nhập",
  });
});

router.get("/is-available", checkAvailable);

router.post("/login", handleLogin);

router.post("/logout", handleLogout);


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
      req.session.auth = true;
      req.session.authUser = {
          id: req.user.id,
          username: req.user.username,
          fullname: req.user.fullname,
          role: req.user.role
      };

      res.redirect('/');
  });

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
      req.session.auth = true;
      req.session.authUser = {
          id: req.user.id,
          username: req.user.username,
          fullname: req.user.fullname,
          role: req.user.role
      };
      
      res.redirect('/');
  });

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.auth = true;
    req.session.authUser = {
        id: req.user.id,
        username: req.user.username,
        fullname: req.user.fullname,
        role: req.user.role
    };
    
      res.redirect('/');
  }
);

export default router;
