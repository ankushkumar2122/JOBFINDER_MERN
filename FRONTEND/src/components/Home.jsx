import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./ui/HeroSection";
import LatestJobs from "./ui/LatestJobs";
import Footer from "./shared/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection/>
    
      <LatestJobs/>
      {/* <BrowseByCategory/>
      <Review/>
      <NewsAndBlog/> */}
      {/* <Footer/>  */}
    </div>
  );
};
export default Home;
