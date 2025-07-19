import React, { useState, useEffect } from 'react';

const AdminProject = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    link: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('https://my-portfolio-backends.onrender.com/api/projects');
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch projects');
      }

      setProjects(data.data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    fetchProjects(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Validate form
      if (!form.title || !form.description || !form.link) {
        throw new Error('All fields are required');
      }

      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('link', form.link);
      if (imageFile) formData.append('image', imageFile);

      const url = editingId 
        ? `https://my-portfolio-backends.onrender.com/api/projects/${editingId}`
        : 'https://my-portfolio-backends.onrender.com/api/projects';

      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to save project');
      }

      alert(editingId ? 'Project updated successfully!' : 'Project added successfully!');
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`https://my-portfolio-backends.onrender.com/api/projects/${id}`, {
        method: 'DELETE'
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to delete project');
      }

      alert('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Deletion error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      link: project.link
    });
    setImagePreview(project.image ? `https://my-portfolio-backends.onrender.com${project.image}` : '');
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setForm({ title: '', description: '', link: '' });
    setImageFile(null);
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
  };

  // Styles and JSX remain the same as your original component
  // ...

  return (
    <div style={styles.container}>
      {/* Header and form JSX remains the same */}
      {/* ... */}

      {error && (
        <div style={{ 
          color: '#ef4444',
          backgroundColor: '#fee2e2',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem'
        }}>
          Error: {error}
        </div>
      )}

      {/* Rest of your component JSX */}
      {/* ... */}
    </div>
  );
};

export default AdminProject;

// import React, { useState, useEffect } from 'react';

