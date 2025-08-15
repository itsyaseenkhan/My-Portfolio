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
          "http://localhost:5000/api/v1/AboutRouter/getAll",
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

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.3 } },
  };

  return (
    <>
      <style>{`
        .about-bg {
          width: 100%;
          background: radial-gradient(circle at 100%, #111, #222 70%, #333 95%);
          padding: 80px 20px;
        }
        .about-section {
          max-width: 1200px;
          margin: auto;
          display: flex;
          
          align-items: center;
          justify-content: center;
          gap: 80px;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }
        .about-image-container {
          position: relative;
          width: 400px;
          height: 450px;
          border-radius: 25px;
          padding: 6px;
          background: linear-gradient(45deg, #204473, #00b3b3, #007777);
          background-size: 300% 300%;
          animation: glow 6s ease infinite, float 4s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
          transition: transform 0.3s ease;
        }
        .about-image-container:hover {
          transform: scale(1.05) rotate(1deg);
        }
        .about-image {
          width: 390px;
          height: 440px;
          border-radius: 20px;
          object-fit: cover;
          border: 5px solid #111;
          box-shadow: 0 8px 20px rgba(0,0,0,0.5);
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
        .about-text { flex: 1; min-width: 300px; }
        .about-text h1 {
          font-size: 4rem; /* Increased font size */
          color: #00ffff;
          font-weight: bold;
          margin-top: -25px; /* Added negative margin-top */
          margin-bottom: 20px;
          text-shadow: 0 2px 10px rgba(0,255,255,0.5);
        }
        .about-text p {
          font-size: 1.2rem;
          line-height: 1.7;
          color: #f1f1f1;
        }
        @media (max-width: 768px) {
          .about-section { flex-direction: column; text-align: center; }
          .about-image-container { width: 250px; height: 250px; }
          .about-image { width: 240px; height: 240px; }
          .about-text h1 { font-size: 2.5rem; margin-top: -15px; }
        }
      `}</style>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: "center" }}>❌ Failed to load About section</p>
      ) : abouts.length === 0 ? (
        <p style={{ textAlign: "center" }}>📭 No About data found</p>
      ) : (
        <div id="about">
          <div className="about-bg">
            {abouts.map((about) => (
              <motion.div
                className="about-section"
                key={about._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
              >
                <motion.div className="about-image-container" variants={imageVariants}>
                  {about.image && <img src={about.image.url || about.image} alt={about.title} className="about-image" />}
                </motion.div>
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
