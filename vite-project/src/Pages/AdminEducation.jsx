import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminEducation = () => {
  const [formData, setFormData] = useState({
    degree: "",
    institute: "",
    board: "",
    year: "",
    grade: "",
    image: "",
  });
  const [educations, setEducations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEducations = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/AdminEducation");
      setEducations(res.data);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch education records");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/AdminEducation/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/AdminEducation", formData);
      }
      resetForm();
      fetchEducations();
    } catch (err) {
      console.error("Error:", err);
      setError("Error saving data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (edu) => {
    setFormData(edu);
    setEditId(edu._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setIsLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/AdminEducation/${id}`);
        fetchEducations();
      } catch (err) {
        console.error("Delete error:", err);
        setError("Failed to delete record");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ degree: "", institute: "", board: "", year: "", grade: "", image: "" });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Education Records</h2>
        <button
          style={styles.addButton}
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          disabled={isLoading}
        >
          {showForm ? "✖ Close" : "➕ Add Education"}
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {showForm && (
        <form style={styles.form} onSubmit={handleSubmit}>
          <h3 style={styles.formTitle}>
            {editId ? "Edit Education Record" : "Add New Education"}
          </h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Degree/Certificate</label>
            <input
              type="text"
              name="degree"
              placeholder="e.g. Bachelor of Science"
              value={formData.degree}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Institute</label>
            <input
              type="text"
              name="institute"
              placeholder="e.g. University of XYZ"
              value={formData.institute}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Board/University</label>
            <input
              type="text"
              name="board"
              placeholder="e.g. BSEK, HEC"
              value={formData.board}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Year</label>
            <input
              type="text"
              name="year"
              placeholder="e.g. 2018 - 2022"
              value={formData.year}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Grade/Percentage</label>
            <input
              type="text"
              name="grade"
              placeholder="e.g. 3.8 GPA or 85%"
              value={formData.grade}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Certificate Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.formButtons}>
            <button
              type="submit"
              style={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : editId ? "Update Record" : "Add Record"}
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={resetForm}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {isLoading && educations.length === 0 ? (
        <div style={styles.loading}>Loading education records...</div>
      ) : (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.th}>Certificate</th>
                <th style={styles.th}>Degree</th>
                <th style={styles.th}>Institute</th>
                <th style={styles.th}>Board</th>
                <th style={styles.th}>Year</th>
                <th style={styles.th}>Grade</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {educations.map((edu) => (
                <tr key={edu._id} style={styles.tr}>
                  <td style={styles.td}>
                    <img
                      src={edu.image}
                      alt={edu.degree}
                      style={styles.certificateImage}
                    />
                  </td>
                  <td style={styles.td}>{edu.degree}</td>
                  <td style={styles.td}>{edu.institute}</td>
                  <td style={styles.td}>{edu.board}</td>
                  <td style={styles.td}>{edu.year}</td>
                  <td style={styles.td}>{edu.grade}</td>
                  <td style={styles.td}>
                    <div style={styles.actionButtons}>
                      <button
                        style={styles.editButton}
                        onClick={() => handleEdit(edu)}
                        title="Edit"
                        disabled={isLoading}
                      >
                        ✏️
                      </button>
                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDelete(edu._id)}
                        title="Delete"
                        disabled={isLoading}
                      >
                        🗑️
                      </button>
                    </div>
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
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1.5rem",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1e293b",
    margin: 0,
  },
  addButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "0.375rem",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#2563eb",
    },
  },
  error: {
    padding: "1rem",
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "0.375rem",
    marginBottom: "1.5rem",
  },
  form: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    marginBottom: "2rem",
  },
  formTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1e293b",
    marginTop: 0,
    marginBottom: "1.5rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#64748b",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #e2e8f0",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    color: "#1e293b",
    backgroundColor: "#ffffff",
    transition: "border-color 0.2s, box-shadow 0.2s",
    ":focus": {
      outline: "none",
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    },
  },
  formButtons: {
    display: "flex",
    gap: "1rem",
    marginTop: "1.5rem",
  },
  submitButton: {
    padding: "0.75rem 1rem",
    backgroundColor: "#10b981",
    color: "#ffffff",
    border: "none",
    borderRadius: "0.375rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#059669",
    },
  },
  cancelButton: {
    padding: "0.75rem 1rem",
    backgroundColor: "#ffffff",
    color: "#64748b",
    border: "1px solid #e2e8f0",
    borderRadius: "0.375rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#f1f5f9",
    },
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
    color: "#64748b",
  },
  tableContainer: {
    width: "100%",
    overflowX: "auto",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
  },
  tableHeader: {
    backgroundColor: "#f1f5f9",
  },
  th: {
    padding: "1rem",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "0.875rem",
    color: "#64748b",
  },
  tr: {
    borderBottom: "1px solid #e2e8f0",
    ":hover": {
      backgroundColor: "#f8fafc",
    },
  },
  td: {
    padding: "1rem",
    fontSize: "0.875rem",
    color: "#334155",
    verticalAlign: "middle",
  },
  certificateImage: {
    width: "50px",
    height: "50px",
    borderRadius: "0.25rem",
    objectFit: "cover",
  },
  actionButtons: {
    display: "flex",
    gap: "0.5rem",
  },
  editButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#3b82f6",
    cursor: "pointer",
    padding: "0.25rem",
    borderRadius: "0.25rem",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#e0f2fe",
    },
  },
  deleteButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ef4444",
    cursor: "pointer",
    padding: "0.25rem",
    borderRadius: "0.25rem",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#fee2e2",
    },
  },
  "@media (max-width: 768px)": {
    container: {
      padding: "1rem",
    },
    form: {
      padding: "1rem",
    },
    th: {
      padding: "0.75rem 0.5rem",
      fontSize: "0.75rem",
    },
    td: {
      padding: "0.75rem 0.5rem",
      fontSize: "0.75rem",
    },
    certificateImage: {
      width: "40px",
      height: "40px",
    },
    actionButtons: {
      flexDirection: "column",
      gap: "0.25rem",
    },
  },
};

export default AdminEducation;