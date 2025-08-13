const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification.model");
const { IsAuthenticated } = require("../middleware/IsAuthenticated");

// Get notifications of logged-in user
router.get("/", IsAuthenticated, async (req, res) => {
  try {
    const userId = req.id; // from middleware
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ notifications, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// Mark notification as read
router.post("/:id/read", IsAuthenticated, async (req, res) => {
  try {
    const notificationId = req.params.id;

    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { status: "read" },
      { new: true } // return updated doc
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found", success: false });
    }

    res.status(200).json({
      message: "Notification marked as read",
      notification: updatedNotification,
      success: true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

module.exports = router;
