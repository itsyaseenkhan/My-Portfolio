import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewAbout } from "../../Store/Slices/AboutSlice";
import SpecialLoadingButton from "./SpecialLoadingButton";

const  AddAbout = () =>{
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.about);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !title || !description) {
      alert("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    dispatch(addNewAbout(formData));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-10 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        Add About Entry
      </h2>

      {error && (
        <p className="mb-4 text-center text-red-500 font-medium bg-red-100 p-2 rounded-lg">
          {error}
        </p>
      )}
      {message && (
        <p className="mb-4 text-center text-green-600 font-medium bg-green-100 p-2 rounded-lg">
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter title..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Write something..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block mb-2 font-semibold text-gray-700"
          >
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-center">
          {loading ? (
            <SpecialLoadingButton content="ADDING NEW ABOUT" width="w-56" />
          ) : (
            <button
              type="submit"
              className="w-56 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              Add About
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default AddAbout