import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    projects: [],
    error: null,
    message: null,
    singleProject: [],
  },

  reducers: {
    getAllProjectsRequest(state) {
      state.loading = true;
      state.projects = [];
      state.error = null;
    },
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // 🆕 Add New Project
    addNewProjectRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    addNewProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    addNewProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    UpdateProjectRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    UpdateProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    UpdateProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    deleteProjectRequest(state) {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    deleteProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    deleteProjectFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // 🔄 Reset and Clear
    resetProjectSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());

  try {
    const { data } = await axios.get("https://my-portfolio-q3dv.onrender.com/api/v1/ProjectRoute/getall", {
      withCredentials: true,
    });

    dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects)); // ✅ fixed
    dispatch(projectSlice.actions.clearAllErrors());

  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message || "Failed to fetch projects";
    dispatch(projectSlice.actions.getAllProjectFailed(errorMessage));
  }
};

export const addNewProject = (data) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());

  try {
    const response = await axios.post("https://my-portfolio-q3dv.onrender.com/api/v1/ProjectRoute/add", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());

  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message || "Project creation failed";
    dispatch(projectSlice.actions.addNewProjectFailed(errorMessage));
  }
};

export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());

  try {
    const response = await axios.delete(`https://my-portfolio-q3dv.onrender.com/api/v1/ProjectRoute/delete/${id}`, {
      withCredentials: true,
    });

    dispatch(projectSlice.actions.deleteProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());

  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message || "Failed to delete project";
    dispatch(projectSlice.actions.deleteProjectFailed(errorMessage));
  }
};

export const UpdateProject = (id, newdata) => async (dispatch) => {
  try {
    dispatch(projectSlice.actions.UpdateProjectRequest());

    const response = await axios.put(`https://my-portfolio-q3dv.onrender.com/api/v1/ProjectRoute/update/${id}`,
      newdata,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(projectSlice.actions.UpdateProjectSuccess(response.data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.UpdateProjectFailed(error?.response?.data?.message || "Something went wrong"
      )
    );
  }
};


export const clearAllProjectErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export default projectSlice.reducer;
