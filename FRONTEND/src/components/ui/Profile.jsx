import React from "react";
import { Avatar, AvatarImage } from "./avatar";
import Navbar from "../shared/Navbar";
import { Button } from "./button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./badge";
import { Label } from "@radix-ui/react-label";
import AppliedJobTable from "./AppliedJobTable";

const skills = ["HTML", "CSS", "REACT", "MONGODB", "NODE JS", "EXPRESS"];
function Profile() {
  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 ">
              <AvatarImage src="./assets/Ankush.jpg" alt="profile" />
            </Avatar>

            <div className="">
              <h1 className="font-medium text-xl">Ankush Kumar</h1>
              <p>FullStack Devloper</p>
            </div>
          </div>
          <Button className="text-right " variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>ankush@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>8409513387</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skill</h1>
          <div className="flex items-center gap-1">
            {skills.length !== 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank "
              href=""
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              Ankush
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
          <h1>Applied Jobs</h1>
          {/* Apllication table */}
          <AppliedJobTable/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
