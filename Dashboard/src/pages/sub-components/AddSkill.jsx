import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addNewSkill,
  clearAllSkillErrors,
  resetSkillSlice,
  getallSkills,
} from "../../Store/Slices/skillSlice";
import { Button } from "@/components/ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.skill);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
    if (!allowedTypes.includes(file?.type)) {
      toast.error("Only JPG, PNG, SVG images are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleAddNewSkill = (e) => {
    e.preventDefault();
    if (!title || !proficiency || !image) {
      toast.error("Please fill in all fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("image", image);
    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getallSkills());
      setTitle("");
      setProficiency("");
      setImage(null);
      setImagePreview("");
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-5 py-10">
      <form
        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 border border-gray-200"
        onSubmit={handleAddNewSkill}
      >
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Add a New Skill
        </h2>

        {/* Title */}
        <div className="mb-5">
          <label className="block font-medium mb-2 text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. React.js"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
          />
        </div>

        {/* Proficiency */}
        <div className="mb-5">
          <label className="block font-medium mb-2 text-gray-700">
            Proficiency (%)
          </label>
          <input
            type="number"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
            placeholder="e.g. 70"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 px-4 py-2 rounded-lg outline-none transition"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-medium mb-2 text-gray-700">
            Skill Icon (JPG, PNG, SVG)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 mx-auto object-contain rounded-md shadow-sm"
              />
            ) : (
              <p className="text-gray-500">No image selected</p>
            )}
            <label className="mt-4 inline-block cursor-pointer text-blue-600 font-medium hover:underline">
              Upload File
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.svg"
                onChange={handleImage}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-400 mt-2">Max size: 10MB</p>
          </div>
        </div>

        {/* Submit Button */}
        {!loading ? (
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Add Skill
          </Button>
        ) : (
          <SpecialLoadingButton content="Adding Skill..." />
        )}
      </form>
    </div>
  );
};

export default AddSkill;
