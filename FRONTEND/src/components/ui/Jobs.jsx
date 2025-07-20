import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Filtercard from "./Filtercard";
import Job from "./Job";
import { useSelector } from "react-redux";

// const JobArray = [1, 2, 3,4];
const Jobs = () => {
  const { allJobs, searchTitle } = useSelector((store) => store.job);
  const [filterjob, setFilterJob] = useState(allJobs);
  useEffect(() => {
    if (searchTitle) {
      const filterjobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTitle.toLowerCase())||job.location.toLowerCase().includes(searchTitle.toLowerCase())
        );
      });
      setFilterJob(filterjobs);
    } else {
      setFilterJob(allJobs);
    }
  }, [allJobs, searchTitle]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 ">
        <div className="flex gap-5">
          <div className="w-1/4">
            <Filtercard />
          </div>

          {filterjob.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            //  <div className="flex-1 pb-5">
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              {/* overflow auto se scrollbar aya hai */}

              <div>
                {filterjob.map((job) => (
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
