const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth")

router.post("/register", authController.register);
// router.get("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get('/register', (req, res) => {
  res.render('register', {
    title: "Register",
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    title: "Login",
  });
});


module.exports = router;