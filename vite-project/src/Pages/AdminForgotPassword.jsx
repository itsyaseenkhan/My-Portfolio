import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    try {
      const res = await axios.post("http://localhost:5000/api/admin/forgot-password", { email });

      const token = res.data.token; // ✅ Backend must return this token

      setMsg("🔗 Reset link generated. Redirecting...");

      // ✅ Navigate to reset-password page with token
      setTimeout(() => {
        navigate(`/admin/reset-password/${token}`);
      }, 1500);
    } catch (err) {
      setError("❌ Email not found or something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Forgot Password</h2>
      <form onSubmit={handleForgot} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send Reset Link</button>
      </form>

      {msg && <p style={styles.success}>{msg}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '420px',
    margin: '100px auto',
    padding: '40px',
    borderRadius: '12px',
    background: '#ffffff',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '14px 16px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: '0.3s ease',
  },
  button: {
    padding: '14px',
    marginTop: '12px',
    backgroundColor: '#0d6efd',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '17px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  success: {
    textAlign: 'center',
    color: '#28a745',
    marginTop: '15px',
    fontWeight: '500',
  },
  error: {
    textAlign: 'center',
    color: '#dc3545',
    marginTop: '15px',
    fontWeight: '500',
  }
};

export default AdminForgotPassword;
