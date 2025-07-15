import { setSingleCompany } from "@/redux/CompanySlice";
import { setAllJobs } from "@/redux/JobSlice";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyid) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get${companyid}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyid,dispatch]);
};

export default useGetCompanyById;
