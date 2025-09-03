import React, { useEffect } from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ManageSkills from "./pages/ManageSkills";
import ManageTimeline from "./pages/ManageTimeline";
import ManageProject from "./pages/ManageProject";
import ViewProject from "./pages/ViewProject";
import ResetPassword from "./pages/ResetPassword";
import UpdateProject from "./pages/UpdateProject";
import UpdateAbout from "./pages/updateAbout";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { getUser } from "./Store/Slices/UserSlice";
import "./App.css"; 
import { getAllMessages } from "./Store/Slices/messageSlice";
import { getAllTimeline } from "./Store/Slices/timelineSlice";
import {getallSkills } from "./Store/Slices/skillSlice";





const App = () =>{
      
    const dispatch = useDispatch()
      useEffect(()=>{
      dispatch(getUser() );
      dispatch(getAllMessages());
      dispatch(getAllTimeline());
      dispatch(getallSkills());

     },[]);

    return (
         <Router>
            <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Password/forgot" element={<ForgotPassword/>}/>
            <Route path="/Password/reset/:token" element={<ResetPassword/>}/>
            <Route path="/Manage/Skills" element={<ManageSkills/>}/>
            <Route path="/Manage/Timeline" element={<ManageTimeline/>}/>
            <Route path="/Manage/Project" element={<ManageProject/>}/>
            <Route path="/view/Project/:id" element={<ViewProject/>}/>
            <Route path="/update/Project/:id" element={<UpdateProject/>}/>
           <Route path="/Update/About/:id" element={<UpdateAbout />} />
           </Routes>
           <ToastContainer position="bottom-right" theme="dark"  />
        </Router>
      
    );
};

export default App;