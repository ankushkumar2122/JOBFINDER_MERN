const express = require("express");
const router = express.Router();
const { IsAuthenticated } = require("../middleware/isAuthenticated");
// const { singleUpload } = require("../middleware/multer");
const {
  register,
  login,
  updateprofile,
  logout,
} = require("../controllers/user.controller");

const User = require("../models/user.model"); // Add this if not already imported
const { singleUpload } = require("../middleware/multer");


// Register route
router.post("/register", singleUpload, register);

// Login route
router.post("/login", login);

// Logout route
router.get("/logout", logout);

// ✅ Get current logged-in user
router.get("/me", IsAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const userData = {
      userId: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({ user: userData, success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// Profile update route
router.post("/profile/update", singleUpload, IsAuthenticated, updateprofile);

module.exports = router;
