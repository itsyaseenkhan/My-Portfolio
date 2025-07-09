import React, { useEffect, useState, useRef } from 'react';
import Typed from 'typed.js';
import '../Pages/Hero.css'; 
import Navbar from '../components/Navbar';
import About from '../components/About';
import Skill from '../components/Skill';
import Project from '../components/Project';
import Education from '../components/Education';
import Contact from './Contact';

const Home = () => {
  const [data, setData] = useState(null);
  const typedRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/adminhome")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  useEffect(() => {
    if (!data?.roles) return;
    const typed = new Typed(typedRef.current, {
      strings: data.roles,
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy();
  }, [data]);

  if (!data) return <div style={{textAlign: "center", marginTop: "100px"}}>Loading...</div>;

  const { name, bio, imageUrl, cvLink } = data;

  return (
    <>
    <div className="admin-Home-form" id="Home"></div>
    <div className="hero-container">
      <Navbar/>
   
      <div className="hero-text">
        <h1>Hello, I am <br /> <span>{name}</span></h1>
        <h2>I am a <span ref={typedRef} className="typed-span" /></h2>
        <p>{bio}</p>
        {cvLink && (
          <a href={cvLink} target="_blank" rel="noreferrer">
            <button className="download-btn">Download CV</button>
          </a>
        )}
      </div>
      <div className="hero-image"> 
        <div className="image-border">
          <img 
            src={`http://localhost:5000/${imageUrl}`} 
            alt="Profile" 
          />
        </div>
      </div> 
    </div>
      <About/>
      <Skill/>
      <Project/>
      <Education/>
      <Contact/>
     </>
  );
};

export default Home;
