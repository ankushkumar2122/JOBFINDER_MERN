import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Filtercard from "./Filtercard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchTitle } = useSelector((store) => store.job);
  const [filterjob, setFilterJob] = useState(allJobs);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    if (searchTitle) {
      const filterjobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTitle.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTitle.toLowerCase())
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

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        {/* Filter toggle (only visible on mobile) */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            onClick={() => setShowDrawer(true)}
            className="flex items-center gap-2 text-sm bg-[#00B34A] text-white px-4 py-2 rounded-md shadow"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Layout for desktop */}
        <div className="flex gap-5">
          {/* Filter sidebar (hidden on small screens) */}
          <div className="hidden md:block w-1/4">
            <Filtercard />
          </div>

          {/* Job list */}
          <div className="flex-1 h-[calc(100vh-160px)] overflow-y-auto pb-5">
            {filterjob.length <= 0 ? (
              <span>No Jobs Found</span>
            ) : (
              filterjob.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  key={job?._id}
                >
                  <Job job={job} />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* FILTER DRAWER (mobile only) */}
      {showDrawer && (
        <>
          {/* Backdrop */}
          <div
            className="fixed left-0 right-0 bottom-0 top-[64px] bg-black bg-opacity-50 z-40"
            onClick={() => setShowDrawer(false)}
          ></div>

          {/* Drawer */}
          <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-3/4 max-w-xs bg-white z-50 shadow-lg p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setShowDrawer(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <Filtercard />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Jobs;
