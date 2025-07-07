import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "@/components/ui/button";

import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetUser } from "@/redux/authslice";
import { USER_API_END_POINT } from "@/utils/Constant";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [Loading, setLoading] = useState(false);
  const user = useSelector((store) => store.auth.User);

  const [input, setInput] = useState({
    //fetch data of user
    fullname: user?.fullname,
    email: user?.email,
    phonenumber: user?.phonenumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.join(", ") || "",

    file: null,
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      const skillArray = value.split(",").map((skill) => skill.trim()); // remove extra spaces
      setInput({ ...input, skills: skillArray });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed!");
        return;
      }
      setInput({ ...input, file });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phonenumber);
    formData.append("bio", input.bio);
    formData.append("skills", JSON.stringify(input.skills));

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(SetUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  onChange={changeEventHandler}
                  value={input.fullname}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={changeEventHandler}
                  value={input.email}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <Input
                  id="number"
                  name="number"
                  onChange={changeEventHandler}
                  value={input.phonenumber}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  onChange={changeEventHandler}
                  value={input.skills}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {Loading ? (
                <Button className="w-full my-4 bg-[#00B34A]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-[#00B34A]">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
