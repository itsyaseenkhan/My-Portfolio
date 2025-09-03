import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const aboutslice = createSlice({
  name: "about",
  initialState: {
    loading: false,
    abouts: [],
    singleAbout: null, // 👈 single about store
    error: null,
    message: null,
  },

  reducers: {
    // Get all
    getAllAboutRequest(state) {
      state.loading = true;
      state.error = null;
      state.abouts = [];
      state.message = null;
    },
    getAllaboutsuccess(state, action) {
      state.loading = false;
      state.abouts = action.payload;
      state.error = null;
    },
    getAllAboutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Get single by id
    getAboutByIdRequest(state) {
      state.loading = true;
      state.error = null;
      state.singleAbout = null;
    },
    getAboutByIdSuccess(state, action) {
      state.loading = false;
      state.singleAbout = action.payload;
      state.error = null;
    },
    getAboutByIdFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Add
    addAboutRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addaboutsuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addAboutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // Update
    updateAboutRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateaboutsuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
      // Update the specific about in the state
      state.abouts = state.abouts.map((item) =>
        item._id === action.payload.aboutEntry._id
          ? action.payload.aboutEntry
          : item
      );
    },
    updateAboutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete
    deleteAboutRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteaboutsuccess(state, action) {
      state.loading = false;
      state.message = action.payload.message;
      state.abouts = state.abouts.filter(
        (item) => item._id !== action.payload.id
      );
      state.error = null;
    },
    deleteAboutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset & clear error
    resetaboutstate(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearAboutError(state) {
      state.error = null;
    },
  },
});

// ==================== Thunks ====================

// Get all
export const getAllAbouts = () => async (dispatch) => {
  dispatch(aboutslice.actions.getAllAboutRequest());
  try {
    const { data } = await axios.get("https://my-portfolio-q3dv.onrender.com/api/v1/AboutRouter/getAll", {
      withCredentials: true,
    });
    dispatch(aboutslice.actions.getAllaboutsuccess(data.abouts));
  } catch (error) {
    dispatch(
      aboutslice.actions.getAllAboutFailed(
        error.response?.data?.message || "Failed to fetch About entries"
      )
    );
  }
};

// Get single by id
export const getAboutById = (id) => async (dispatch) => {
  dispatch(aboutslice.actions.getAboutByIdRequest());
  try {
    const { data } = await axios.get(`https://my-portfolio-q3dv.onrender.com/api/v1/AboutRouter/get/${id}`, {
      withCredentials: true,
    });
    dispatch(aboutslice.actions.getAboutByIdSuccess(data));
  } catch (error) {
    dispatch(
      aboutslice.actions.getAboutByIdFailed(
        error.response?.data?.message || "Failed to fetch About entry"
      )
    );
  }
};

// Add
export const addNewAbout = (formData) => async (dispatch) => {
  dispatch(aboutslice.actions.addAboutRequest());
  try {
    const { data } = await axios.post("https://my-portfolio-q3dv.onrender.com/api/v1/AboutRouter/add", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(aboutslice.actions.addaboutsuccess(data.message));
  } catch (error) {
    dispatch(
      aboutslice.actions.addAboutFailed(
        error.response?.data?.message || "Failed to add About entry"
      )
    );
  }
};

// Update
export const updateAbout = (id, formData) => async (dispatch) => {
  dispatch(aboutslice.actions.updateAboutRequest());
  try {
    const { data } = await axios.put(
      `https://my-portfolio-q3dv.onrender.com/api/v1/AboutRouter/update/${id}`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      aboutslice.actions.updateaboutsuccess({
        message: data.message,
        aboutEntry: data.aboutEntry,
      })
    );
  } catch (error) {
    dispatch(
      aboutslice.actions.updateAboutFailed(
        error.response?.data?.message || "Failed to update About entry"
      )
    );
  }
};

// Delete
export const deleteAbout = (id) => async (dispatch) => {
  dispatch(aboutslice.actions.deleteAboutRequest());
  try {
    const { data } = await axios.delete(`https://my-portfolio-q3dv.onrender.com/api/v1/AboutRouter/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(aboutslice.actions.deleteaboutsuccess({ message: data.message, id }));
  } catch (error) {
    dispatch(
      aboutslice.actions.deleteAboutFailed(
        error.response?.data?.message || "Failed to delete About entry"
      )
    );
  }
};

export const { resetaboutstate, clearAboutError } = aboutslice.actions;
export default aboutslice.reducer;
