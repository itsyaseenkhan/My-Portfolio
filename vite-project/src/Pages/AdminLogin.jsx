import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import AdminLogo from "../assets/img/yk-white-logo.png";
import BgImage from "../assets/img/wmremove-transformed.jpeg";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://my-portfolio-backends.onrender.com/api/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      alert("✅ Login successful");
      setTimeout(() => navigate("/admindashboard"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.msg || "❌ Login failed");
    }
  };

  const styles = {
    page: {
      backgroundImage: `url(${BgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    container: {
      width: '100%',
      maxWidth: '420px',
      padding: '40px 30px',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 12px 35px rgba(0,0,0,0.3)',
      color: '#ffffff',
      border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    logo: {
      display: 'block',
      margin: '0 auto 20px auto',
      width: '130px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '25px',
      fontSize: '2rem',
      fontWeight: '700',
      color: '#ffffff',
      letterSpacing: '1px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputWrapper: {
      position: 'relative',
      width: '100%',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      paddingRight: '42px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#fff',
      fontSize: '1rem',
      outline: 'none',
    },
    iconRight: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
      color: 'black',
      opacity: 0.8,
      pointerEvents: 'none',
    },
    button: {
      padding: '12px',
      marginTop: '10px',
      backgroundColor: '#00d4ff',
      color: '#000',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    message: {
      textAlign: 'center',
      marginTop: '15px',
      color: '#ffaaaa',
      fontWeight: '500',
    },
    linkText: {
      marginTop: '20px',
      textAlign: 'right',
      fontSize: '0.9rem',
      color: '#ffffff',
    },
    link: {
      color: '#00fff7',
      cursor: 'pointer',
      textDecoration: 'underline',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.page}>
      {/* Inline <style> to apply white placeholder */}
      <style>
        {`
          input::placeholder {
            color: white;
            opacity: 1;
          }
        `}
      </style>

      <div style={styles.container}>
        <img src={AdminLogo} alt="Admin logo" style={styles.logo} />
        <h2 style={styles.title}>Admin Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputWrapper}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <MdEmail style={styles.iconRight} />
          </div>
          <div style={styles.inputWrapper}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <MdLock style={styles.iconRight} />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.message}>{msg}</p>
        <p style={styles.linkText}>
          <span style={styles.link} onClick={() => navigate('/admin/forgot-password')}>
            Forgot your password?
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
