import React from "react";
import { Briefcase, Users, Building2 } from "lucide-react";
import CompanyLogos from "./CompanyLogos";

const HeroSection = () => {
  return (
    <div
      className="relative text-white"
      style={{
        backgroundImage: "url('/assets/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "90vh"

      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[90vh] px-4">
        <div className="text-center">
          <h1 className="font-bold text-4xl md:text-5xl mb-4">
            Discover Your Dream Job. Apply Today
          </h1>
          <p className="text-lg mb-6">
            Connecting talent with opportunity. Your gateway to career success.
          </p>
              {/* input field */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center gap-4 max-w-5xl mx-auto text-black ring-1 ring-gray-200">
            <select
              className="border border-gray-300 rounded-full px-5 py-3 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#00B34A] transition duration-200"
              defaultValue=""
            >
              <option value="" disabled>
                Select Job Title
              </option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Full Stack Engineer</option>
            </select>

            <select
              className="border border-gray-300 rounded-full px-5 py-3 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#00B34A] transition duration-200"
              defaultValue=""
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="remote">Remote</option>
            </select>

            <select
              className="border border-gray-300 rounded-full px-5 py-3 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#00B34A] transition duration-200"
              defaultValue=""
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="it">IT</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
            </select>

            <button className="bg-[#00B34A] hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full w-full md:w-auto transition-all duration-300 shadow-md hover:shadow-lg">
              🔎 Search Job
            </button>
          </div>
    {/* overview of job company and candidate */}
 <div className="flex flex-col md:flex-row justify-center items-center gap-10 py-10 bg-transparent">
      {/* Jobs */}
      <div className="flex items-center space-x-4">
        <div className="bg-[#00B34A] p-4 rounded-full">
          <Briefcase className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-white font-bold text-xl">25</h2>
          <p className="text-white text-sm">Jobs</p>
        </div>
      </div>

      {/* Candidates */}
      <div className="flex items-center space-x-4">
        <div className="bg-[#00B34A] p-4 rounded-full">
          <Users className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-white font-bold text-xl">100</h2>
          <p className="text-white text-sm">Candidates</p>
        </div>
      </div>

      {/* Companies */}
      <div className="flex items-center space-x-4">
        <div className="bg-[#00B34A] p-4 rounded-full">
          <Building2 className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-white font-bold text-xl">180</h2>
          <p className="text-white text-sm">Companies</p>
        </div>
      </div>
    </div>
    

        </div>
      </div>
      <CompanyLogos/>
    </div>
  );
};

export default HeroSection;
