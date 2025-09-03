import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaFileDownload,
} from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
  const [user, setUser] = useState(null);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://my-portfolio-q3dv.onrender.com/api/v1/UserRouter/portfolio/me",
          { withCredentials: true }
        );

        const fetchedUser = data?.user || {};
        setUser(fetchedUser);

        let arr = [];
        if (Array.isArray(fetchedUser?.typewriterText)) {
          arr = fetchedUser.typewriterText.flatMap((item) =>
            item.split(",").map((t) => t.trim())
          );
        } else if (typeof fetchedUser?.typewriterText === "string") {
          arr = fetchedUser.typewriterText.split(",").map((t) => t.trim());
        }

        setTexts(arr.filter(Boolean));
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      }
    };

    getUserProfile();
  }, []);

  const [typedText] = useTypewriter({
    words: texts.length ? texts : ["loading......."],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  return (
    <div className="hero-container" id="Hero">
      <div className="hero-inner">
        {/* Left Section */}
        <div className="hero-text">
          <div className="online-status">
            <span className="online-dot"></span>
            <span>𝐎𝐧𝐥𝐢𝐧𝐞</span>
          </div>

          <h1 className="hero-heading">
            Hey, I'm <br /> {user?.fullName}
          </h1>

          <h2 className="hero-subheading">
            I am a <span className="highlight">{typedText}</span>
            <Cursor />
          </h2>

          {/* GitHub & Resume */}
          <div className="github-resume-container">
            {user?.githubUrl && (
              <a
                href={user.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon-text"
                title="GitHub Profile"
              >
                <FaGithub className="icon" />
                <span>GitHub</span>
              </a>
            )}

            {user?.resume?.url && (
              <a
                href={user.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon-text"
                title="Download Resume"
              >
                <FaFileDownload className="icon" />
                <span>Resume</span>
              </a>
            )}
          </div>

          {user?.AboutMe && (
            <p className="hero-description">{user.AboutMe}</p>
          )}

          {/* Social Icons */}
          <div className="social-icons">
            {user?.instagramURL && (
              <a
                href={user.instagramURL}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link instagram"
              >
                <FaInstagram />
              </a>
            )}
            {user?.linkedInURL && (
              <a
                href={user.linkedInURL}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link linkedin"
              >
                <FaLinkedin />
              </a>
            )}
            {user?.facebookURL && (
              <a
                href={user.facebookURL}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link facebook"
              >
                <FaFacebook />
              </a>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="hero-image-container">
          {user?.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt={user?.fullName || "Profile"}
              className="profile-image"
            />
          ) : (
            <div className="image-placeholder" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
