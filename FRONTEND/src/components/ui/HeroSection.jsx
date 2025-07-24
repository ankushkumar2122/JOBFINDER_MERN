// import React from "react";
// import { Briefcase, Users, Building2 } from "lucide-react";
// import CompanyLogos from "./CompanyLogos";

// const HeroSection = () => {
//   return (
//     <div
//       className="relative text-white"
//       style={{
//         backgroundImage: "url('/assets/hero-bg.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "90vh"

//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

//       {/* Content */}
//       <div className="relative z-10 flex items-center justify-center min-h-[90vh] px-4">
//         <div className="text-center">
//           <h1 className="font-bold text-4xl md:text-5xl mb-4">
//             Discover Your Dream Job. Apply Today
//           </h1>
//           <p className="text-lg mb-6">
//             Connecting talent with opportunity. Your gateway to career success.
//           </p>
//               {/* input field */}
//      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto text-black ring-1 ring-gray-200">
//   {/* Job Title Dropdown */}
//   <select
//     className="border border-gray-300 rounded-full px-5 py-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#00B34A] transition duration-200"
//     defaultValue=""
//   >
//     <option value="" disabled>Select Job Title</option>
//     <option value="frontend">Frontend Developer</option>
//     <option value="backend">Backend Developer</option>
//     <option value="mobile">Mobile App Developer</option>
//     <option value="python">Python Developer</option>
//     <option value="data-analyst">Data Analyst</option>
//     <option value="devops">DevOps Engineer</option>
//   </select>

//   {/* Location Dropdown */}
//   <select
//     className="border border-gray-300 rounded-full px-5 py-3 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#00B34A] transition duration-200"
//     defaultValue=""
//   >
//     <option value="" disabled>Select Location</option>
//     <option value="delhi">Delhi</option>
//     <option value="mumbai">Mumbai</option>
//     <option value="bangalore">Bangalore</option>
//     <option value="hyderabad">Hyderabad</option>
//     <option value="pune">Pune</option>
//     <option value="remote">Remote</option>
//   </select>

//   {/* Search Button */}
//   <button className="bg-[#00B34A] hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full w-full md:w-auto transition-all duration-300 shadow-md hover:shadow-lg">
//     🔍 Search Job
//   </button>
// </div>

//     {/* overview of job company and candidate */}
//  <div className="flex flex-col md:flex-row justify-center items-center gap-10 py-10 bg-transparent">
//       {/* Jobs */}
//       <div className="flex items-center space-x-4">
//         <div className="bg-[#00B34A] p-4 rounded-full">
//           <Briefcase className="text-white w-6 h-6" />
//         </div>
//         <div>
//           <h2 className="text-white font-bold text-xl">25</h2>
//           <p className="text-white text-sm">Jobs</p>
//         </div>
//       </div>

//       {/* Candidates */}
//       <div className="flex items-center space-x-4">
//         <div className="bg-[#00B34A] p-4 rounded-full">
//           <Users className="text-white w-6 h-6" />
//         </div>
//         <div>
//           <h2 className="text-white font-bold text-xl">100</h2>
//           <p className="text-white text-sm">Candidates</p>
//         </div>
//       </div>

//       {/* Companies */}
//       <div className="flex items-center space-x-4">
//         <div className="bg-[#00B34A] p-4 rounded-full">
//           <Building2 className="text-white w-6 h-6" />
//         </div>
//         <div>
//           <h2 className="text-white font-bold text-xl">180</h2>
//           <p className="text-white text-sm">Companies</p>
//         </div>
//       </div>
//     </div>

//         </div>
//       </div>
//       <CompanyLogos/>
//     </div>
//   );
// };

// export default HeroSection;

import React, { useEffect, useState } from "react";
import { Briefcase, Users, Building2 } from "lucide-react";
import CompanyLogos from "./CompanyLogos";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSerchTitle } from "@/redux/JobSlice";

const HeroSection = () => {
  const { applicants } = useSelector((store) => store.application);
  const { companies } = useSelector((store) => store.company);
  const { allJobs } = useSelector((store) => store.job);
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fullText = "Discover Your Dream Job. Apply Today";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100: 100;

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => {
        const updatedText = isDeleting
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1);

        if (!isDeleting && updatedText === fullText) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && updatedText === "") {
          setIsDeleting(false);
          setIndex(0);
        }

        return updatedText;
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  const searchJobHandler = () => {
    dispatch(setSerchTitle(title));
    navigate("/browse");
  };

  return (
    <div
      className="relative text-white pt-24"
      style={{
        backgroundImage: "url('/assets/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center w-full">
          {/* 🔁 Looping Typewriter Text */}
          <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl mb-4 leading-tight">
            {displayedText}
            <span className="text-[#00B34A] animate-pulse">|</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg mb-6 px-2 sm:px-0">
            Connecting talent with opportunity. Your gateway to career success.
          </p>

          {/* Search Input */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto text-black ring-1 ring-gray-200">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter Job Title"
              className="border border-gray-300 rounded-full px-5 py-3 w-full sm:w-[60%] focus:outline-none focus:ring-2 focus:ring-[#00B34A] transition duration-200"
            />
            <button
              onClick={searchJobHandler}
              className="bg-[#00B34A] hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full w-full sm:w-[30%] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              🔍 Search Job
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 py-10 px-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-[#00B34A] p-4 rounded-full">
                <Briefcase className="text-white w-6 h-6" />
              </div>
              <h2 className="text-white font-bold text-xl">
                {allJobs?.length || 0}
              </h2>
              <p className="text-white text-sm">Jobs</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="bg-[#00B34A] p-4 rounded-full">
                <Users className="text-white w-6 h-6" />
              </div>
              <h2 className="text-white font-bold text-xl">
                {applicants?.applications?.length || 0}
              </h2>
              <p className="text-white text-sm">Candidates</p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="bg-[#00B34A] p-4 rounded-full">
                <Building2 className="text-white w-6 h-6" />
              </div>
              <h2 className="text-white font-bold text-xl">
                {companies?.length || 0}
              </h2>
              <p className="text-white text-sm">Companies</p>
            </div>
          </div>
        </div>
      </div>

      <CompanyLogos />
    </div>
  );
};

export default HeroSection;
