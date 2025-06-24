import React from "react";
import { Badge } from "@/components/ui/badge";
// import { MdOutlineBookmarkAdd } from "react-icons/md";
export const LatestJobCard = () => {
  return (
    <>
      <div className="text-right">
        {/* //move button right */}
        <button className="text-[#00B34A]  ">View all</button>
      </div>
      <div>
        <Badge className="text-green-700 bg-green-100" variant="default">
          10 min ago
        </Badge>
 {/* <MdOutlineBookmarkAdd /> */}
        <div>
        <h3 className="mt-2 font-bold">Data Analyst</h3>
        <p>companyName</p>
        </div>
      </div>
    </>
  );
};
