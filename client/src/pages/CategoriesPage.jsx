import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";

const CategoriesPage = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Categories />
      <Footer/>
    </div>
  );
};

export default CategoriesPage;
