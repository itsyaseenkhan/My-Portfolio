import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../pages/SubComponents/Hero";
import Timeline from "../pages/SubComponents/Timeline";
import About from "../pages/SubComponents/About";
import Skills from "../pages/SubComponents/Skills";
import Contact from "../pages/SubComponents/Contact";
import Portfolio from "../pages/SubComponents/Portfolio";
import Navbar from "./SubComponents/Navbar";
import "./SubComponents/Hero.css";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = () => {
      axios
        .get("https://my-portfolio-q3dv.onrender.com/api/v1/UserRouter/portfolio/me", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("User Data:", res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          setTimeout(fetchUserData, 3000);
        });
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <article>
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Portfolio />
      <Contact />
    </article>
  );
};

export default Home;
