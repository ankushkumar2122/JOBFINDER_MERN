import { Badge } from "@/components/ui/badge";

import { Bookmark } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "./avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const JobId = "asdc";
  const dayAgoFunction = (mongodbTime) => {
    // kitana dinago post hua hai
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt;
    return Math.floor(timeDiffrence / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="p-5 mt-4 rounded-md  shadow-xl bg-white border border-gray-100 cursor-pointer">
      <Badge className="text-green-700 bg-green-100" variant="ghost">
       {dayAgoFunction(job?.createdAt)==0 ?"Today":`${dayAgoFunction(job?.createdAt)}Day ago`} 
      </Badge>
      <div className="text-right  ">
        <button variant="outline" className="rounded-full " size="icon">
          <Bookmark />
        </button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <button>
          <Avatar>
            <AvatarImage src="./assets/Deloitte.jpeg" />
          </Avatar>
        </button>
        <div>
          <h1 className="font-bold text-lg">{job?.company?.name}</h1>
          <p>{job?.location},India</p>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="text-right ">
        <button
          onClick={() => navigate(`/description/${job?._id}`)}
          className=" text-white bg-[#00B34A]  px-4 py-2 rounded"
        >
          Job Details
        </button>
        <button className=" text-white bg-[#00B34A]  px-4 py-2 rounded">
          save for later
        </button>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
    </div>
  );
};

export default Job;
