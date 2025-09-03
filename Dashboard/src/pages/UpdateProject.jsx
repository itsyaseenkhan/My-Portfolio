import { Textarea } from "@/components/ui/textarea";
import {
  clearAllProjectErrors,
  getAllProjects,
  UpdateProject as updateProjectAction,
} from "@/Store/Slices/projectSlice";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");
  const [ProjectBannerPreview, setProjectBannerPreview] = useState("");
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleReturnToDashboard = () => navigate("/");

  const handleProjectBannerPreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBanner(file);
      setProjectBannerPreview(reader.result);
    };
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `https://my-portfolio-q3dv.onrender.com/api/v1/ProjectRoute/get/${id}`,
          { withCredentials: true }
        );
        const data = res.data.project;

        setTitle(data.title || "");
        setDescription(data.description || "");
        setStack(data.stack?.trim() || "");
        setDeployed(data.deployed || "");
        setGitRepoLink(data.gitRepoLink || "");
        setTechnologies(data.technologies || "");
        setProjectLink(data.projectLink || "");
        setProjectBanner(data.projectBanner?.url || "");
        setProjectBannerPreview(data.projectBanner?.url || "");
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    getProject();
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(getAllProjects());
    }
  }, [error, message, dispatch]);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    if (!title || !stack) {
      toast.error("Please fill in required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    if (projectBanner) formData.append("projectBanner", projectBanner);

    dispatch(updateProjectAction(id, formData));
  };

  return (
    <div className="flex justify-center items-start min-h-screen py-10 px-4 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <form
        onSubmit={handleUpdateProject}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-10 space-y-8 border border-gray-100"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
            ✨ Update Project
          </h2>
          <button
            type="button"
            onClick={handleReturnToDashboard}
            className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200"
          >
            Return to Dashboard
          </button>
        </div>

        {/* Image Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <img
              src={ProjectBannerPreview || "/avatarHolder.jpg"}
              alt="projectBanner"
              className="w-full h-64 object-cover rounded-xl border shadow-sm"
            />
            <label className="cursor-pointer bg-indigo-50 hover:bg-indigo-100 border border-indigo-300 text-indigo-700 text-center py-2 px-4 rounded-lg font-medium transition">
              Upload New Banner
              <input
                type="file"
                accept="image/*"
                onChange={handleProjectBannerPreview}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex flex-col space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Project Title <span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="MERN STACK PORTFOLIO"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Stack <span className="text-red-500">*</span>
              </Label>
              <Select value={stack} onValueChange={(value) => setStack(value)}>
                <SelectTrigger className="w-full rounded-lg border border-gray-300">
                  <SelectValue placeholder="Select Stack" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Full Stack">Full Stack</SelectItem>
                  <SelectItem value="MERN">MERN</SelectItem>
                  <SelectItem value="MEAN">MEAN</SelectItem>
                  <SelectItem value="NEXT.JS">NEXT.JS</SelectItem>
                  <SelectItem value="REACT.JS">REACT.JS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Deployed
              </Label>
              <Select value={deployed} onValueChange={(value) => setDeployed(value)}>
                <SelectTrigger className="w-full rounded-lg border border-gray-300">
                  <SelectValue placeholder="Is this project deployed?" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Technologies Used
          </Label>
          <Textarea
            placeholder="HTML, CSS, JS, React"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            className="rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Description
          </Label>
          <Textarea
            placeholder="Feature 1. Feature 2. Feature 3."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Github Repo Link
            </Label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://github.com/project"
              value={gitRepoLink}
              onChange={(e) => setGitRepoLink(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Live Project Link
            </Label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://yourproject.com"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          {loading ? (
            <SpecialLoadingButton content="Updating..." width="w-52" />
          ) : (
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg w-52 shadow-lg transition"
            >
              Update Project
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
