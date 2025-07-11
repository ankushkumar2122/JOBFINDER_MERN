import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./ui/HeroSection";
import LatestJobs from "./ui/LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
useEffect(() => {
  if (user?.role == "recruiter") {
    navigate("/admin/companies");
  }
}, [user]);

  return (
    <div>
      <Navbar />
      <HeroSection />

      <LatestJobs />
      {/* <BrowseByCategory/>
      <Review/>
      <NewsAndBlog/> */}
      <Footer />
    </div>
  );
};
export default Home;