// const AdminProject = () => {
//   const [form, setForm] = useState({
//     title: '',
//     description: '',
//     link: ''
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchProjects = async () => {
//     setIsLoading(true);
//     try {
//       const res = await fetch('http://localhost:5000/api/projects');
//       const data = await res.json();
//       setProjects(data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const data = new FormData();
//       data.append('title', form.title);
//       data.append('description', form.description);
//       data.append('link', form.link);
//       if (imageFile) data.append('image', imageFile);

//       const url = editingId 
//         ? `http://localhost:5000/api/projects/${editingId}`
//         : 'http://localhost:5000/api/projects';

//       const method = editingId ? 'PUT' : 'POST';

//       const res = await fetch(url, {
//         method,
//         body: data,
//       });

//       if (res.ok) {
//         alert(editingId ? 'Project updated successfully!' : 'Project added successfully!');
//         resetForm();
//         fetchProjects();
//       } else {
//         throw new Error('Failed to save project');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this project?')) return;
    
//     setIsLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
//         method: 'DELETE'
//       });

//       if (res.ok) {
//         alert('Project deleted successfully!');
//         fetchProjects();
//       }
//     } catch (error) {
//       console.error('Error deleting project:', error);
//       alert('Failed to delete project');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = (project) => {
//     setForm({
//       title: project.title,
//       description: project.description,
//       link: project.link
//     });
//     setEditingId(project._id);
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const resetForm = () => {
//     setForm({ title: '', description: '', link: '' });
//     setImageFile(null);
//     setEditingId(null);
//     setShowForm(false);
//   };

//   const styles = {
//     container: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '1.5rem',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '2rem',
//       flexWrap: 'wrap',
//       gap: '1rem',
//     },
//     title: {
//       fontSize: '1.5rem',
//       fontWeight: '600',
//       color: '#1e293b',
//       margin: 0,
//     },
//     addButton: {
//       padding: '0.5rem 1rem',
//       backgroundColor: '#3b82f6',
//       color: '#ffffff',
//       border: 'none',
//       borderRadius: '0.375rem',
//       fontWeight: '500',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       transition: 'background-color 0.2s',
//       ':hover': {
//         backgroundColor: '#2563eb',
//       },
//     },
//     formContainer: {
//       maxHeight: showForm ? '800px' : '0',
//       overflow: 'hidden',
//       transition: 'max-height 0.3s ease, padding 0.3s ease',
//       marginBottom: '2rem',
//       backgroundColor: '#ffffff',
//       borderRadius: '0.5rem',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//     },
//     form: {
//       padding: '1.5rem',
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '1rem',
//     },
//     formTitle: {
//       fontSize: '1.25rem',
//       fontWeight: '600',
//       color: '#1e293b',
//       margin: 0,
//     },
//     inputGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '0.5rem',
//     },
//     label: {
//       fontSize: '0.875rem',
//       fontWeight: '500',
//       color: '#64748b',
//     },
//     input: {
//       padding: '0.75rem',
//       border: '1px solid #e2e8f0',
//       borderRadius: '0.375rem',
//       fontSize: '0.875rem',
//       transition: 'border-color 0.2s, box-shadow 0.2s',
//       ':focus': {
//         outline: 'none',
//         borderColor: '#3b82f6',
//         boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
//       },
//     },
//     fileInputContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1rem',
//     },
//     fileInputLabel: {
//       padding: '0.5rem 1rem',
//       backgroundColor: '#3b82f6',
//       color: '#ffffff',
//       borderRadius: '0.375rem',
//       cursor: 'pointer',
//       fontSize: '0.875rem',
//       fontWeight: '500',
//       transition: 'background-color 0.2s',
//       ':hover': {
//         backgroundColor: '#2563eb',
//       },
//     },
//     fileName: {
//       fontSize: '0.875rem',
//       color: '#64748b',
//     },
//     formButtons: {
//       display: 'flex',
//       gap: '1rem',
//       marginTop: '1rem',
//     },
//     submitButton: {
//       padding: '0.75rem 1rem',
//       backgroundColor: '#10b981',
//       color: '#ffffff',
//       border: 'none',
//       borderRadius: '0.375rem',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'background-color 0.2s',
//       ':hover': {
//         backgroundColor: '#059669',
//       },
//     },
//     cancelButton: {
//       padding: '0.75rem 1rem',
//       backgroundColor: '#ffffff',
//       color: '#64748b',
//       border: '1px solid #e2e8f0',
//       borderRadius: '0.375rem',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'background-color 0.2s',
//       ':hover': {
//         backgroundColor: '#f1f5f9',
//       },
//     },
//     tableContainer: {
//       width: '100%',
//       overflowX: 'auto',
//       borderRadius: '0.5rem',
//       boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//     },
//     table: {
//       width: '100%',
//       borderCollapse: 'collapse',
//       backgroundColor: '#ffffff',
//     },
//     tableHeader: {
//       backgroundColor: '#f1f5f9',
//     },
//     th: {
//       padding: '1rem',
//       textAlign: 'left',
//       fontWeight: '600',
//       fontSize: '0.875rem',
//       color: '#64748b',
//     },
//     td: {
//       padding: '1rem',
//       borderBottom: '1px solid #e2e8f0',
//       fontSize: '0.875rem',
//       color: '#334155',
//     },
//     projectImage: {
//       width: '80px',
//       height: '60px',
//       borderRadius: '0.25rem',
//       objectFit: 'cover',
//     },
//     link: {
//       color: '#3b82f6',
//       textDecoration: 'none',
//       ':hover': {
//         textDecoration: 'underline',
//       },
//     },
//     actionButtons: {
//       display: 'flex',
//       gap: '0.5rem',
//     },
//     editButton: {
//       backgroundColor: 'transparent',
//       border: 'none',
//       color: '#3b82f6',
//       cursor: 'pointer',
//       padding: '0.25rem',
//       borderRadius: '0.25rem',
//       transition: 'background-color 0.2s',
//       ':hover': {
//         backgroundColor: '#e0f2fe',
//       },
//     },
//     deleteButton: {
//       backgroundColor: 'transparent',
//       border: 'none',
//       color: '#ef4444',
//       cursor: 'pointer',
//       padding: '0.25rem',
//       borderRadius: '0.25rem',
//       transition: 'background-color 0.2s',
//       ':hover': {
//         backgroundColor: '#fee2e2',
//       },
//     },
//     loading: {
//       display: 'flex',
//       justifyContent: 'center',
//       padding: '2rem',
//     },
//     '@media (max-width: 768px)': {
//       container: {
//         padding: '1rem',
//       },
//       form: {
//         padding: '1rem',
//       },
//       th: {
//         padding: '0.75rem 0.5rem',
//       },
//       td: {
//         padding: '0.75rem 0.5rem',
//       },
//       projectImage: {
//         width: '60px',
//         height: '45px',
//       },
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.header}>
//         <h2 style={styles.title}>Projects Management</h2>
//         <button
//           style={styles.addButton}
//           onClick={() => {
//             resetForm();
//             setShowForm(!showForm);
//           }}
//           disabled={isLoading}
//         >
//           {showForm ? '✖ Cancel' : '➕ Add Project'}
//         </button>
//       </div>

//       <div style={styles.formContainer}>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <h3 style={styles.formTitle}>
//             {editingId ? 'Edit Project' : 'Add New Project'}
//           </h3>
          
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Title</label>
//             <input
//               type="text"
//               placeholder="Project title"
//               style={styles.input}
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               required
//             />
//           </div>
          
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Description</label>
//             <input
//               type="text"
//               placeholder="Project description"
//               style={styles.input}
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//               required
//             />
//           </div>
          
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Project Link</label>
//             <input
//               type="url"
//               placeholder="https://example.com"
//               style={styles.input}
//               value={form.link}
//               onChange={(e) => setForm({ ...form, link: e.target.value })}
//               required
//             />
//           </div>
          
//           <div style={styles.inputGroup}>
//             <label style={styles.label}>Project Image</label>
//             <div style={styles.fileInputContainer}>
//               <label style={styles.fileInputLabel}>
//                 Choose Image
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImageFile(e.target.files[0])}
//                   style={{ display: 'none' }}
//                 />
//               </label>
//               <span style={styles.fileName}>
//                 {imageFile ? imageFile.name : 'No file chosen'}
//               </span>
//             </div>
//           </div>
          
