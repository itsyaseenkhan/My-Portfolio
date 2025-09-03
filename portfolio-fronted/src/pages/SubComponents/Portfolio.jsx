import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const { data } = await axios.get(
          "https://my-portfolio-q3dv.onrender.com/api/v1/ProjectRoute/getall",
          { withCredentials: true }
        );
        setProjects(data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getAllProjects();
  }, []);

  const handleProjectClick = (projectId, e) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      if (activeProject === projectId) {
        navigate(`/project/${projectId}`);
      } else {
        setActiveProject(projectId);
      }
    }
  };

  return (
    <div className="portfolio-wrapper" id="Portfolio">
      {/* Heading Section */}
      <div className="heading-container">
        <h1 className="portfolio-heading">
          My <span>Portfolio</span>
        </h1>
        <p className="portfolio-subheading">
          A showcase of my latest projects and creative work.
        </p>
        <div className="heading-underline"></div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {(viewAll ? projects : projects.slice(0, 9)).map((project) => (
          <Link
            to={`/project/${project._id}`}
            key={project._id}
            className="project-link"
            aria-label={`View details for ${project.title}`}
            onClick={(e) => handleProjectClick(project._id, e)}
          >
            <img
              src={project.projectBanner?.url || ""}
              alt={project.title || "Project Image"}
              className="project-image"
              loading="lazy"
            />
            <div
              className={`overlay ${
                activeProject === project._id ? "overlay-show" : ""
              }`}
            >
              <h3 className="overlay-title">{project.title}</h3>
              <div className="overlay-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="icon"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 3h7v7m0 0L10 21m11-11L10 21"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show More Button */}
      {projects.length > 9 && (
        <div className="button-container">
          <Button className="button" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .portfolio-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          height:100vh;
          padding: 1rem 1.5rem;
          scroll-margin-top: 100px;
        }

        /* Heading styles */
        .heading-container {
          text-align: center;
          margin-bottom: 2rem;
          margin-top: 30px;
        }

        .portfolio-heading {
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .portfolio-heading span {
          color: #38bdf8;
        }

        .portfolio-subheading {
          font-size: clamp(0.9rem, 2vw, 1rem);
          color: #64748b;
          max-width: 500px;
          margin: 0 auto 1rem;
        }

        .heading-underline {
          width: 80px;
          height: 4px;
          background-color: #38bdf8;
          margin: 0.5rem auto 0;
          border-radius: 2px;
        }

        /* Grid layout */
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
          }
        }

        /* Project card */
        .project-link {
          position: relative;
          display: block;
          border-radius: 12px;
          overflow: hidden;
          background: #0d0d0d;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.3s ease;
        }

        .project-link:hover,
        .project-link:focus {
          box-shadow: 0 8px 24px rgba(56, 189, 248, 0.5);
        }

        .project-image {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          display: block;
        }

        /* Overlay effect */
        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(56, 189, 248, 0.85),
            rgba(239, 68, 68, 0.95)
          );
          color: white;
          opacity: 0;
          transform: translateY(100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 1rem;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .project-link:hover .overlay,
          .project-link:focus .overlay {
            opacity: 1;
            transform: translateY(0%);
          }
        }

        .overlay-show {
          opacity: 1 !important;
          transform: translateY(0%) !important;
        }

        .overlay-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        /* Icon styles */
        .overlay-icon {
          background: white;
          border-radius: 50%;
          padding: 0.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          color: #ef4444;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .overlay-icon:hover {
          background-color: #f87171;
          transform: scale(1.1);
        }

        .icon {
          width: 20px;
          height: 20px;
        }

        /* Button container */
        .button-container {
          width: 100%;
          text-align: center;
          margin: 2rem 0;
        }

        .button {
          width: 100%;
          min-width: auto;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.6rem 1.5rem;
        }

        @media (min-width: 640px) {
          .button {
            width: auto;
            min-width: 180px;
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
