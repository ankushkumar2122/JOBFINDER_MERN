import { Badge } from "@/components/ui/badge";

import { Bookmark } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "./avatar";

const Job = () => {
  return (
    <div className="p-5 mt-4 rounded-md  shadow-xl bg-white border border-gray-100 cursor-pointer">
      <Badge className="text-green-700 bg-green-100" variant="ghost">
        11 min ago
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
          <h1 className="font-bold text-lg">Company name</h1>
          <p>India</p>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600">description</p>
      </div>
      <div className="text-right ">
        <button className=" text-white bg-[#00B34A]  px-4 py-2 rounded">
          Job Details
        </button>
        <button className=" text-white bg-[#00B34A]  px-4 py-2 rounded">
         save for later
        </button>
      </div>

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
  );
};

export default Job;
