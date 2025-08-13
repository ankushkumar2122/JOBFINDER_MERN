const express = require("express");
const router = express.Router();
const { getApplicationById } = require("../controllers/application.controller");
const {
  applyJob,
  getAppliedJob,
  getApplicant,
  updatestatus,
} = require("../controllers/application.controller");
const { IsAuthenticated } = require('../middleware/IsAuthenticated');


router.get("/apply/:id", IsAuthenticated, applyJob);
router.get("/get", IsAuthenticated, getAppliedJob);
router.get("/:id/applicants", IsAuthenticated, getApplicant);
router.post("/status/:id/update", IsAuthenticated, updatestatus);
router.get("/:id", IsAuthenticated, getApplicationById);
module.exports = router;