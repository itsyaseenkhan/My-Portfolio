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
          "http://localhost:5000/api/v1/timeline/getall",
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
      document.querySelectorAll(".timeline-item").forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          item.classList.add("show");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: radial-gradient(circle at 100%, #333, #333 70%, #333 95%);
          color: #fff;
        }
        .timeline-container {
          max-width: 1000px;
          margin: auto;
          height: 100vh;
          padding: 60px 20px;
        }
        .timeline-heading {
          text-align: center;
          font-size: 2.8rem;
          font-weight: 700;
          margin-bottom: 60px;
          letter-spacing: 1px;
          color: #fff;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
          /* This fixes the anchor scroll offset */
          scroll-margin-top: 80px; /* adjust if your navbar height is different */
        }
        .timeline-list {
          position: relative;
          padding-left: 0;
          margin: 0;
        }
        .timeline-list::before {
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
        .timeline-item {
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
        .timeline-item.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .timeline-item:nth-child(odd) {
          left: 0;
        }
        .timeline-item:nth-child(even) {
          left: 55%;
        }
        .timeline-dot {
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
        .timeline-title {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: #fff;
        }
        .timeline-time {
          font-size: 0.95rem;
          color: #d1d5db;
          margin-bottom: 15px;
          display: block;
        }
        .timeline-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #e5e7eb;
        }
        /* Skeleton Loader */
        .loading {
          background: linear-gradient(90deg, #2e2e2e 25%, #3e3e3e 50%, #2e2e2e 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        .skeleton-heading {
          height: 30px;
          width: 200px;
          margin: 0 auto 40px;
          border-radius: 8px;
        }
        .skeleton-title {
          height: 20px;
          width: 60%;
          margin-bottom: 8px;
          border-radius: 4px;
        }
        .skeleton-time {
          height: 14px;
          width: 40%;
          margin-bottom: 12px;
          border-radius: 4px;
        }
        .skeleton-description {
          height: 14px;
          width: 100%;
          margin-bottom: 6px;
          border-radius: 4px;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        /* Responsive */
        @media (max-width: 768px) {
          .timeline-list::before {
            left: 20px;
          }
          .timeline-item {
            width: 100%;
            left: 0 !important;
            margin-left: 40px;
          }
          .timeline-dot {
            left: 20px;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="timeline-container">
        {loading ? (
          <>
            <div className="skeleton-heading loading"></div>
            <ol className="timeline-list">
              {[...Array(4)].map((_, i) => (
                <li className="timeline-item loading" key={i}>
                  <div className="skeleton-title loading"></div>
                  <div className="skeleton-time loading"></div>
                  <div className="skeleton-description loading"></div>
                  <div className="skeleton-description loading" style={{ width: "80%" }}></div>
                </li>
              ))}
            </ol>
          </>
        ) : error ? (
          <div className="error-message">❌ Failed to load timeline data</div>
        ) : timeline.length === 0 ? (
          <div className="empty-state">📭 No timeline entries found</div>
        ) : (
          <>
            <h1 id="MYTimelines" className="timeline-heading">MY Timelines</h1>
            <ol className="timeline-list">
              {timeline.map((element, index) => (
                <li
                  className="timeline-item"
                  key={element._id}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <span className="timeline-dot"></span>
                  <h3 className="timeline-title">{element.title}</h3>
                  <time className="timeline-time">
                    {element.timeline.from} - {element.timeline.to || "Present"}
                  </time>
                  <p className="timeline-description">{element.description}</p>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </>
  );
};

export default Timeline;
