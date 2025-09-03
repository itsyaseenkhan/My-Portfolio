import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [visibleSkills, setVisibleSkills] = useState({});
  const [counters, setCounters] = useState({});
  const [fills, setFills] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await axios.get(
          "https://my-portfolio-q3dv.onrender.com/api/v1/skillRouter/getall",
          { withCredentials: true }
        );
        setSkills(data.skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    getMySkills();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.dataset.id;
          if (entry.isIntersecting && !visibleSkills[id]) {
            setVisibleSkills((prev) => ({ ...prev, [id]: true }));

            const end = parseInt(entry.target.dataset.proficiency, 10);
            let start = 0;
            const duration = 1200;
            const increment = end / (duration / 16);

            const animate = () => {
              start += increment;
              if (start < end) {
                setCounters((prev) => ({ ...prev, [id]: Math.floor(start) }));
                setFills((prev) => ({ ...prev, [id]: start }));
                requestAnimationFrame(animate);
              } else {
                setCounters((prev) => ({ ...prev, [id]: end }));
                setFills((prev) => ({ ...prev, [id]: end }));
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    const bars = containerRef.current?.querySelectorAll(".skill-card");
    bars?.forEach((bar) => observer.observe(bar));

    return () => observer.disconnect();
  }, [skills, visibleSkills]);

  return (
    <div className="skills-wrapper" id="Skills">
      {/* 🔥 Fullscreen Floating Shapes Background */}
      <div className="skills-bg">
        {Array.from({ length: 35 }).map((_, i) => {
          const shapes = ["◯", "△", "▢", "✕"];
          const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
          const randomLeft = Math.random() * 100; // random x
          const randomDelay = Math.random() * 15; // different delays
          const randomDuration = 20 + Math.random() * 20; // 20s to 40s
          const randomSize = 1.5 + Math.random() * 2; // font-size scale

          return (
            <span
              key={i}
              className="skills-shape"
              style={{
                left: `${randomLeft}%`,
                fontSize: `${randomSize}rem`,
                animationDuration: `${randomDuration}s`,
                animationDelay: `${randomDelay}s`,
              }}
            >
              {randomShape}
            </span>
          );
        })}
      </div>

      <div className="skills-content">
        <motion.h1
          className="skills-heading"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          MY <span className="skills-highlight">SKILLS</span>
        </motion.h1>

        <div className="skills-grid" ref={containerRef}>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <motion.div
                key={skill._id}
                className="skill-card"
                data-id={skill._id}
                data-proficiency={skill.proficiency}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="skill-top">
                  <div className="skill-info">
                    {skill.Svg?.url && (
                      <img
                        src={skill.Svg.url}
                        alt={skill.title}
                        className="skill-logo"
                      />
                    )}
                    <span className="skill-title">{skill.title}</span>
                  </div>
                  <div className="skill-percent">
                    {counters[skill._id] ?? 0}%
                  </div>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-fill"
                    style={{
                      width: `${fills[skill._id] ?? 0}%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  ></motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="skills-empty">You have not added any skills yet.</div>
          )}
        </div>
      </div>

      <style jsx>{`
        .skills-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: 6rem 1rem;
          overflow: hidden;
          background: linear-gradient(180deg, #0f172a, #1e293b);
        }

        /* 🔥 Background Shapes */
        .skills-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        .skills-shape {
          position: absolute;
          color: rgba(255, 255, 255, 0.12);
          animation-name: floatShapes;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes floatShapes {
          0% {
            transform: translateY(110vh) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Content */
        .skills-content {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .skills-heading {
          font-size: 3.5rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 3rem;
          color: #f0f0f0;
        }
        .skills-highlight {
          background: linear-gradient(90deg, #38bdf8, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          justify-items: center;
        }
        .skill-card {
          width: 100%;
          max-width: 450px;
          background: rgba(30, 41, 59, 0.65);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
        }
        .skill-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .skill-info {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }
        .skill-logo {
          width: 30px;
          height: 30px;
          object-fit: contain;
        }
        .skill-title {
          font-size: 1rem;
          font-weight: 600;
          color: #e2e8f0;
        }
        .skill-percent {
          font-size: 1rem;
          font-weight: 600;
          color: #38bdf8;
        }
        .skill-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        .skill-fill {
          height: 100%;
          background: linear-gradient(90deg, #38bdf8, #6366f1);
        }
        .skills-empty {
          text-align: center;
          padding: 2rem;
          font-size: 1rem;
          color: #94a3b8;
        }

        @media (min-width: 900px) {
          .skills-grid {
            grid-template-columns: 1fr 1fr;
            justify-items: center;
          }
        }
        @media (max-width: 600px) {
          .skills-heading {
            font-size: 2.2rem;
          }
          .skill-title {
            font-size: 0.9rem;
          }
          .skill-percent {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Skills;
