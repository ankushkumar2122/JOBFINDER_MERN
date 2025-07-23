import React, { useState } from "react";
import { Avatar, AvatarImage } from "./avatar";
import Navbar from "../shared/Navbar";
import { Button } from "./button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedjobs from "@/hooks/useGetAppliedjobs";

const Profile = () => {
  useGetAppliedjobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      {/* Padding to avoid overlap with fixed navbar */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
              <div>
                <h1 className="font-semibold text-xl">{user?.fullname}</h1>
                <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button onClick={() => setOpen(true)} variant="outline">
                <Pen className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="my-6 space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Contact className="w-4 h-4" />
              <span>{user?.phonenumber}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="my-6">
            <h2 className="font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge key={index}>{skill}</Badge>
                ))
              ) : (
                <span className="text-gray-500">Not added</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="my-6">
            <Label className="font-semibold text-sm">Resume</Label>
            {user?.profile?.resume ? (
              <div className="mt-1">
                <a
                  href={user?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline break-all text-sm"
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              </div>
            ) : (
              <span className="text-gray-500 text-sm">No resume uploaded</span>
            )}
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="max-w-4xl mx-auto mt-8 bg-white border border-gray-200 rounded-2xl p-6 sm:p-8">
          <h2 className="font-bold text-xl mb-4">Applied Jobs</h2>
          <AppliedJobTable />
        </div>
      </div>

      {/* Update Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
