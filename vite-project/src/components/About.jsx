import React, { useEffect, useState } from "react";

const About = () => {
  const [aboutData, setAboutData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("https://my-portfolio-backends.onrender.com/api/about");
        const data = await res.json();
        setAboutData(data);
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    };
    fetchAbout();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes glow {
        0% { filter: drop-shadow(0 0 10px #00fff0); }
        50% { filter: drop-shadow(0 0 20px #a349a4); }
        100% { filter: drop-shadow(0 0 10px #00fff0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 20px",
    minHeight: "95vh",
    background: "#081b29",
    fontFamily: "Segoe UI, sans-serif",
    color: "#fff",
  };

  const contentStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    gap: isMobile ? "30px" : "80px",
    maxWidth: "1200px",
    textAlign: isMobile ? "center" : "left",
  };

  const imgWrapperStyle = {
    position: "relative",
    width: isMobile ? "250px" : "350px",
    height: isMobile ? "250px" : "350px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #00fff0, #a349a4, #00fff0)",
    animation: "glow 4s linear infinite",
    padding: "6px",
    flexShrink: 0,
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid #081b29",
  };

  const textStyle = {
    maxWidth: "600px",
  };

  const headingStyle = {
    fontSize: isMobile ? "32px" : "40px",
    marginBottom: "12px",
  };

  const highlightStyle = {
    color: "#00fff0",
  };

  const titleStyle = {
    fontSize: isMobile ? "28px" : "34px",
    margin: "12px 0",
    color: "#0ef",
  };

  const descStyle = {
    fontSize: "16.5px",
    lineHeight: "1.8",
    color: "#ccc",
  };

  return (
    <div className="admin-about-form" id="about">
      <div style={containerStyle}>
        {aboutData.length === 0 && <p>Loading...</p>}
        {aboutData.map((item) => (
          <div key={item._id} style={contentStyle}>
            <div style={imgWrapperStyle}>
              <img
                src={`https://my-portfolio-backends.onrender.com/uploads/${item.image}?v=${Date.now()}`}
                alt={item.name}
                onError={(e) => (e.target.src = "/default-fallback.png")}
                style={imgStyle}
              />
            </div>

            <div style={textStyle}>
              <h2 style={headingStyle}>
                About <span style={highlightStyle}>Me</span>
              </h2>
              <h3 style={titleStyle}>{item.title}</h3>
              <p style={descStyle}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
