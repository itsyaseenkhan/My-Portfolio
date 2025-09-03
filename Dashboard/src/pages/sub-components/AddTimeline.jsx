import React, { useEffect, useState } from 'react';
import SpecialLoadingButton from './SpecialLoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddNewTimeline,
  clearAllTimelineError,
  resetTimelineSlice,
  getAllTimeline,
} from '../../Store/Slices/timelineSlice';
import { toast } from 'react-toastify';

function AddTimeline() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.timeline);

  const handleAddNewTimeline = (e) => {
    e.preventDefault();

    if (!title || !description || !from || !to) {
      toast.warning("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('from', from);
    formData.append('to', to);

    dispatch(AddNewTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineError());
    }

    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
      setTitle('');
      setDescription('');
      setFrom('');
      setTo('');
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 px-5 py-10">
      <form
        className="w-full md:w-[600px] bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300"
        onSubmit={handleAddNewTimeline}
      >
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Add a New Timeline
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Fill in the details below to add a timeline entry
          </p>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter your education title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              placeholder="Add a description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>

          {/* From */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <input
              type="number"
              placeholder="Starting period"
              required
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <input
              type="number"
              placeholder="Ending period"
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
          </div>

          {/* Button */}
          <div className="mt-6">
            {loading ? (
              <SpecialLoadingButton content={'Adding...'} />
            ) : (
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
              >
                Add Timeline
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTimeline;
