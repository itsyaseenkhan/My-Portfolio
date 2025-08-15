import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./Hero.css";
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
    { id: "Hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "MYTimelines", label: "Education" },
    { id: "Skills", label: "Skills" },
    { id: "Portfolio", label: "Project" },
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
         
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
