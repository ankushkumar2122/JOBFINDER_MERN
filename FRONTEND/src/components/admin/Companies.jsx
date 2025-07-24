import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { searchCompanyByText } from "@/redux/CompanySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      {/* Add padding top to push content below fixed navbar */}
      <div className="max-w-6xl mx-auto my-10 px-4 pt-24 sm:pt-28">
        {/* Responsive flex: stack on small screens */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-5">
          <Input
            className="w-full sm:w-auto"
            placeholder="Filter by Name"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="w-full sm:w-auto"
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
