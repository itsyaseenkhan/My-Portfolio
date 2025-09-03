import React, { useEffect, useState } from "react";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {addNewProject,clearAllProjectErrors,getAllProjects,resetProjectSlice,} from "../../Store/Slices/projectSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectBannerPreview(reader.result);
      setProjectBanner(file);
    };
  };

  const { loading, error, message } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const handleaddNewProject = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectBanner", projectBanner);
    dispatch(addNewProject(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    } 
  }, [dispatch, error, loading, message]);

  return (
    <>
     <div className="flex justify-center items-start min-h-screen py-10 px-4 bg-gray-50">
  <form
    onSubmit={handleaddNewProject}
    className="w-full max-w-4xl bg-white rounded-xl shadow-md p-8 space-y-8"
  >
    <h2 className="text-3xl font-bold text-indigo-700 border-b pb-4">
      Add New Project
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Project Title */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Project Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="MERN STACK PORTFOLIO"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Technologies Used */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Technologies Used</label>
        <Textarea
          placeholder="HTML, CSS, JS, React"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-1 sm:col-span-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <Textarea
          placeholder="Feature 1. Feature 2. Feature 3."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Stack */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Stack</label>
        <Select value={stack} onValueChange={setStack}>
          <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Select Stack" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full Stack" className="bg-blue-50 hover:bg-blue-100 text-blue-800">Full Stack</SelectItem>
            <SelectItem value="Mern" className="bg-blue-50 hover:bg-blue-100 text-gray-800">MERN</SelectItem>
            <SelectItem value="Mean" className="bg-blue-50 hover:bg-blue-100 text-gray-800">MEAN</SelectItem>
            <SelectItem value="Next.JS" className="bg-blue-50 hover:bg-blue-100 text-gray-800">NEXT.JS</SelectItem>
            <SelectItem value="React.JS" className="bg-blue-50 hover:bg-blue-100 text-gray-800">REACT.JS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Deployed */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Deployed</label>
        <Select value={deployed} onValueChange={setDeployed}  bg-blue-50>
          <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-2  shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <SelectValue placeholder="Is this project deployed?   " />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="Yes" className="bg-blue-50 hover:bg-blue-100 text-blue-800" >Yes</SelectItem>
            <SelectItem value="No" className="bg-blue-50 hover:bg-blue-100 text-blue-800" >No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Github Link */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Github Repo Link</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://github.com/project"
          value={gitRepoLink}
          onChange={(e) => setGitRepoLink(e.target.value)}
        />
      </div>

      {/* Live Project Link */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Live Project Link</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://yourproject.com"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />
      </div>

      {/* Project Banner Upload */}
      <div className="sm:col-span-2 flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">Project Banner</label>
        <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-gray-400 rounded-md p-6">
          {projectBannerPreview ? (
            <img
              src={projectBannerPreview}
              alt="Preview"
              className="w-full max-w-lg h-56 object-contain"
            />
          ) : (
            <p className="text-gray-400 text-sm">No file selected</p>
          )}
          <input
            type="file"
            id="file-upload"
            onChange={handleSvg}
            className="text-sm text-gray-700"
          />
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <div className="pt-6 flex justify-end">
      {loading ? (
        <SpecialLoadingButton content="ADDING NEW PROJECT" width="w-56" />
      ) : (
        <button
          type="submit"
          className="w-56 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Project
        </button>
      )}
    </div>
  </form>
</div>

    </>
  );
};

export default AddProject;
