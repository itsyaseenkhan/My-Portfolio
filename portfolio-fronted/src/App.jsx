import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-Provider';
import Home from './pages/Home';
import ProjectView from './pages/ProjectView';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from './pages/SubComponents/Navbar';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectView />} />

          </Routes>
        <ToastContainer position="bottom-right" theme="dark" />
        </Router>
      </ThemeProvider>
      
    </>
  );
}

export default App;
