import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [visibleSkills, setVisibleSkills] = useState({});
  const [counters, setCounters] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    const getMySkills = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/skillRouter/getall",
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

            let start = 0;
            const end = entry.target.dataset.proficiency;
            const duration = 1000;
            const increment = end / (duration / 16);
            const animate = () => {
              start += increment;
              if (start < end) {
                setCounters((prev) => ({ ...prev, [id]: Math.floor(start) }));
                requestAnimationFrame(animate);
              } else {
                setCounters((prev) => ({ ...prev, [id]: end }));
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = containerRef.current?.querySelectorAll(".skill-card");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [skills, visibleSkills]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const skillVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="skills-section" id="Skills">
      <div className="skills-container">
        <motion.h1
          className="skills-title"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          MY <span className="highlight">SKILLS</span>
        </motion.h1>

        <motion.div
          className="skills-grid"
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.length > 0 ? (
            skills.map((skill) => (
              <motion.div
                key={skill._id}
                className="skill-wrapper"
                variants={skillVariants}
              >
                <Card
                  className="skill-card"
                  data-id={skill._id}
                  data-proficiency={skill.proficiency}
                >
                  <div className="card-content">
                    {skill.Svg?.url && (
                      <div className="icon-container">
                        <img
                          src={skill.Svg.url}
                          alt={skill.title}
                          className="skill-icon"
                        />
                        <div className="icon-backdrop" />
                      </div>
                    )}
                    <div className="skill-info">
                      <p className="skill-name">{skill.title}</p>
                      <div className="proficiency-value">
                        {counters[skill._id] ?? 0}%
                      </div>
                    </div>
                    <div className="progress-container">
                      <div
                        className="progress-track"
                        style={{ "--progress": `${skill.proficiency}%` }}
                      >
                        <div className="progress-indicator" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="no-skills">You have not added any skills yet.</div>
          )}
        </motion.div>
      </div>

      <style jsx>{`
        .skills-section {
          background: radial-gradient(circle at 100%, #222, #111 95%);
          min-height: 95vh;
          padding: 4rem 1rem;
          position: relative;
          overflow: hidden;
        }
        .skills-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .skills-title {
          font-size: 3rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 4rem;
          color: #f0f0f0;
        }
        .highlight {
          background: linear-gradient(90deg, #38bdf8, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }
        .skill-card {
          width: 250px;
          height: 310px;
          border-radius: 20px;
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(12px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem;
          box-sizing: border-box;
        }
        .card-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
        .icon-container {
          position: relative;
          margin-bottom: 1.5rem;
        }
        .skill-icon {
          width: 140px;
          height: auto;
          object-fit: contain;
          z-index: 2;
        }
        .icon-backdrop {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          background: radial-gradient(circle, rgba(56,189,248,0.2), transparent 70%);
          border-radius: 50%;
          z-index: 1;
        }
        .skill-info {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .skill-name {
          font-size: 1.3rem;
          font-weight: 600;
          color: #e2e8f0;
          margin-bottom: 0.3rem;
        }
        .proficiency-value {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .progress-container {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 5px;
          overflow: hidden;
        }
        .progress-track {
          height: 100%;
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 5px;
        }
        .progress-indicator {
          height: 100%;
          width: var(--progress, 0%);
          background: linear-gradient(90deg, #38bdf8, #6366f1);
          border-radius: 5px;
          transition: width 1s ease-in-out;
        }
        .progress-indicator::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.25),
            transparent
          );
          animation: progressGlow 1.5s infinite linear;
        }
        @keyframes progressGlow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .no-skills {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          font-size: 1.2rem;
          color: #94a3b8;
          background: rgba(30, 41, 59, 0.4);
          border-radius: 16px;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1rem;
          }
          .skill-card {
            width: 100%;
            height: auto;
            padding: 1rem;
          }
          .skill-icon {
            width: 100px;
            height: 100px;
          }
          .proficiency-value {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Skills;
