import React, { useState } from "react";
import { Avatar, AvatarImage } from "./avatar";
import Navbar from "../shared/Navbar";
import { Button } from "./button";
import { Contact, Mail, Pen, User } from "lucide-react";
import { Badge } from "./badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedjobs from "@/hooks/useGetAppliedjobs";

// const skills = ["HTML", "CSS", "REACT", "MONGODB", "NODE JS", "EXPRESS"];
const isResume = true;
function Profile() {
  useGetAppliedjobs();
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.auth.User);
  console.log("Resume URL:", user?.profile?.resume);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 ">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>

            <div className="">
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p> {user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right "
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phonenumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1 flex-wrap">
            {user?.profile?.skills && user.profile.skills.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="_blank"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-xl">Applied Jobs</h1>
        {/* Apllication table */}
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
