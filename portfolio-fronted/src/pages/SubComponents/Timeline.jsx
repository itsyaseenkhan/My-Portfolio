import React, { useEffect, useState } from "react";
import axios from "axios";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllTimelines = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://my-portfolio-q3dv.onrender.com/api/v1/timeline/getall",
          { withCredentials: true }
        );
        setTimeline(data.timeline || []);
      } catch (err) {
        console.error("Error fetching timeline:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getAllTimelines();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".timeline-section .tl-item").forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          item.classList.add("tl-show");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="timeline-section">
      <style>{`
        .timeline-section {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #000; /* Background only for this section */
          color: #fff;
          padding: 80px 20px;
          overflow: hidden;
        }

        
        .timeline-section .tl-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
          background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
        }

        .timeline-section .tl-dot {
          position: absolute;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: tl-float 15s linear infinite;
        }

        @keyframes tl-float {
          0% {
            transform: translateY(-10vh) scale(0.5);
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) scale(1);
            opacity: 0;
          }
        }

        /* Timeline Styles */
        .timeline-section .tl-container {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          height: auto; /* ✅ Auto height */
          position: relative;
          z-index: 1;
        }

        .timeline-section .tl-heading {
          text-align: center;
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 60px;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .timeline-section .tl-list {
          position: relative;
          padding-left: 0;
          margin: 0;
        }

        .timeline-section .tl-list::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #8b5cf6, #3a0ca3);
          border-radius: 2px;
        }

        .timeline-section .tl-item {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          color: #fff;
          border-radius: 16px;
          padding: 25px;
          margin: 25px 0;
          position: relative;
          width: 45%;
          opacity: 0;
          transform: translateY(50px) scale(0.98);
          transition: all 0.6s ease-out;
          box-shadow: 0 6px 30px rgba(0,0,0,0.3);
        }

        .timeline-section .tl-item.tl-show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .timeline-section .tl-item:nth-child(odd) {
          left: 0;
        }

        .timeline-section .tl-item:nth-child(even) {
          left: 55%;
        }

        .timeline-section .tl-dot-center {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, #ff6ec7, #3a0ca3);
          box-shadow: 0 0 12px rgba(255, 110, 199, 0.8);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          border: 3px solid #fff;
          z-index: 2;
        }

        .timeline-section .tl-title {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .timeline-section .tl-time {
          font-size: 0.95rem;
          color: #d1d5db;
          margin-bottom: 15px;
          display: block;
        }

        .timeline-section .tl-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #e5e7eb;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .timeline-section .tl-list::before {
            left: 20px;
          }
          .timeline-section .tl-item {
            width: 100%;
            left: 0 !important;
            margin-left: 40px;
          }
          .timeline-section .tl-dot-center {
            left: 20px;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Background Animation */}
      <div className="tl-background">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 8 + 2;
          const left = Math.random() * 100;
          const duration = Math.random() * 10 + 10;
          const delay = Math.random() * 10;
          return (
            <div
              key={i}
              className="tl-dot"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <div className="tl-container">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <div>❌ Failed to load timeline data</div>
        ) : timeline.length === 0 ? (
          <div>📭 No timeline entries found</div>
        ) : (
          <>
            <h1 id="MYTimelines" className="tl-heading">MY Timelines</h1>
            <ol className="tl-list">
              {timeline.map((element, index) => (
                <li
                  className="tl-item"
                  key={element._id}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="tl-dot-center"></span>
                  <h3 className="tl-title">{element.title}</h3>
                  <time className="tl-time">
                    {element.timeline.from} - {element.timeline.to || "Present"}
                  </time>
                  <p className="tl-description">{element.description}</p>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
};

export default Timeline;
