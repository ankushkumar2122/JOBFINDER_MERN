import React from "react";
import Navbar from "../shared/Navbar";

const About = () => {
  return (
   
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-20">
       <Navbar/>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          About Us
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to JobFinder — your trusted platform for connecting talented
          professionals with top companies. Our mission is to simplify the job
          search and recruitment process, making it seamless and efficient for
          both job seekers and employers.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          We believe that the right job can transform lives. That’s why we
          provide a curated selection of opportunities, comprehensive company
          profiles, and powerful tools to help you find the perfect match.
          Whether you’re a fresh graduate or an experienced professional,
          JobFinder is here to guide you every step of the way.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Our Values
        </h2>

        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Integrity:</strong> We operate with transparency and honesty.</li>
          <li><strong>Innovation:</strong> We continuously improve our platform and services.</li>
          <li><strong>Community:</strong> We support job seekers and employers alike.</li>
          <li><strong>Excellence:</strong> We strive for the best in everything we do.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">
          Meet the Developer
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <img
              src="/assets/AnkushSingh.jpg"
              alt="Ankush Singh"
              className="mx-auto rounded-full w-32 h-32 object-cover mb-4 shadow-lg"
            />
            <h3 className="text-xl font-semibold text-gray-900">Ankush Singh</h3>
            <p className="text-green-600 font-medium">Developer</p>
          </div>

          {/* Team Member 2 */}
         
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} JobFinder. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
