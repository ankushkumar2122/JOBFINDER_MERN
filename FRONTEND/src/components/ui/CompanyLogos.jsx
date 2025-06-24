import React from "react";

const logos = [
  "/assets/spotify.jpeg",
  "/assets/Argusoft.jpeg",
  "/assets/infosys-logo.jpg",
  "/assets/TCS.png",
  "/assets/wipro-logo.png",
  "/assets/accenture.png",
  "/assets/Deloitte.jpeg",
  // Add more logos if needed
];

const CompanyLogos = () => {
  return (
    <div className="relative bg-gradient-to-r from-black via-neutral-900 to-black py-8  w-full overflow-hidden">
      {/* Optional: Gradient Fade Overlay on Left & Right */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div className="overflow-hidden w-full">
        <div className="flex animate-scroll gap-16 w-max px-10">
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Company Logo"
              className="h-14 w-auto grayscale hover:grayscale-0 transition duration-300 brightness-110 hover:scale-105"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyLogos;
