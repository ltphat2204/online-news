import express from "express";
import { checkAvailable,
         handleLogin,
         handleLogout,
         handleRegister} from "../../controllers/auth.js";

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
export default router;
