import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT } from "@/utils/Constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/application";
import store from "@/redux/store";

const Applicants = () => {
  const params = useParams(); //to find id from url
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
       
        dispatch(setApplicants(res.data.job));

        toast.success();
      } catch (error) {}
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants.applications.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
