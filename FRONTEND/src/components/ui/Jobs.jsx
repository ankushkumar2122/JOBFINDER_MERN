import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Filtercard from "./Filtercard";
import Job from "./Job";
import { useSelector } from "react-redux";

// const JobArray = [1, 2, 3,4];
const Jobs = () => {
  const {allJobs}=useSelector(store=>store.job)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 ">
        <div className="flex gap-5">
          <div className="w-1/4">
            <Filtercard />
          </div>

          {allJobs.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            //  <div className="flex-1 pb-5">
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              {/* overflow auto se scrollbar aya hai */}

              <div>
                {allJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* filter */}
      {/* jobcard */}
      <Footer />
    </div>
  );
};

export default Jobs;
