import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {FaHome, FaUser, FaFileAlt, FaLayerGroup, FaBook, FaEnvelope,FaSignOutAlt, FaBars, FaTimes} from 'react-icons/fa';
import HomeFoam from '../Pages/HomeFoam';
import AboutFoam from '../Pages/AboutFoam';
import SkillFoam from './SkillFoam';
import AdminProject from './AdminProject';
import AdminEducation from './AdminEducation';
import AdminContact from '../Pages/AdminContact';
import "./Dashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [adminName, setAdminName] = useState('');
  const [adminImage, setAdminImage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return navigate("/admin/login");

    axios.get("http://localhost:5000/api/admin/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setAdminName(res.data.name);
      setAdminImage(`http://localhost:5000/${res.data.image || "default.png"}`);
    })
    .catch(() => navigate("/admin/login"));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const tabItems = [
    { key: "home", label: "Home", icon: <FaHome /> },
    { key: "about", label: "About", icon: <FaUser /> },
    { key: "skill", label: "Skills", icon: <FaFileAlt /> },
    { key: "AdminProject", label: "Projects", icon: <FaLayerGroup /> },
    { key: "AdminEducation", label: "Education", icon: <FaBook /> },
    { key: "AdminContact", label: "Contact", icon: <FaEnvelope /> }
  ];

  const tabComponents = {
    home: <HomeFoam />,
    about: <AboutFoam />,
    skill: <SkillFoam />,
    AdminProject: <AdminProject />,
    AdminEducation: <AdminEducation />,
    AdminContact: <AdminContact />
  };

  return (
    <div className="admin-dashboard">
      <aside className={`sidebar ${sidebarOpen ? 'show' : ''}`}>
        <button className="close-navbar" onClick={() => setSidebarOpen(false)}>
          <FaTimes />
        </button>
        <div className="logo">
          🚀 MyPortfolio
        </div>
        <ul>
          {tabItems.map(item => (
            <li key={item.key}
                className={activeTab === item.key ? "active" : ""}
                onClick={() => setActiveTab(item.key)}>
              {item.icon} {item.label}
            </li>
          ))}
        </ul>
        
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <div className={`main-panel ${sidebarOpen ? 'shifted' : ''}`}>
        <header className="dashboard-header">
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          
          <h2>Admin Dashboard</h2>
          
          <div className="admin-profile">
            <span> Welcom:{adminName}</span>
            <img src={adminImage} alt="Admin" className="admin-avatar" />
          </div>
        </header>
        <main className="dashboard-content">
          {tabComponents[activeTab]}
        </main>
      </div>
    </div>
  );
}