import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    image: null,
  });
  const [fileName, setFileName] = useState("No file chosen");
  const [aboutList, setAboutList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await axios.get("https://my-portfolio-backends.onrender.com/api/about");
      setAboutList(res.data);
    } catch (err) {
      console.error("Error fetching about data:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setFileName(files[0] ? files[0].name : "No file chosen");
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }

      if (editId) {
        // Update existing record
        await axios.put(`https://my-portfolio-backends.onrender.com/api/about/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Create new record
        await axios.post("https://my-portfolio-backends.onrender.com/api/about", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      fetchAboutData();
      alert(editId ? "About updated successfully!" : "About saved successfully!");
    } catch (err) {
      console.error("Error saving about:", err);
      alert("Failed to save about section");
    }
  };

  const handleEdit = (about) => {
    setFormData({
      name: about.name,
      title: about.title,
      description: about.description,
      image: null,
    });
    setFileName(about.image ? about.image : "No file chosen");
    setEditId(about._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this about section?")) {
      try {
        await axios.delete(`https://my-portfolio-backends.onrender.com/api/about/${id}`);
        fetchAboutData();
        alert("About section deleted successfully!");
      } catch (err) {
        console.error("Error deleting about:", err);
        alert("Failed to delete about section");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      description: "",
      image: null,
    });
    setFileName("No file chosen");
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h2 style={styles.header}>About Me</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={styles.addButton}
        >
          {showForm ? "✕ Close" : "+ Add New"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write something about yourself..."
              required
              style={styles.textarea}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Profile Image:</label>
            <div style={styles.fileUploadContainer}>
              <label style={styles.fileUploadLabel}>
                Choose File
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required={!editId}
                  style={styles.fileInput}
                />
              </label>
              <span style={styles.fileName}>{fileName}</span>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.submitButton}>
              {editId ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              style={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {aboutList.length > 0 && (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {aboutList.map((about) => (
                <tr key={about._id}>
                  <td style={styles.td}>{about.name}</td>
                  <td style={styles.td}>{about.title}</td>
                  <td style={styles.td}>
                    {about.description.length > 50
                      ? `${about.description.substring(0, 50)}...`
                      : about.description}
                  </td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleEdit(about)}
                      style={styles.actionButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(about._id)}
                      style={{ ...styles.actionButton, ...styles.deleteButton }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    fontFamily: "'Inter', sans-serif",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  header: {
    color: "#3b82f6",
    fontSize: "1.75rem",
    fontWeight: "600",
    margin: 0,
  },
  addButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#2563eb",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.9375rem",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    transition: "all 0.2s ease",
    backgroundColor: "#f9fafb",
  },
  textarea: {
    width: "100%",
    padding: "0.875rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "0.9375rem",
    minHeight: "150px",
    resize: "vertical",
    transition: "all 0.2s ease",
    backgroundColor: "#f9fafb",
    lineHeight: "1.5",
  },
  fileUploadContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  fileUploadLabel: {
    padding: "0.75rem 1.25rem",
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: "500",
    transition: "background-color 0.2s ease",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: "#2563eb",
    },
  },
  fileInput: {
    display: "none",
  },
  fileName: {
    fontSize: "0.875rem",
    color: "#6b7280",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  submitButton: {
    padding: "0.875rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    flex: 1,
    ":hover": {
      backgroundColor: "#2563eb",
    },
  },
  cancelButton: {
    padding: "0.875rem",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    flex: 1,
    ":hover": {
      backgroundColor: "#e5e7eb",
    },
  },
  tableContainer: {
    overflowX: "auto",
    marginTop: "2rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  th: {
    backgroundColor: "#f9fafb",
    padding: "1rem",
    textAlign: "left",
    fontWeight: "600",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    padding: "1rem",
    borderBottom: "1px solid #e5e7eb",
    color: "#4b5563",
  },
  actionButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    marginRight: "0.5rem",
    ":hover": {
      backgroundColor: "#2563eb",
    },
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    ":hover": {
      backgroundColor: "#dc2626",
    },
  },
};

export default AboutForm;