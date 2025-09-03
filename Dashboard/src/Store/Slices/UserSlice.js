import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {}, 
    isAuthenticated: false,
    error: null,
    message: null,
    isUpdated: false,
  },

  reducers: {
    // LOGIN
    loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // LOGOUT
    logoutSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.message = action.payload;
      state.error = null;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // LOAD USER
    loadUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loadUserFailed(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
      state.error = action.payload;
    },

    // UPDATE PASSWORD
    updatePasswordRequest(state) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updatePasswordFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },

    // UPDATE PROFILE
    updateProfileRequest(state) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.isUpdated = true;
      state.message = action.payload;
      state.error = null;
    },
    updateProfileFailed(state, action) {
      state.loading = false;
      state.isUpdated = false;
      state.message = null;
      state.error = action.payload;
    },
    updateProfileResetAfterUpdate(state) {
      state.error = null;
      state.isUpdated = false;
      state.message = null;
    },

    clearAllUserErrors(state) {
      state.error = null;
    },
  },
});


export const login = (email, Password) => async (dispatch) => {
  dispatch(UserSlice.actions.loginRequest());
  try {
    const { data } = await axios.post(
      "https://my-portfolio-q3dv.onrender.com/api/v1/UserRouter/login",
      { email, Password },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    dispatch(UserSlice.actions.loginSuccess(data.User));
    dispatch(UserSlice.actions.clearAllUserErrors());
  } catch (error) {
    dispatch(
      UserSlice.actions.loginFailed(
        error.response?.data?.message || "Login failed"
      )
    );
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(UserSlice.actions.loadUserRequest());
  try {
    const { data } = await axios.get("https://my-portfolio-q3dv.onrender.com/api/v1/UserRouter/me",
      { withCredentials: true }
    );
    dispatch(UserSlice.actions.loadUserSuccess(data.user));
    dispatch(UserSlice.actions.clearAllUserErrors());
  } catch (error) {
    dispatch(
      UserSlice.actions.loadUserFailed(
        error.response?.data?.message || "Get user failed"
      )
    );
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "https://my-portfolio-q3dv.onrender.com/api/v1/UserRouter/logout",
      {},
      { withCredentials: true }
    );
    dispatch(UserSlice.actions.logoutSuccess(data.message));
    dispatch(UserSlice.actions.clearAllUserErrors());
  } catch (error) {
    dispatch(
      UserSlice.actions.logoutFailed(
        error.response?.data?.message || "Logout failed"
      )
    );
  }
};


export const updatePassword =
  (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(UserSlice.actions.updatePasswordRequest());
    try {
      const { data } = await axios.put(
        "https://my-portfolio-q3dv.onrender.com/api/v1/UserRouter/update/password",
        { currentPassword, newPassword, confirmNewPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch(UserSlice.actions.updatePasswordSuccess(data.message));
      dispatch(UserSlice.actions.clearAllUserErrors());
    } catch (error) {
      dispatch(
        UserSlice.actions.updatePasswordFailed(
          error.response?.data?.message || "Update password failed"
        )
      );
    }
  };

export const updateProfile = (newData) => async (dispatch) => {
  dispatch(UserSlice.actions.updateProfileRequest());
  try {
    const response = await axios.put(
      "https://my-portfolio-q3dv.onrender.com/api/v1/UserRouter/me/profile/Update",
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(UserSlice.actions.updateProfileSuccess(response.data.message));
    dispatch(UserSlice.actions.clearAllUserErrors());
  } catch (error) {
    dispatch(
      UserSlice.actions.updateProfileFailed(
        error.response?.data?.message || "Update profile failed"
      )
    );
  }
};

export const resetProfile = () => (dispatch) => {
  dispatch(UserSlice.actions.updateProfileResetAfterUpdate());
};

export const clearAllUserErrors = () => (dispatch) => {
  dispatch(UserSlice.actions.clearAllUserErrors());
};

export default UserSlice.reducer;
