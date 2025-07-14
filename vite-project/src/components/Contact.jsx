import React, { useState } from "react";
import { FaEnvelope,FaPhone,FaFacebookF,FaTwitter,FaInstagram, FaLinkedinIn,FaMapMarkerAlt,} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://my-portfolio-backends.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  return (
    <>
      <div className="admin-Contact-Foam" id="Contact"></div>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: "60px 40px",
        backgroundColor: "#001F2F",
        color: "#fff",
        fontFamily: "sans-serif",
        minHeight: "90vh",
      }}>
        {/* Left Side */}
        <div style={{ flex: 1, minWidth: "300px", marginBottom: "50px", marginTop: "25px" }}>
          <h2 style={{ fontSize: "50px", marginBottom: "60px" }}>
            Contact <span style={{ color: "#00f7ff" }}>Me</span>
          </h2>
          <p style={{ fontSize: "20px", marginBottom: "15px" }}>Let's Work Together</p>
          <p style={{ color: "#ccc", marginBottom: "20px" }}>
            Every great journey begins with a hello — Let's create something extraordinary together!
          </p>
          <p style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaMapMarkerAlt /> Address : Ashfaq Colony Street No 29, Keamari Karachi, Pakistan
          </p>
          <p style={{ marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaEnvelope /> Gul494419@gmail.com
          </p>
          <p style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaPhone /> +9203142084038
          </p>

          {/* Social Icons with Links */}
          <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
            {[
              { Icon: FaFacebookF, url: "https://facebook.com/yourusername" },
              { Icon: FaTwitter, url: "https://twitter.com/yourusername" },
              { Icon: FaInstagram, url: "https://www.instagram.com/gul_494419/" },
              { Icon: FaLinkedinIn, url: "https://linkedin.com/in/yourusername" }
            ].map(({ Icon, url }, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#00f7ff",
                  border: "1px solid #00f7ff",
                  borderRadius: "50%",
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  transition: "0.3s",
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#00f7ff"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <Icon style={{ color: "#00f7ff" }} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "40px" }}>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "5px",
                border: "none",
                fontSize: "14px",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "5px",
                border: "none",
                fontSize: "14px",
              }}
            />
            <input
              type="text"
              name="subject"
              placeholder="Enter Your Subject"
              value={formData.subject}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "5px",
                border: "none",
                fontSize: "14px",
              }}
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Enter Your Message"
              value={formData.message}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "5px",
                border: "none",
                fontSize: "14px",
              }}
            ></textarea>
            <button type="submit" style={{
              backgroundColor: "#00f7ff",
              color: "#001F2F",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 0 15px #00f7ff",
              transition: "0.3s"
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#00e3e3"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#00f7ff"}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
