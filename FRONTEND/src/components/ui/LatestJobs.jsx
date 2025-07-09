// rafce ->sortcuts

import React from "react";
import { LatestJobCard } from "./LatestJobCard";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="font-bold text-3xl">Recent Jobs Available</h1>
      {allJobs?.slice(0, 6).map((job) => (
        <LatestJobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default LatestJobs;
