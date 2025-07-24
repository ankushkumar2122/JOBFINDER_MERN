import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/JobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Content below fixed Navbar */}
      <div className="max-w-6xl mx-auto pt-[80px] px-4 sm:px-6 pb-10">
        {/* Search & Button - Responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-[300px]"
            placeholder="Filter by Name, Role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto"
          >
            New Job
          </Button>
        </div>

        {/* Table */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
