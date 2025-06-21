import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authslice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading);


  const changeEventhandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changefilethandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submithandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phonenumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
       dispatch(setLoading(false));
    }

    // setInput({ ...input, file: e.target.files?.[0] });
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submithandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Ankush"
              value={input.fullname}
              name="fullname"
              onChange={changeEventhandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Ankushkumar@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventhandler}
            />
          </div>
          <div className="my-2">
            <Label>Number</Label>
            <Input
              type="number"
              placeholder="789451231"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventhandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="****"
              value={input.password}
              name="password"
              onChange={changeEventhandler}
            />
          </div>
          <div className="flex items-center justify-center">
            <RadioGroup className="flex items-center gap-4 my-5 pr-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  onChange={changeEventhandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div> </div>
            <div className="flex items-center  gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changefilethandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4 bg-[#00B34A]">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-[#00B34A]">
              signup
            </Button>
          )}
          {/* <Button type="submit" className="w-full my-4 bg-[#00B34A]">
           
          </Button> */}
          <span className="text-sm">
            already have an account?{" "}
            <Link to="/login" className="text-[#00B34A]">
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};
export default Signup;
