import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Filtercard from "./Filtercard";
import Job from "./Job";

const JobArray = [1, 2, 3];
const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 ">
        <div className="flex gap-5">
          <div className="w-1/4">
            <Filtercard />
          </div>

          {JobArray.length <= 0 ? (
            <span>Job Not Found</span>
          ) : (
            //  <div className="flex-1 pb-5">
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              {/* overflow auto se scrollbar aya hai */}

              <div>
                {JobArray.map((item, index) => (
                  <div>
                    <Job />
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
