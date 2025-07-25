import React, { useState, useEffect } from "react";

function HomeForm() {
  const [form, setForm] = useState({
    name: "",
    roles: "",
    bio: "",
    imageFile: null,
    cvLink: ""
  });

  useEffect(() => {
    fetch("https://my-portfolio-backends.onrender.com/api/adminhome")
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name || "",
          roles: data.roles?.join(", ") || "",
          bio: data.bio || "",
          imageFile: null,
          cvLink: data.cvLink || ""
        });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("bio", form.bio);
    formData.append("roles", JSON.stringify(form.roles.split(",").map(r => r.trim())));
    formData.append("cvLink", form.cvLink);
    if (form.imageFile) {
      formData.append("image", form.imageFile);
    }

    await fetch("https://my-portfolio-backends.onrender.com/api/adminhome", {
      method: "POST",
      body: formData
    });

    alert("✅ Updated successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="roles" value={form.roles} onChange={handleChange} placeholder="Roles (comma separated)" />
      <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" />
      <input name="cvLink" value={form.cvLink} onChange={handleChange} placeholder="CV Link" />
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
}

export default HomeForm;


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

