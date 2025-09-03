import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },

  reducers: {
    getAllMessagesRequest(state) {
      state.loading = true;
      state.error = null;
      state.messages = [];
    },

    getAllMessagesSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
      state.error = null;
    },

    getAllMessagesFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    clearAllmessageErrors(state) {
      state.error = null;
    },

    resetMessagesSlice(state) {
      state.message = null;
    },
     getAllMessagesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteMessageRequest: (state) => {
      state.loading = true;
    },
    deleteMessageSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    },
    deleteMessageFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearAllMessageErrors: (state) => {
      state.error = null;
    },
  },
});

// ✅ Thunk to fetch all messages
export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const { data } = await axios.get(
      "https://my-portfolio-q3dv.onrender.com/api/v1/message/getAll",
      { withCredentials: true }
    );

    dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessagesFailed(
        error.response?.data?.message || "Failed to fetch messages"
      )
    );
  }
};

// Inside messageSlice.js

export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const { data } = await axios.delete(
      `https://my-portfolio-q3dv.onrender.com/api/v1/message/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(
        error.response?.data?.message || "Failed to delete message"
      )
    );
  }
};

// ✅ Export reducer and actions
export const {
  getAllMessagesRequest,
  getAllMessagesSuccess,
  getAllMessagesFailed,
  clearAllMessageErrors,
  resetMessagesSlice,
} = messageSlice.actions;

export default messageSlice.reducer;
