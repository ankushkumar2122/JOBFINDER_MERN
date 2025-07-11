const express = require("express");
const router = express.Router();
const {
  postJob,
  getAllJob,
  getJobId,
  getAdminJobs,
} = require("../controllers/job.controller");
const { IsAuthenticated } = require('../middleware/IsAuthenticated');



router.post("/post", IsAuthenticated, postJob);
router.get("/get", IsAuthenticated, getAllJob);
router.get("/getadminjobs", IsAuthenticated, getAdminJobs);
// Change POST to PUT for updating profile
router.get("/get/:id", IsAuthenticated, getJobId);

module.exports = router;
