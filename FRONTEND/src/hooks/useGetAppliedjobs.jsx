import { setAllAppliedJobs } from "@/redux/JobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import { useEffect } from "react";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useGetAppliedjobs = () => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    const fetchAppliedjobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log(res.data)
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
       console.log(error)
      }
    };
    fetchAppliedjobs();
  }, []);
};

export default useGetAppliedjobs;
