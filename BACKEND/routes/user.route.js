const express = require("express");
const router = express.Router();

const {
  register,
  login,
  updateprofile,
  logout,
} = require("../controllers/user.controller");
const { IsAuthenticated } = require("../Middleware/isAuthenticated");
const { singleUpload } = require("../Middleware/multer");

router.post("/register", singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/profile/update", singleUpload, IsAuthenticated, updateprofile);

module.exports = router;
