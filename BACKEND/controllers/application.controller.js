// const Application = require("../models/Application.model");
// const Notification = require("../models/Notification.model");
// const Job = require("../models/job.model");

// const applyJob = async (req, res) => {
//   try {
//     const userId = req.id;
//     const JobId = req.params.id;

//     if (!JobId) {
//       return res.status(400).json({ message: "job Id required", success: false });
//     }

//     // Check if user already applied
//     const existingApplication = await Application.findOne({
//       job: JobId,
//       applicant: userId,
//     });

//     if (existingApplication) {
//       return res
//         .status(400)
//         .json({ message: "You have already applied for this job", success: false });
//     }

//     // Check if job exists
//     const job = await Job.findById(JobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found", success: false });
//     }

//     // Create application
//     const newapplication = await Application.create({
//       job: JobId,
//       applicant: userId,
//     });

//     job.applications.push(newapplication._id);
//     await job.save();

//     return res.status(201).json({ message: "Job applied successfully", success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// const getAppliedJob = async (req, res) => {
//   try {
//     const userId = req.id;
//     const application = await Application.find({ applicant: userId })
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "job",
//         options: { sort: { createdAt: -1 } },
//         populate: {
//           path: "company",
//           options: { sort: { createdAt: -1 } },
//         },
//       });

//     if (!application || application.length === 0) {
//       return res.status(404).json({ message: "No applications found", success: false });
//     }

//     return res.status(200).json({ application, success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// // Admin - see all applicants for a job
// const getApplicant = async (req, res) => {
//   try {
//     const jobid = req.params.id;
//     const job = await Job.findById(jobid).populate({
//       path: "applications",
//       options: { sort: { createdAt: -1 } },
//       populate: { path: "applicant" },
//     });

//     if (!job) {
//       return res.status(404).json({ message: "Job not found", success: false });
//     }

//     return res.status(200).json({ job, success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// const updatestatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const applicationId = req.params.id;

//     if (!status) {
//       return res.status(400).json({ message: "status is required", success: false });
//     }

//     // Application + Job + Company + Applicant एक साथ populate
//     const application = await Application.findById(applicationId)
//       .populate({
//         path: "job",
//         populate: {
//           path: "company",
//            model: "Company",  
//         },
//       })
//       .populate("applicant");

//     if (!application) {
//       return res.status(404).json({ message: "application not found", success: false });
//     }

//     // // Debugging के लिए console log
//     // console.log("💾 Application Data:", application);
//     // console.log("📌 Job in Application:", application?.job);
//     // console.log("🏢 Company in Job:", application?.job?.company);

//     // Company name 
//     const companyName = application?.job?.company?.name || "Unknown Company";

//     // Application status update
//     application.status = status.toLowerCase();
//     await application.save();

//     // Notification 
//     const notificationMessage = `Your application for ${companyName} has been ${status}.`;
// // console.log("📢 Notification Message:", notificationMessage);

//     const notification = new Notification({
//       userId: application.applicant._id,
//       applicationId: application._id,
//       message: notificationMessage,
//       status: "pending",
//     });

//     await notification.save();

//     return res.status(200).json({
//       message: "status updated and notification sent",
//       success: true
//     });

//   } catch (error) {
//     console.error("💥 Server Error in updatestatus:", error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };




// module.exports = { applyJob, getAppliedJob, getApplicant, updatestatus };




const Application = require("../models/Application.model");
const Notification = require("../models/Notification.model");
const Job = require("../models/job.model");

const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const JobId = req.params.id;

    if (!JobId) {
      return res.status(400).json({ message: "job Id required", success: false });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: JobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job", success: false });
    }

    // Check if job exists
    const job = await Job.findById(JobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // Create application
    const newapplication = await Application.create({
      job: JobId,
      applicant: userId,
    });

    job.applications.push(newapplication._id);
    await job.save();

    return res.status(201).json({ message: "Job applied successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!application || application.length === 0) {
      return res.status(404).json({ message: "No applications found", success: false });
    }

    return res.status(200).json({ application, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Admin - see all applicants for a job
const getApplicant = async (req, res) => {
  try {
    const jobid = req.params.id;
    const job = await Job.findById(jobid).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

const updatestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({ message: "status is required", success: false });
    }

    // console.log("🔄 Updating application status...");
    // console.log("📌 Application ID:", applicationId);
    // console.log("📌 New Status:", status);

    // Application + Job + Company + Applicant
    const application = await Application.findById(applicationId)
      .populate({
        path: "job",
        populate: {
          path: "company",
          model: "Company",
        },
      })
      .populate("applicant");

    if (!application) {
      console.log("❌ Application not found");
      return res.status(404).json({ message: "application not found", success: false });
    }

    // console.log("✅ Found application for user:", application?.applicant?.name);
    // console.log("🏢 Company:", application?.job?.company?.name);

    // Company name
    const companyName = application?.job?.company?.name || "Unknown Company";

    // Application status update
    application.status = status.toLowerCase();
    await application.save();
    // console.log("✅ Application status updated to:", application.status);

    // Notification
    const notificationMessage = `Your application for ${companyName} has been ${status}.`;
    // console.log("📢 Notification to send:", notificationMessage);

    const notification = new Notification({
      userId: application.applicant._id,
      applicationId: application._id,
      message: notificationMessage,
      status: "pending",
    });

    await notification.save();
    // console.log("✅ Notification saved");

    return res.status(200).json({
      message: "status updated and notification sent",
      success: true,
    });
  } catch (error) {
    console.error("💥 Server Error in updatestatus:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// NEW: Get single application by ID
const getApplicationById = async (req, res) => {
  try {
    const applicationId = req.params.id;
    console.log("🔍 Fetching application:", applicationId);

    const application = await Application.findById(applicationId)
      .populate({
        path: "job",
        populate: { path: "company" },
      })
      .populate("applicant");

    if (!application) {
      return res.status(404).json({ message: "Application not found", success: false });
    }

    return res.status(200).json({ application, success: true });
  } catch (error) {
    console.error("💥 Error in getApplicationById:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = { 
  applyJob, 
  getAppliedJob, 
  getApplicant, 
  updatestatus, 
  getApplicationById // added in export
};