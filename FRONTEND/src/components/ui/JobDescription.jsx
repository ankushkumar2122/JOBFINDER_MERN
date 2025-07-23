import React, { useEffect, useState } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/Constant";
import { setSingleJob } from "@/redux/JobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some((application) => application.applicant === user._id) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobid = params.id;
  const dispatch = useDispatch();

  // Apply Function
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // Fetch Job Data on Mount
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobid}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobid, dispatch, user?._id]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        {/* Header with title, badges and Apply button for desktop */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">{singleJob?.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Badge className="text-blue-700 font-bold" variant="ghost">
                {singleJob?.position} Position
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          {/* Apply Button (Desktop only) */}
          <Button
            onClick={isApplied ? undefined : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg max-w-[180px] w-full ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#00B34A] text-white hover:bg-[#00B34A]/90"
            } hidden md:block`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <h2 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6">
          {singleJob?.description}
        </h2>

        <div className="my-4 space-y-2">
          {[
            { label: "Role", value: singleJob?.title },
            { label: "Location", value: singleJob?.location },
            { label: "Description", value: singleJob?.description },
            { label: "Experience", value: `${singleJob?.experienceLevel} Years` },
            { label: "Salary", value: `${singleJob?.salary} LPA` },
            { label: "Total Applicants", value: singleJob?.applications?.length },
            {
              label: "Posted Date",
              value: singleJob?.createdAt?.split("T")[0],
            },
          ].map(({ label, value }) => (
            <h3 key={label} className="font-bold">
              {label}:{" "}
              <span className="pl-4 font-normal text-gray-800 break-words">{value}</span>
            </h3>
          ))}
        </div>

        {/* Apply Button (Mobile only, below details) */}
        <div className="mt-6 md:hidden">
          <Button
            onClick={isApplied ? undefined : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg w-full ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#00B34A] text-white hover:bg-[#00B34A]/90"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
