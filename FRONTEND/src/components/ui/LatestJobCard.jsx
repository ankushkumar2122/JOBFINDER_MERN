import React from "react";
import { Badge } from "@/components/ui/badge";
// import { MdOutlineBookmarkAdd } from "react-icons/md";
export const LatestJobCard = () => {
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
            10 min ago
          </Badge>
          {/* <MdOutlineBookmarkAdd /> */}
          <div>
            <h1 className=" mt-2 font-medium text-lg"> companyName</h1>
            <p className=" text-sm text-gray-600">India</p>
          </div>
          <div>
            <h1 className="font-bold text-lg my-2">Data Analyst </h1>
            <p className=" text-sm text-gray-500">description</p>
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
      </div>

       <div className="p-5 mt-4 rounded-md  shadow-xl bg-white border border-gray-100 cursor-pointer ">
        <div>
          <Badge className="text-green-700 bg-green-100" variant="default">
            10 min ago
          </Badge>
          {/* <MdOutlineBookmarkAdd /> */}
          <div>
            <h1 className=" mt-2 font-medium text-lg"> companyName</h1>
            <p className=" text-sm text-gray-600">India</p>
          </div>
          <div>
            <h1 className="font-bold text-lg my-2">Data Analyst </h1>
            <p className=" text-sm text-gray-500">description</p>
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
      </div>

       <div className="p-5 mt-4 rounded-md  shadow-xl bg-white border border-gray-100 cursor-pointer ">
        <div>
          <Badge className="text-green-700 bg-green-100" variant="default">
            10 min ago
          </Badge>
          {/* <MdOutlineBookmarkAdd /> */}
          <div>
            <h1 className=" mt-2 font-medium text-lg"> companyName</h1>
            <p className=" text-sm text-gray-600">India</p>
          </div>
          <div>
            <h1 className="font-bold text-lg my-2">Data Analyst </h1>
            <p className=" text-sm text-gray-500">description</p>
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
      </div>

       <div className="p-5 mt-4 rounded-md  shadow-xl bg-white border border-gray-100 cursor-pointer ">
        <div>
          <Badge className="text-green-700 bg-green-100" variant="default">
            10 min ago
          </Badge>
          {/* <MdOutlineBookmarkAdd /> */}
          <div>
            <h1 className=" mt-2 font-medium text-lg"> companyName</h1>
            <p className=" text-sm text-gray-600">India</p>
          </div>
          <div>
            <h1 className="font-bold text-lg my-2">Data Analyst </h1>
            <p className=" text-sm text-gray-500">description</p>
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
      </div>
    </>
  );
};
