import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import {
  clearAboutError,
  getAllAbouts,
  updateAbout,
} from "../Store/Slices/AboutSlice";

const UpdateAbout = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.about);
  const { id } = useParams();

  const handleReturn = () => navigate("/Manage/About");

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  useEffect(() => {
    const getAboutById = async () => {
      try {
        const res = await axios.get(
          `https://my-portfolio-q3dv.onrender.com/api/v1/AboutRouter/get/${id}`,
          { withCredentials: true }
        );
        const data = res.data.abouts || res.data; // Adjust depending on backend response
        setTitle(data.title || "");
        setDescription(data.description || "");
        setImagePreview(data.image?.url || "");
        setImage(null);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch About data");
      }
    };
    getAboutById();
  }, [id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAboutError());
    }
    if (message) {
      toast.success(message);
      dispatch(getAllAbouts());
      navigate("/");
    }
  }, [error, message, dispatch, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    // IMPORTANT: Do NOT set Content-Type header, axios will set it automatically
    try {
      await axios.put(
        `https://my-portfolio-q3dv.onrender.com/api/v1/AboutRouter/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("About updated successfully");
      navigate("/");
      dispatch(getAllAbouts());
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen py-10 px-4 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-10 space-y-8 border border-gray-100"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
            ✨ Update About
          </h2>
          <button
            type="button"
            onClick={handleReturn}
            className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200"
          >
            Return
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex flex-col gap-4">
            <img
              src={imagePreview || "/avatarHolder.jpg"}
              alt="About"
              className="w-full h-64 object-cover rounded-xl border shadow-sm"
            />
            <label className="cursor-pointer bg-indigo-50 hover:bg-indigo-100 border border-indigo-300 text-indigo-700 text-center py-2 px-4 rounded-lg font-medium transition">
              Upload New Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImagePreview}
                className="hidden"
              />
            </label>
          </div>

          {/* Inputs */}
          <div className="flex flex-col space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </Label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="About title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Write about yourself..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg"
              />
            </div>
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
              Update About
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateAbout;
