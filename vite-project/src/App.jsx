import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import AdminForgotPassword from './Pages/AdminForgotPassword';
import AdminResetPassword from './Pages/AdminResetPassword';
import Home from './components/Home';
import HomeFoam from './Pages/HomeFoam';
import Navbar from './components/Navbar';
import AboutFoam from './Pages/AboutFoam';
import About from  './components/About';
import Skill from './components/Skill';
import SkillFoam  from './Pages/SkillFoam';
import AdminProject from './Pages/AdminProject';
import Project from './components/Project';
import Education from './components/Education';
import Contact from './components/Contact';
import AdminContact from './Pages/AdminContact';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/reset-password/:token" element={<AdminResetPassword />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="HomeFoam" element={<HomeFoam/>} />
        <Route path="Navbar"  element={<Navbar/>}/>
         <Route path='About'element={<AboutFoam/>} />
         <Route path='About'element={<About/>}/>
         <Route path='Skill' element={<Skill/>}/>
         <Route path='SkillFoam' element={<SkillFoam/>}/>
         <Route path='AdminProject' element={<AdminProject/>} />
         <Route path='Project' element={<Project/>}/>
         <Route path='Education' element={<Education/>} />
         <Route path='Contact' element={<Contact/>}/>
         <Route path='AdminContact' element={<AdminContact/>} />
        <Route path="*" element={ <h2 style={{ textAlign: 'center', marginTop: '100px' }}> 404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
