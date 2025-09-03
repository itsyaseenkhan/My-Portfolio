import { createSlice  } from "@reduxjs/toolkit";
import axios from "axios";


const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,          
    message: null,
  },

  reducers: {
    getAllTimelineRequest(state,action){
      state.loading = true;
      state.error = null;
      state.timeline = [];
    },

    getAllTimelineSuccess(state, action) {
      state.loading = false;
      state.timeline = action.payload;
      state.error = null;
    },

    getAllTimelineFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.timeline = state.timeline
    },
deletetimelineRequest: (state) => {
  state.loading = true;
  state.error = null;
  state.message = null;
},

deletetimelineSuccess: (state, action) => {
  state.loading = false;
  state.message = action.payload;
},

deletetimelineFailed: (state, action) => {
  state.loading = false;
  state.error = action.payload;
},

  
  addtimelineRequest: (state, action) => {
      state.message= null;
      state.error= null;
      state.loading = true;
    },
   addTimelineSuccess: (state, action)=>{
     state.message= action.payload;
      state.error= null;
      state.loading = false;
    },
      addTimelineFailed: (state, action) => {
      state.message= null;
      state.error= null;
      state.loading = false;
    },
    
   resetTimelineSlice(state, action) {
    state.error= null;
    state.timeline= state.timeline;
    state.message= null;
    state.loading= false;
   },


    clearAllTimelineError: (state) => {
      state.error = null;
      state.timeline = state.timeline;
    },
  },
});

// ✅ Thunk to fetch all messages
export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const { data } = await axios.get(
      "https://my-portfolio-q3dv.onrender.com/api/v1/timeline/getall",
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timeline));
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed( error.response?.data?.message || "Failed to fetch Timeline"
      )
    );
  }
};

// Inside timelineSlice.js

export const deleteTimeline= (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deletetimelineRequest());
  try {
    const { data } = await axios.delete(
      `https://my-portfolio-q3dv.onrender.com/api/v1/timeline/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.deletetimelineSuccess(data.message));
  } catch (error) {
    dispatch(
      timelineSlice.actions.deletetimelineFailed(
        error.response?.data?.timeline|| "Failed to delete message"
      )
    );
  }
};




export const AddNewTimeline= (TimelineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addtimelineRequest());
  try {
    const { data } = await axios.post(
      `https://my-portfolio-q3dv.onrender.com/api/v1/timeline/add`,TimelineData,

      { withCredentials: true, headers:{
        "Content-type " :  "application/json" }}
    );
    dispatch(timelineSlice.actions.addTimelineSuccess(data.message));
  } catch (error) {
    dispatch(
      timelineSlice.actions.addTimelineFailed(
        error.response?.data?.timeline|| "Failed to delete message"
      )
    );
  }
};


export const  clearAllTimelineError = () => (dispatch) =>{
  dispatch(timelineSlice.actions.clearAllTimelineError());
}



export const resetTimelineSlice= () => (dispatch) =>{
  dispatch(timelineSlice.actions.resetTimelineSlice());
}


export default timelineSlice.reducer;

