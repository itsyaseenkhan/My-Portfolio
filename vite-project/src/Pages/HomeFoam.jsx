// import React, { useState, useEffect } from "react";

// function HomeForm() {
//   const [form, setForm] = useState({
//     name: "",
//     roles: "",
//     bio: "",
//     imageFile: null,
//     cvLink: ""
//   });

//   useEffect(() => {
//     fetch("https://my-portfolio-backends.onrender.com/api/adminhome")
//       .then(res => res.json())
//       .then(data => {
//         setForm(f => ({
//           ...f,
//           name: data.name || "",
//           roles: data.roles ? data.roles.join(", ") : "",
//           bio: data.bio || "",
//           cvLink: data.cvLink || ""
//         }));
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files.length > 0) {
//       setForm({ ...form, imageFile: files[0] }); 
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = new FormData();
//     payload.append("name", form.name);
//     payload.append("roles", JSON.stringify(form.roles.split(",").map(r => r.trim())));
//     payload.append("bio", form.bio);
//     payload.append("cvLink", form.cvLink); 
//     if (form.imageFile) payload.append("image", form.imageFile);

//     await fetch("https://my-portfolio-backends.onrender.com/api/adminhome", {
//       method: "POST",
//       body: payload
//     });

//     alert("Data saved successfully!");
//   };

//   return (
//     <div style={{
//       maxWidth: "1000px",
//       margin: "2rem auto",
//       padding: "2rem",
//       background: "#fff",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       width: "90%",
//       boxSizing: "border-box"
//     }}>
//       <h2 style={{
//         textAlign: "left",
//         marginBottom: "1.5rem",
//         color: "#4f46e5",
//         fontSize: "1.75rem",
//         fontWeight: "600"
//       }}> New Home page </h2>
      
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//         <div>
//           <label style={styles.label}>Name</label>
//           <input 
//             style={styles.input} 
//             name="name" 
//             placeholder="Enter your name" 
//             value={form.name} 
//             onChange={handleChange} 
//           />
//         </div>
        
//         <div>
//           <label style={styles.label}>Roles (comma-separated)</label>
//           <input 
//             style={styles.input} 
//             name="roles" 
//             placeholder="Developer, Designer, etc." 
//             value={form.roles} 
//             onChange={handleChange} 
//           />
//         </div>
        
//         <div>
//           <label style={styles.label}>Bio</label>
//           <textarea 
//             style={styles.textarea} 
//             name="bio" 
//             placeholder="Tell us about yourself..." 
//             value={form.bio} 
//             onChange={handleChange}
//           ></textarea>
//         </div>
        
//         <div>
//           <label style={styles.label}>Profile Image</label>
//           <input 
//             style={{ ...styles.input, padding: "0.5rem" }} 
//             name="image" 
//             type="file" 
//             accept="image/*" 
//             onChange={handleChange} 
//           />
//         </div>
        
//         <div>
//           <label style={styles.label}>CV Link (URL)</label>
//           <input 
//             style={styles.input} 
//             name="cvLink" 
//             placeholder="https://example.com/cv.pdf" 
//             value={form.cvLink} 
//             onChange={handleChange} 
//           />
//         </div>
        
//         <button 
//           style={styles.button} 
//           type="submit"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   input: {
//     width: "100%", 
//     padding: "0.75rem 1rem", 
//     border: "1px solid #e2e8f0", 
//     borderRadius: "0.375rem",
//     fontSize: "0.9375rem", 
//     transition: "all 0.2s ease",
//     boxSizing: "border-box",
//     backgroundColor: "#f8fafc",
//     color: "#1e293b",
//     boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
//     marginTop: "0.25rem"
//   },
//   textarea: {
//     width: "100%", 
//     padding: "0.75rem 1rem", 
//     minHeight: "120px", 
//     border: "1px solid #e2e8f0", 
//     borderRadius: "0.375rem",
//     fontSize: "0.9375rem", 
//     resize: "vertical", 
//     transition: "all 0.2s ease",
//     boxSizing: "border-box",
//     backgroundColor: "#f8fafc",
//     color: "#1e293b",
//     boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
//     marginTop: "0.25rem",
//     lineHeight: "1.5"
//   },
//   button: {
//     width: "100%", 
//     padding: "0.75rem", 
//     background: "#4f46e5",
//     color: "#fff", 
//     border: "none", 
//     borderRadius: "0.375rem",
//     fontSize: "1rem", 
//     fontWeight: "500", 
//     cursor: "pointer",
//     transition: "all 0.2s ease",
//     marginTop: "0.5rem",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     ":hover": {
//       background: "#4338ca",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)"
//     },
//     ":active": {
//       transform: "scale(0.98)"
//     }
//   },
//   label: {
//     display: "block",
//     fontSize: "0.875rem",
//     fontWeight: "500",
//     color: "#334155",
//     marginBottom: "0.25rem"
//   }
// };

// export default HomeForm;

// import React, { useState, useEffect } from "react";

// function HomeForm() {
//   const [form, setForm] = useState({
//     name: "",
//     roles: "",
//     bio: "",
//     imageFile: null,
//     cvLink: ""
//   });

//   useEffect(() => {
//     fetch("http://localhost:5000/api/adminhome")
//       .then(res => res.json())
//       .then(data => {
//         setForm(f => ({
//           ...f,
//           name: data.name || "",
//           roles: data.roles ? data.roles.join(", ") : "",
//           bio: data.bio || "",
//           cvLink: data.cvLink || ""
//         }));
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files.length > 0) {
//       setForm({ ...form, imageFile: files[0] }); 
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = new FormData();
//     payload.append("name", form.name);
//     payload.append("roles", JSON.stringify(form.roles.split(",").map(r => r.trim())));
//     payload.append("bio", form.bio);
//     payload.append("cvLink", form.cvLink); 
//     if (form.imageFile) payload.append("image", form.imageFile);

//     await fetch("http://localhost:5000/api/adminhome", {
//       method: "POST",
//       body: payload
//     });

//     alert("Data saved successfully!");
//   };

//   return (
//     <div style={{
//       maxWidth: "1000px",
//       margin: "2rem auto",
//       padding: "2rem",
//       background: "#fff",
//       borderRadius: "12px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       width: "90%",
//       boxSizing: "border-box"
//     }}>
//       <h2 style={{
//         textAlign: "left",
//         marginBottom: "1.5rem",
//         color: "#4f46e5",
//         fontSize: "1.75rem",
//         fontWeight: "600"
//       }}> New Home page </h2>
      
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//         <div>
//           <label style={styles.label}>Name</label>
//           <input 
//             style={styles.input} 
//             name="name" 
//             placeholder="Enter your name" 
//             value={form.name} 
//             onChange={handleChange} 
//           />
//         </div>
        
//         <div>
//           <label style={styles.label}>Roles (comma-separated)</label>
//           <input 
//             style={styles.input} 
//             name="roles" 
//             placeholder="Developer, Designer, etc." 
//             value={form.roles} 
//             onChange={handleChange} 
//           />
//         </div>
        
//         <div>
//           <label style={styles.label}>Bio</label>
//           <textarea 
//             style={styles.textarea} 
//             name="bio" 
//             placeholder="Tell us about yourself..." 
//             value={form.bio} 
//             onChange={handleChange}
//           ></textarea>
//         </div>
        
//         <div>
//           <label style={styles.label}>Profile Image</label>
//           <input 
//             style={{ ...styles.input, padding: "0.5rem" }} 
//             name="image" 
//             type="file" 
//             accept="image/*" 
//             onChange={handleChange} 
//           />
//         </div>
        
//         <div>
//           <label style={styles.label}>CV Link (URL)</label>
//           <input 
//             style={styles.input} 
//             name="cvLink" 
//             placeholder="https://example.com/cv.pdf" 
//             value={form.cvLink} 
//             onChange={handleChange} 
//           />
//         </div>
        
//         <button 
//           style={styles.button} 
//           type="submit"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   input: {
//     width: "100%", 
//     padding: "0.75rem 1rem", 
//     border: "1px solid #e2e8f0", 
//     borderRadius: "0.375rem",
//     fontSize: "0.9375rem", 
//     transition: "all 0.2s ease",
//     boxSizing: "border-box",
//     backgroundColor: "#f8fafc",
//     color: "#1e293b",
//     boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
//     marginTop: "0.25rem"
//   },
//   textarea: {
//     width: "100%", 
//     padding: "0.75rem 1rem", 
//     minHeight: "120px", 
//     border: "1px solid #e2e8f0", 
//     borderRadius: "0.375rem",
//     fontSize: "0.9375rem", 
//     resize: "vertical", 
//     transition: "all 0.2s ease",
//     boxSizing: "border-box",
//     backgroundColor: "#f8fafc",
//     color: "#1e293b",
//     boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
//     marginTop: "0.25rem",
//     lineHeight: "1.5"
//   },
//   button: {
//     width: "100%", 
//     padding: "0.75rem", 
//     background: "#4f46e5",
//     color: "#fff", 
//     border: "none", 
//     borderRadius: "0.375rem",
//     fontSize: "1rem", 
//     fontWeight: "500", 
//     cursor: "pointer",
//     transition: "all 0.2s ease",
//     marginTop: "0.5rem",
//     boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
//     ":hover": {
//       background: "#4338ca",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)"
//     },
//     ":active": {
//       transform: "scale(0.98)"
//     }
//   },
//   label: {
//     display: "block",
//     fontSize: "0.875rem",
//     fontWeight: "500",
//     color: "#334155",
//     marginBottom: "0.25rem"
//   }
// };

// export default HomeForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeForm() {
  const [form, setForm] = useState({
    name: "",
    roles: "",
    bio: "",
    imageFile: null,
    cvLink: "",
    imagePreview: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://my-portfolio-backends.onrender.com/api/adminhome");
      setForm({
        name: res.data.name || "",
        roles: res.data.roles ? res.data.roles.join(", ") : "",
        bio: res.data.bio || "",
        cvLink: res.data.cvLink || "",
        imageFile: null,
        imagePreview: res.data.imageUrl || ""
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      showMessage("Failed to load data", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ 
          ...prev, 
          imageFile: files[0],
          imagePreview: reader.result 
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'portfolio_preset'); // Create this in Cloudinary
    
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      let imageUrl = form.imagePreview;
      
      // Upload new image if selected
      if (form.imageFile) {
        imageUrl = await uploadToCloudinary(form.imageFile);
      }

      // Prepare the data to send to backend
      const dataToSend = {
        name: form.name,
        bio: form.bio,
        roles: form.roles.split(",").map(r => r.trim()),
        cvLink: form.cvLink,
        imageUrl: imageUrl
      };

      await axios.post(
        "https://my-portfolio-backends.onrender.com/api/adminhome", 
        dataToSend
      );

      showMessage("Data saved successfully!", "success");
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
      showMessage("Error saving data. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "2rem auto",
      padding: "2rem",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    title: {
      textAlign: "center",
      marginBottom: "1.5rem",
      color: "#333"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    },
    input: {
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "1rem"
    },
    textarea: {
      padding: "0.75rem",
      border: "1px solid #ddd",
      borderRadius: "4px",
      minHeight: "120px",
      fontSize: "1rem",
      resize: "vertical"
    },
    button: {
      padding: "0.75rem",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1rem",
      marginTop: "1rem",
      opacity: loading ? 0.7 : 1
    },
    imagePreview: {
      width: "150px",
      height: "150px",
      objectFit: "cover",
      borderRadius: "4px",
      margin: "0.5rem 0",
      border: "1px solid #ddd"
    },
    message: {
      padding: "0.75rem",
      margin: "1rem 0",
      borderRadius: "4px",
      backgroundColor: message.type === "error" ? "#ffebee" : "#e8f5e9",
      color: message.type === "error" ? "#c62828" : "#2e7d32",
      textAlign: "center"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Home Section Editor</h2>
      
      {message.text && (
        <div style={styles.message}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Name</label>
          <input
            style={styles.input}
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Roles (comma separated)</label>
          <input
            style={styles.input}
            name="roles"
            value={form.roles}
            onChange={handleChange}
            placeholder="Developer, Designer, etc."
            required
          />
        </div>

        <div>
          <label>Bio</label>
          <textarea
            style={styles.textarea}
            name="bio"
            value={form.bio}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>CV Link</label>
          <input
            style={styles.input}
            name="cvLink"
            value={form.cvLink}
            onChange={handleChange}
            placeholder="https://example.com/cv.pdf"
            required
          />
        </div>

        <div>
          <label>Profile Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            style={{ margin: "0.5rem 0" }}
          />
          {form.imagePreview && (
            <img 
              src={form.imagePreview} 
              alt="Preview" 
              style={styles.imagePreview}
            />
          )}
        </div>

        <button 
          type="submit" 
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default HomeForm;