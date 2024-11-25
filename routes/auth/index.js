import express from "express";

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Đăng ký",
  });
});

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Đăng nhập",
  });
});

export default router;
