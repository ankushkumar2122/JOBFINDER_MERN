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
import { LogOut, Menu, User2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constant";
import { SetUser } from "@/redux/authslice";
import NotificationBell from "../ui/NotificationBell";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

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
        toast.success(res.data.message || "Logged out successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
        {/* Brand */}
        <h1 className="text-2xl font-bold text-white">
          <Link to="/">
            JOB <span className="text-[#00B34A]">FINDER</span>
          </Link>
        </h1>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button className="text-white" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="text-white flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
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

          {/* **Notification Bell Add Here (Only if user is logged in)** */}
          {user && <NotificationBell />}

          {/* Auth Buttons or Profile */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="bg-[#00B34A] hover:bg-[#00B34A] text-white"
                  variant="outline"
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
                    alt="Profile"
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback>
                    {user?.fullname?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="end"
                className="w-64 bg-white text-black shadow-lg rounded-md p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-9 h-9">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="User"
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback>
                      {user?.fullname?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-gray-600">
                      {user?.profile?.bio || user?.email}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {user.role === "student" && (
                    <div className="flex items-center gap-2">
                      <User2 className="w-4 h-4" />
                      <Link to="/profile">
                        <Button variant="link" className="p-0 text-black">
                          View Profile
                        </Button>
                      </Link>
                    </div>
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

      {/* Mobile Sidebar */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-64 bg-black z-50 text-white shadow-lg flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-green-500">JOB FINDER</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
              {!user || user.role === "student" ? (
                <>
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-green-400"
                  >
                    Home
                  </Link>
                  <Link
                    to="/jobs"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-green-400"
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/browse"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-green-400"
                  >
                    Browse
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-green-400"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-green-400"
                  >
                    Contact Us
                  </Link>
                  {user?.role === "student" && (
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-green-400"
                    >
                      View Profile
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/admin/companies"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-green-400"
                  >
                    Companies
                  </Link>
                  <Link
                    to="/admin/jobs"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-green-400"
                  >
                    Jobs
                  </Link>
                </>
              )}
            </nav>

            <div className="p-4 border-t border-gray-700">
              {!user ? (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full bg-[#00B34A] text-white hover:bg-[#00B34A] mb-2">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMenuOpen(false)}>
                    <Button className="w-full bg-[#00B34A] text-white hover:bg-[#00B34A]">
                      Signup
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="user"
                        className="rounded-full object-cover"
                      />
                      <AvatarFallback>
                        {user?.fullname?.[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{user?.fullname}</p>
                      <p className="text-xs text-gray-400">
                        {user?.profile?.bio || user?.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      logoutHandler();
                      setMenuOpen(false);
                    }}
                    className="w-full bg-red-600 text-white hover:bg-red-700"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
