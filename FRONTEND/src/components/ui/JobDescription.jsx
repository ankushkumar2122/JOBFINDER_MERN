import React from "react";
import { Badge } from "./badge";
import { Button } from "./button";

const JobDescription = () => {
  const isApplied = false;
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Title</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              12 Position
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              Part Time
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              24LPA
            </Badge>
          </div>
        </div>
        <Button
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
      <h1 className=" border-b-2 border-b-gray-300  font-medium  py-4">Job Description</h1>
      <div>

      </div>
    </div>
  );
};

export default JobDescription;