//           <div style={styles.formButtons}>
//             <button
//               type="submit"
//               style={styles.submitButton}
//               disabled={isLoading}
//             >
//               {isLoading ? 'Processing...' : editingId ? 'Update Project' : 'Add Project'}
//             </button>
//             <button
//               type="button"
//               style={styles.cancelButton}
//               onClick={resetForm}
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>

//       {isLoading && projects.length === 0 ? (
//         <div style={styles.loading}>Loading projects...</div>
//       ) : (
//         <div style={styles.tableContainer}>
//           <table style={styles.table}>
//             <thead style={styles.tableHeader}>
//               <tr>
//                 <th style={styles.th}>Image</th>
//                 <th style={styles.th}>Title</th>
//                 <th style={styles.th}>Description</th>
//                 <th style={styles.th}>Link</th>
//                 <th style={styles.th}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((project) => (
//                 <tr key={project._id}>
//                   <td style={styles.td}>
//                     <img
//                       src={`http://localhost:5000${project.image}`}
//                       alt={project.title}
//                       style={styles.projectImage}
//                     />
//                   </td>
//                   <td style={styles.td}>{project.title}</td>
//                   <td style={styles.td}>{project.description}</td>
//                   <td style={styles.td}>
//                     <a
//                       href={project.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={styles.link}
//                     >
//                       View Project
//                     </a>
//                   </td>
//                   <td style={styles.td}>
//                     <div style={styles.actionButtons}>
//                       <button
//                         style={styles.editButton}
//                         onClick={() => handleEdit(project)}
//                         title="Edit"
//                         disabled={isLoading}
//                       >
//                         ✏️ Edit
//                       </button>
//                       <button
//                         style={styles.deleteButton}
//                         onClick={() => handleDelete(project._id)}
//                         title="Delete"
//                         disabled={isLoading}
//                       >
//                         🗑️ Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminProject;