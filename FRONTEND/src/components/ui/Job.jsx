import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "./avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const dayAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 mt-4 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition hover:shadow-lg">
      {/* Top badge */}
      <div className="flex justify-between items-center">
        <Badge className="text-green-700 bg-green-100" variant="ghost">
          {dayAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${dayAgoFunction(job?.createdAt)} Day ago`}
        </Badge>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-3 flex-wrap sm:flex-nowrap">
        <Avatar>
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div className="text-sm sm:text-base">
          <h1 className="font-bold">{job?.company?.name}</h1>
          <p className="text-gray-600">{job?.location}, India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mt-3 space-y-2">
        <h1 className="font-bold text-lg">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Job Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#F83002] font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Job Details Button */}
      <div className="mt-5 text-right">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="bg-[#00B34A] text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Job Details
        </button>
      </div>
    </div>
  );
};

export default Job;
