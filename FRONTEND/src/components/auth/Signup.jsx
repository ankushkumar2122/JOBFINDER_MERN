import { RadioGroup } from "@radix-ui/react-radio-group";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const { loading, user } = useSelector((store) => store.auth);

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
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />

      {/* Shift down on all screen sizes */}
      <div className="pt-24 px-4 flex justify-center">
        {/* Responsive width: 100% on mobile, 50% on md and up */}
        <form
          onSubmit={submithandler}
          className="w-full md:w-1/2 bg-white border border-gray-200 rounded-md p-6 shadow-md"
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>

          <div className="mb-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="Ankush"
              value={input.fullname}
              name="fullname"
              onChange={changeEventhandler}
              required
            />
          </div>

          <div className="mb-3">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="ankushkumar@gmail.com"
              value={input.email}
              name="email"
              onChange={changeEventhandler}
              required
            />
          </div>

          <div className="mb-3">
            <Label>Phone Number</Label>
            <Input
              type="tel"
              placeholder="789451231"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventhandler}
              required
            />
          </div>

          <div className="mb-3">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="****"
              value={input.password}
              name="password"
              onChange={changeEventhandler}
              required
            />
          </div>

          <div className="my-4">
            <Label className="block mb-2">Select Role</Label>
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventhandler}
                  id="student"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventhandler}
                  id="recruiter"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="my-4">
            <Label>Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changefilethandler}
              className="cursor-pointer mt-2"
            />
          </div>

          {loading ? (
            <Button className="w-full my-4 bg-[#00B34A] flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-[#00B34A]">
              Signup
            </Button>
          )}

          <span className="text-sm block text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#00B34A] font-medium">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
