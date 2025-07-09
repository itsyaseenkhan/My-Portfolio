import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import AdminLogo from "../assets/img/ChatGPT Image Jul 6, 2025, 12_42_25 AM.png";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      alert("✅ Login successful");
      setTimeout(() => navigate("/admindashboard"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.msg || "❌ Login failed");
    }
  };

  const styles = {
    container: {
      width: '80%',
      maxWidth: '380px',
      minWidth: '280px',
      margin: '10vh auto',
      padding: '30px 20px',
      borderRadius: '12px',
      background: '#ffffff',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    logo: {
      display: 'block',
      margin: '0 auto 20px auto',
      width: '250px',
      maxWidth: '30%',
      height: 'auto',
    },
    title: {
      textAlign: 'center',
      marginBottom: '25px',
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1a1a1a',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      paddingRight: '42px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '8px',
      fontSize: '1rem',
      boxSizing: 'border-box',
    },
    iconRight: {
      position: 'absolute',
      right: '14px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
      color: '#222',
      opacity: 0.8,
      pointerEvents: 'none',
    },
    inputWrapper: {
      position: 'relative',
      width: '100%',
    },
    button: {
      padding: '12px',
      marginTop: '15px',
      backgroundColor: '#0d6efd',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    message: {
      textAlign: 'center',
      marginTop: '15px',
      color: '#28a745',
      fontWeight: '500',
    },
    linkText: {
      marginTop: '20px',
      textAlign: 'right',
      fontSize: '0.9rem',
      color: '#444',
    },
    link: {
      color: '#0d6efd',
      cursor: 'pointer',
      textDecoration: 'none',
      fontWeight: '500',
    }
  };

  return (
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
  );
};

export default AdminLogin;
