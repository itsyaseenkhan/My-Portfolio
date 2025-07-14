import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "../Pages/Hero.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuItemClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { id: "Home", label: "Home" },
    { id: "about", label: "About" },
    { id: "Skills", label: "Skills" },
    { id: "Project", label: "Project" },
    { id: "Education", label: "Education" },
    { id:  "Contact",   label: "Contact" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="logo">
          <span className="purple">&lt;</span>
          Yaseen<span className="purple">/Khan&gt;</span>
        </div>

        <ul className="menu">
          {menuItems.map((item) => (
            <li key={item.id} className={activeSection === item.id ? "active" : ""}>
              <button onClick={() => handleMenuItemClick(item.id)}>{item.label}</button>
            </li>
          ))}
        </ul>
              <Link to="/admin/login" style={{ color: "white", marginRight: "40px" }}>
                Dashboard
              </Link>

        <div className="social-icons">
          <a href="https://github.com/itsyaseenkhan/My-Portfolio" target="_blank" rel="noreferrer">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-yaseen-a53757269/" target="_blank" rel="noreferrer">
            <FaLinkedin size={20} />
          </a>
        </div>

        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {isOpen && (
        <ul className="mobile-menu">
          {menuItems.map((item) => (
            <li key={item.id} className={activeSection === item.id ? "active" : ""}>
              <button onClick={() => handleMenuItemClick(item.id)}>{item.label}</button>
            </li>
          ))}
          <div className="mobile-social-icons">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/muhammad-yaseen-a53757269/" target="_blank" rel="noreferrer">
              <FaLinkedin size={20} />
            </a>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
