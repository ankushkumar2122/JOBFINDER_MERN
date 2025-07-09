import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "./avatar";
// import { MdOutlineBookmarkAdd } from "react-icons/md";
export const LatestJobCard = ({ job }) => {
  const dayAgoFunction = (mongodbTime) => {
    // kitana dinago post hua hai
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt;
    return Math.floor(timeDiffrence / (1000 * 24 * 60 * 60));
  };
  return (
    <>
      <div className="text-right">
        {/* //move button right */}
        <a href=""></a>
        <button className="text-[#00B34A]  ">View all</button>
      </div>

      <div className="p-5 mt-4 rounded-md  shadow-xl bg-white border border-gray-100 cursor-pointer ">
        <div>
          <Badge className="text-green-700 bg-green-100" variant="default">
            {dayAgoFunction(job?.createdAt)==0 ?"Today":`${dayAgoFunction(job?.createdAt)}Day ago`} 
          </Badge>
          {/* <MdOutlineBookmarkAdd /> */}
          <div>
            <h1 className=" mt-2 font-medium text-lg"> {job?.company?.name}</h1>
            <p className=" text-sm text-gray-600">{job?.location},India</p>
          </div>
          {/* <div className="flex items-center gap-2 my-2">
                  <button>
                    <Avatar>
                      <AvatarImage src="./assets/Deloitte.jpeg" />
                    </Avatar>
                  </button>
                  </div> */}
          <div>
            <h1 className="font-bold text-lg my-2">{job?.title} </h1>
            <p className=" text-sm text-gray-500">{job?.description}</p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {job?.position}Postions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {job?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {job?.salary}LPA
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
};
