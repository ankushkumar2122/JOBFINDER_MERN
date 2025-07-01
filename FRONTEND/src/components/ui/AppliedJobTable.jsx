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

import React from "react";

const AppliedJobTable = () => {
  return (
    <div>
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
          {[1, 2, 3].map((Item, index) => (
            <TableRow key={index}>
              <TableCell>02-07-2025</TableCell>
              <TableCell>Frontend Devloper</TableCell>
             
              <TableCell>Google</TableCell>
              <TableCell className="text-right">
                <Badge>Selected</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
