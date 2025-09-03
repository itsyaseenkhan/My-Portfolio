import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleReturnToDashboard = () => navigate("/");

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `https://my-portfolio-q3dv.onrender.com/api/v1/ProjectRoute/get/${id}`,
          { withCredentials: true }
        );

        const project = res.data.project;

        console.log("📌 Project data from API:", project);

        setTitle(project.title || project.name || project.projectName || "Untitled Project");
        setDescription(project.description || "");
        setStack(project.stack || "");
        setDeployed(project.deployed || "No");
        setGitRepoLink(project.gitRepoLink || "");
        setTechnologies(project.technologies || "");
        setProjectLink(project.projectLink || "");
        setProjectBanner(project.projectBanner?.url || "");
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    getProject();
  }, [id]);

  const descriptionList = (description || "").split(",");
  const technologiesList = (technologies || "").split(",");

  return (
    <>
      <style>
        {`
          .container {
            min-height: 100vh;
            background-color: #f9fafb;
            padding: 20px 12px;
            display: flex;
            justify-content: center;
          }

          .card {
            width: 100%;
            max-width: 1024px;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
          }

          .banner {
            display: flex;
            flex-direction: column;
            position: relative;
          }
          .banner-title {
            background: #111827;
            color: white;
            padding: 12px 16px;
            font-size: clamp(18px, 2vw, 24px);
            font-weight: bold;
          }
          .banner img {
            width: 100%;
            height: auto;
            max-height: 280px;
            object-fit: cover;
          }
          .back-button {
            position: absolute;
            top: 12px;
            right: 12px;
            background: rgba(255,255,255,0.9);
            padding: 6px 12px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            transition: background 0.2s, transform 0.2s;
          }
          .back-button:hover {
            background: #fff;
            transform: scale(1.05);
          }

          .content {
            padding: 20px;
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
          }
          @media (min-width: 768px) {
            .content {
              grid-template-columns: repeat(2, 1fr);
              gap: 32px;
              padding: 32px;
            }
          }
          
          /* ✅ Fixed heading styles */
          .section h2 {
            font-size: 20px;
            font-weight: 700;
            color: #111827;
            border-left: 4px solid #2563eb;
            padding-left: 10px;
            margin-bottom: 12px;
            text-transform: uppercase;
          }

          .section ul {
            list-style: disc;
            padding-left: 20px;
            color: #374151;
            line-height: 1.6;
            word-break: break-word;
          }
          .section li {
            margin-bottom: 6px;
          }
          .section p {
            color: #1f2937;
            line-height: 1.6;
            word-break: break-word;
          }
          .link {
            color: #2563eb;
            text-decoration: none;
            word-break: break-all;
          }
          .link:hover {
            text-decoration: underline;
          }
          .status-green {
            color: #16a34a;
            font-weight: 500;
          }
          .status-red {
            color: #dc2626;
            font-weight: 500;
          }
          .text-muted {
            color: #6b7280;
          }
        `}
      </style>

      <div className="container">
        <div className="card">
          {/* Banner */}
          <div className="banner">
            <div className="banner-title">{title}</div>
            <img src={projectBanner || "/avatarHolder.jpg"} alt={title} />
            <button onClick={handleReturnToDashboard} className="back-button">
              ← Back
            </button>
          </div>

          {/* Content */}
          <div className="content">
            <div className="section">
              <h2>Description</h2>
              <ul>
                {descriptionList.map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="section">
              <h2>Technologies</h2>
              <ul>
                {technologiesList.map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="section">
              <h2>Stack</h2>
              <p>{stack}</p>
            </div>
            <div className="section">
              <h2>Deployment</h2>
              <p className={deployed?.toLowerCase() === "yes" ? "status-green" : "status-red"}>
                {deployed}
              </p>
            </div>
            <div className="section">
              <h2>GitHub Repository</h2>
              {gitRepoLink ? (
                <a href={gitRepoLink} target="_blank" rel="noopener noreferrer" className="link">
                  {gitRepoLink}
                </a>
              ) : (
                <span className="text-muted">No repository link</span>
              )}
            </div>
            <div className="section">
              <h2>Live Project</h2>
              {projectLink && projectLink.trim() !== "" ? (
                <a href={projectLink} target="_blank" rel="noopener noreferrer" className="link">
                  {projectLink}
                </a>
              ) : (
                <span className="text-muted">Still Not Deployed</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProject;
