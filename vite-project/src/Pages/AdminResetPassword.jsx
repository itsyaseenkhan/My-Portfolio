import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!token) {
      setMsg("❌ Invalid reset link.");
      return;
    }

    setLoading(true);
    setMsg('');
    try {
      const res = await axios.post(`https://my-portfolio-backends.onrender.com/api/admin/reset-password/${token}`, {
        newPassword
      });

      setMsg("✅ Password reset successful! Redirecting...");

      // Optional: save JWT if backend sends
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
      }

      setTimeout(() => {
        navigate("/admin/login");
      }, 1500);

    } catch (err) {
      const errMsg = err.response?.data?.msg || "❌ Reset failed. Token invalid or expired.";
      setMsg(errMsg);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Reset Your Password</h2>
      <form onSubmit={handleReset} style={styles.form}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button 
          type="submit" 
          style={{ 
            ...styles.button, 
            backgroundColor: loading ? '#6c757d' : '#28a745' 
          }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </form>
      <p style={styles.message}>{msg}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '80px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fdfdfd',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '16px'
  },
  button: {
    padding: '12px',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  message: {
    textAlign: 'center',
    marginTop: '15px',
    fontSize: '15px',
    color: '#007bff'
  }
};

export default AdminResetPassword;

// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [newPassword, setNewPassword] = useState('');
//   const [msg, setMsg] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleReset = async (e) => {
//     e.preventDefault();
//     if (!token) {
//       setMsg("❌ Invalid reset link.");
//       return;
//     }

//     setLoading(true);
//     setMsg('');
//     try {
//       const res = await axios.post(`http://localhost:5000/api/admin/reset-password/${token}`, {
//         newPassword
//       });

//       setMsg("✅ Password reset successful! Redirecting...");

//       // Optional: save JWT if backend sends
//       if (res.data.token) {
//         localStorage.setItem("adminToken", res.data.token);
//       }

//       setTimeout(() => {
//         navigate("/admin/login");
//       }, 1500);

//     } catch (err) {
//       const errMsg = err.response?.data?.msg || "❌ Reset failed. Token invalid or expired.";
//       setMsg(errMsg);
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Reset Your Password</h2>
//       <form onSubmit={handleReset} style={styles.form}>
//         <input
//           type="password"
//           placeholder="Enter new password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//           style={styles.input}
//         />
//         <button 
//           type="submit" 
//           style={{ 
//             ...styles.button, 
//             backgroundColor: loading ? '#6c757d' : '#28a745' 
//           }}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Reset Password"}
//         </button>
//       </form>
//       <p style={styles.message}>{msg}</p>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: '80px auto',
//     padding: '30px',
//     border: '1px solid #ccc',
//     borderRadius: '10px',
//     backgroundColor: '#fdfdfd',
//     fontFamily: 'Arial, sans-serif',
//     boxShadow: '0 0 15px rgba(0,0,0,0.1)'
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: '20px',
//     color: '#333'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   input: {
//     padding: '12px',
//     margin: '10px 0',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     fontSize: '16px'
//   },
//   button: {
//     padding: '12px',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease'
//   },
//   message: {
//     textAlign: 'center',
//     marginTop: '15px',
//     fontSize: '15px',
//     color: '#007bff'
//   }
// };

// export default AdminResetPassword;