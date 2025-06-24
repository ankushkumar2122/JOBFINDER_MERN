// rafce ->sortcuts

import React from "react";
import { LatestJobCard } from "./LatestJobCard";

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl">Recent Jobs Available</h1>
      <LatestJobCard />
    </div>
  );
};

export default LatestJobs;
