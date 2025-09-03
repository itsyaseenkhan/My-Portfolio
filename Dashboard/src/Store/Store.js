import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slices/UserSlice';
import messageReducer from "./Slices/messageSlice";
import timelineReducer from "./Slices/timelineSlice";
import forgotResetPassReducer from "./Slices/forgotResetPasswordSlice"; 
import skillReducer from "./Slices/skillSlice";
import projectReducer from "./Slices/projectSlice";
import aboutReducer from "./Slices/AboutSlice";

export const Store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotResetPassReducer,
     messages: messageReducer,  
     timeline: timelineReducer,
     skill : skillReducer,
     project: projectReducer,
      about: aboutReducer,
   
    
  },
});
