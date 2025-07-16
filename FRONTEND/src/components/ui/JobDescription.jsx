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
 const { User } = useSelector((store) => store.auth);
   const user = User;


  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant == user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobid = params.id;
  const dispatch = useDispatch();
  // useGetSingleJob(jobid);//custom hook
console.log("Job ID:", jobid); // ✅ Check this
console.log("User ID:", user?._id); // ✅ Check this

  const applyJobHandler = async () => {
    //apply function
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); //update the localstate
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); //for real time ui update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!user?._id) return; 
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobid}`, {
          withCredentials: true,
        });
        //  console.log("Job Data:", res.data);

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant == user?._id
            )
          ); //ensure the state is in sync with fetch data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobid, dispatch, user?._id]);

  return (
    <>
     <Navbar/>
  
    <div className="max-w-7xl mx-auto my-10">
     
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl"> {singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Position
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>


        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#00B34A] text-white hover:bg-[#00B34]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>

        
      </div>
      <h1 className=" border-b-2 border-b-gray-300  font-medium  py-4">
        {singleJob?.description}
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} Years
          </span>
        </h1>

        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicant:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
      </>
  );
};

export default JobDescription;
