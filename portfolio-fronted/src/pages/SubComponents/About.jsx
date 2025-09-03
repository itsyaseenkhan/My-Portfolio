import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllAbouts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://my-portfolio-q3dv.onrender.com/api/v1/AboutRouter/getAll",
          { withCredentials: true }
        );
        setAbouts(Array.isArray(data.abouts) ? data.abouts : []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getAllAbouts();
  }, []);

  // ✅ Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, delay: 0.3 },
    },
  };

  return (
    <>
      <style>{`
        .about-bg {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          overflow: hidden;
          background: #111827;
        }

        /* ✅ Big Gear (center + upar shift) */
        .gear-center {
          position: absolute;
          top: 35%; /* ⬆️ gear ko thoda upar shift karne ke liye */
          left: 50%;
          transform: translate(-50%, -50%);
          width: 650px;
          height: 650px;
          background: url("https://img.icons8.com/ios-filled/500/444444/gear.png") no-repeat center;
          background-size: contain;
          opacity: 0.08;
          animation: spin 50s linear infinite;
          z-index: 0; /* content ke niche */
          pointer-events: none;
        }

        /* ✅ Other Gears */
        .gear {
          position: absolute;
          width: 220px;
          height: 220px;
          background: url("https://img.icons8.com/ios-filled/500/888888/gear.png") no-repeat center;
          background-size: contain;
          opacity: 0.15;
          animation: spin 40s linear infinite;
          z-index: 0;
        }
        .gear.small {
          width: 140px;
          height: 140px;
          opacity: 0.2;
          animation-duration: 25s;
        }
        .gear.reverse {
          animation-direction: reverse;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .about-section {
          position: relative;
          z-index: 2; /* ✅ content upar */
          max-width: 1150px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 70px;
          flex-wrap: wrap;
          text-align: left;
        }

        .about-image-container {
          position: relative;
          width: 100%;
          max-width: 380px;
          aspect-ratio: 1 / 1.25;
          border-radius: 22px;
          padding: 8px;
          background: linear-gradient(135deg, #00b4db, #0083b0, #1a2980);
          background-size: 300% 300%;
          animation: glow 8s ease infinite, float 5s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(0,0,0,0.55);
          transition: transform 0.3s ease;
        }
        .about-image-container:hover {
          transform: scale(1.05);
        }
        .about-image {
          width: 100%;
          height: 100%;
          border-radius: 18px;
          object-fit: cover;
          border: 3px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 25px rgba(0,0,0,0.6);
        }

        @keyframes glow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .about-text { 
          flex: 1; 
          min-width: 280px;
          max-width: 580px;
        }
        .about-text h1 {
          font-size: clamp(2rem, 4vw, 2.8rem);
          color: white;
          font-weight: 700;
          margin-bottom: 16px;
          text-shadow: 0 2px 12px rgba(0,255,255,0.5);
        }
        .about-text p {
          font-size: clamp(1rem, 1.5vw, 1.07rem);  
          line-height: 1.6;                          
          color: #e0e0e0;
        }

        /* ✅ Tablet */
        @media (max-width: 1024px) {
          .gear-center { width: 480px; height: 480px; top: 38%; }
          .about-section { gap: 50px; }
          .about-image-container { max-width: 320px; }
        }

        /* ✅ Mobile */
        @media (max-width: 768px) {
          .gear-center { width: 280px; height: 280px; top: 40%; }
          .about-section { flex-direction: column; gap: 35px; text-align: left; }
          .about-image-container { max-width: 260px; }
          .about-text { max-width: 100%; }
          .about-text h1 { margin-bottom: 12px; }
        }

        /* ✅ Extra Small */
        @media (max-width: 480px) {
          .gear-center { width: 220px; height: 220px; top: 42%; }
          .about-image-container { max-width: 200px; }
          .about-text h1 { font-size: 1.8rem; }
          .about-text p { font-size: 0.9rem; }
        }
      `}</style>

      {loading ? (
        <p style={{ textAlign: "center", color: "#fff" }}>⏳ Loading...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "#ff4c4c" }}>❌ Failed to load About section</p>
      ) : abouts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa" }}>📭 No About data found</p>
      ) : (
        <div id="about">
          <div className="about-bg">
            {/* ✅ Big Center Gear */}
            <div className="gear-center"></div>

            {/* ✅ Other Animated Gears */}
            <div className="gear" style={{ top: "10%", left: "5%" }}></div>
            <div className="gear reverse" style={{ bottom: "10%", right: "10%" }}></div>
            <div className="gear small" style={{ top: "40%", right: "20%" }}></div>
            <div className="gear small reverse" style={{ bottom: "20%", left: "15%" }}></div>

            {abouts.map((about) => (
              <motion.div
                className="about-section"
                key={about._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                {/* ✅ Image */}
                <motion.div
                  className="about-image-container"
                  variants={imageVariants}
                >
                  {about.image && (
                    <img
                      src={about.image.url || about.image}
                      alt={about.title}
                      className="about-image"
                    />
                  )}
                </motion.div>

                {/* ✅ Text */}
                <motion.div className="about-text" variants={textVariants}>
                  <h1>{about.title}</h1>
                  <p>{about.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default About;
