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
        setTitle(project.title);
        setDescription(project.description);
        setStack(project.stack);
        setDeployed(project.deployed);
        setGitRepoLink(project.gitRepoLink);
        setTechnologies(project.technologies);
        setProjectLink(project.projectLink);
        setProjectBanner(project.projectBanner?.url);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    getProject();
  }, [id]);

  const descriptionList = (description || "").split(",");
  const technologiesList = (technologies || "").split(",");

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Title Above Image */}
        <h1 className="text-4xl font-bold text-center text-gray-800 p-6 break-words">
          {title}
        </h1>
         <div className="absolute top-4 left-4">
            <button
              onClick={handleReturnToDashboard}
              className="bg-white/80 backdrop-blur px-4 py-2 rounded-md shadow hover:bg-white transition"
            >
              ← Back to Dashboard
            </button>
          </div>

        {/* Banner */}
        <div className="relative">
          <img
            src={projectBanner || "/avatarHolder.jpg"}
            alt={title}
            className="w-full h-64 object-cover"
          />
         
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          {/* Description */}
          <div className="max-w-prose break-words">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">
              Description
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed break-words">
              {descriptionList.map((item, index) => (
                <li key={index} className="break-words">{item.trim()}</li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="max-w-prose break-words">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">
              Technologies
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 break-words">
              {technologiesList.map((item, index) => (
                <li key={index} className="break-words">{item.trim()}</li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Stack</h2>
            <p className="text-gray-800 break-words">{stack}</p>
          </div>

          {/* Deployment */}
          <div>
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">
              Deployment
            </h2>
            <p
              className={
                deployed?.toLowerCase() === "yes"
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {deployed}
            </p>
          </div>

          {/* GitHub */}
          <div className="sm:col-span-2">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">
              GitHub Repository
            </h2>
            {gitRepoLink ? (
              <a
                href={gitRepoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {gitRepoLink}
              </a>
            ) : (
              <span className="text-gray-500">No repository link</span>
            )}
          </div>

          {/* Live Project */}
          <div className="sm:col-span-2">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">
              Live Project
            </h2>
            {projectLink && projectLink.trim() !== "" ? (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {projectLink}
              </a>
            ) : (
              <span className="text-gray-500">Still Not Deployed</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
