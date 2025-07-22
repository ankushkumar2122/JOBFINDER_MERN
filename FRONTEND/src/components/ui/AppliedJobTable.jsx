import React from "react";
import { useSelector } from "react-redux";
import { Badge } from "./badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A List of your applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!Array.isArray(allAppliedJobs) || allAppliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't applied to any jobs yet
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedjob) => (
              <TableRow key={appliedjob._id}>
                <TableCell>{appliedjob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedjob?.job?.title}</TableCell>
                <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedjob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedjob?.status === "pending"
                        ? "bg-blue-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedjob?.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
