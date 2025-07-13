// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
// import { createBrowserRouter, Link } from "react-router-dom";
// import { Briefcase, LogIn, LogOut, User2 } from "lucide-react";
// import { Button } from "../ui/button";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
// import Login from "../auth/Login";
// import Signup from "../auth/Signup";

// const Navbar = () => {
//   const user = false;

//   return (
//     <div className="bg-black">
//       <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
//         <div>
//           <h1 className="text-2xl font-bold  text-white">
//             <a href="/">
//               JOB <span className="text-[#00B34A]">FINDER</span>
//             </a>
//           </h1>
//         </div>
//         <div className="flex items-center gap-12">
//           <ul className="text-white flex font-medium items-center gap-5  ">
//             <li>
//               <a
//                 href="/"
//                 className="hover:text-green-400 transition duration-200"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/jobs"
//                 className="hover:text-green-400 transition duration-200"
//               >
//                 Jobs
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/about"
//                 className="hover:text-green-400 transition duration-200"
//               >
//                 About Us
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/contact"
//                 className="hover:text-green-400 transition duration-200"
//               >
//                 Contact Us
//               </a>
//             </li>
//           </ul>
//         </div>
//         {!user ? (
//           <div className="flex items-center gap-2">
//             <Link to="/login">
//               <Button variant="outline">login</Button>
//             </Link>
//             <Link to="/signup">
//               {" "}
//               <Button
//                 variant="outline"
//                 className="bg-[#00B34A] hover:bg-[#00B34A]"
//               >
//                 signup
//               </Button>
//             </Link>
//           </div>
//         ) : (
//           <Popover>
//             <PopoverTrigger asChild>
//               <Avatar className="w-9 h-9 cursor-pointer">
//                 <AvatarImage
//                   src="https://github.com/shadcn.png"
//                   alt="@shadcn"
//                   className="rounded-full object-cover"
//                 />
//               </Avatar>
//             </PopoverTrigger>
//             <PopoverContent className="w-80 ">
//               <div className="flex gap-4 my-7  space-y-3">
//                 <Avatar className="w-9 h-9  cursor-pointer">
//                   <AvatarImage
//                     src="https://github.com/shadcn.png"
//                     alt="@shadcn"
//                     className="rounded-full object-cover"
//                   />
//                 </Avatar>
//                 <div>
//                   <h4 className="font-medium">Ankush kumar</h4>
//                   <p className="text-sm text-muted-foreground">hii</p>
//                 </div>
//               </div>
//               <div className="flex flex-col  my-2 ">
//                 <div className="flex w-fit items-center gap-2 cursor-pointer">
//                   <User2 />
//                   <Button variant="link">view Profile</Button>
//                 </div>

//                 <div className="flex w-fit items-center gap-2 cursor-pointer">
//                   <LogOut />
//                   <Button variant="link">logout</Button>
//                 </div>
//               </div>
//             </PopoverContent>
//           </Popover>
//         )}
//       </div>
//     </div>
//   );
// };
// export default Navbar;

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Link, useNavigate } from "react-router-dom";
import { Briefcase, LogOut, Menu, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constant";
import { SetUser } from "@/redux/authslice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { User } = useSelector((store) => store.auth);
  const user = User;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(SetUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-black">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            <a href="/">
              JOB <span className="text-[#00B34A]">FINDER</span>
            </a>
          </h1>
        </div>

        {/* Hamburger (visible only on mobile) */}
        <div className="md:hidden">
          <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={28} />
          </button>
        </div>

        {/* Links + Auth Buttons (Desktop Only) */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="text-white flex font-medium items-center gap-5">
            {/* condition base link show */}
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-green-400">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-green-400">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  <Link to="/" className="hover:text-green-400">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-green-400">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-green-400">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-green-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-green-400">
                    Contact Us
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="bg-[#00B34A] hover:bg-[#00B34A] text-white"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="rounded-full object-cover"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="end"
                className="w-64 bg-white shadow-lg rounded-md p-4 text-black"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                      className="rounded-full object-cover"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-gray-600">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {user && user.role === "student" && (
                    <>
                      {" "}
                      <div className="flex items-center gap-2">
                        <User2 className="w-4 h-4" />
                        <Button variant="link" className="p-0 text-black">
                          <Link to="/profile"> View Profile</Link>
                        </Button>
                      </div>{" "}
                    </>
                  )}

                  <div className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="p-0 text-black"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu (Visible Only on Small Screens) */}
      {menuOpen && (
        <div className="md:hidden px-4 py-3 space-y-3 bg-black text-white">
          <ul className="space-y-3">
            <li>
              <a href="/" className="hover:text-green-400">
                Home
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-green-400">
                Jobs
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-green-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-400">
              <h1 className="">hii</h1>
                Contact Us
              </a>
            </li>
          </ul>
          <div className="pt-4 flex gap-2">
            <Link to="/login" className="w-full">
              <Button className="w-full" variant="outline">
                
                Login
              </Button>
            </Link>
            <Link to="/signup" className="w-full text-black">
              <Button
                className="w-full bg-[#00B34A] text-white hover:bg-[#00B34A]"
                variant="outline"
              >
                Signup
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
