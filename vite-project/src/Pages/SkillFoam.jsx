import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', percentage: '', type: 'technical' });
  const [editId, setEditId] = useState(null);
  const API_URL = 'https://my-portfolio-backends.onrender.com/api/skillFoam';

  const fetchSkills = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const combined = [...data.technical, ...data.professional];
      setSkills(combined);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({ ...newSkill, [name]: value });
  };

  const handleSubmit = async () => {
    if (!newSkill.name || !newSkill.percentage) return alert("All fields required.");

    try {
      const res = await fetch(editId ? `${API_URL}/${editId}` : API_URL, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: newSkill.name, 
          percentage: parseInt(newSkill.percentage), 
          type: newSkill.type 
        })
      });

      if (!res.ok) throw new Error("Skill not saved");

      alert(editId ? "Skill Updated" : "Skill Added");
      setNewSkill({ name: '', percentage: '', type: 'technical' });
      setEditId(null);
      setShowForm(false);
      fetchSkills();
    } catch (error) {
      console.error(error);
      alert("Failed to save skill");
    }
  };

  const handleEdit = (skill) => {
    setNewSkill(skill);
    setEditId(skill._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert("Skill deleted");
        fetchSkills();
      }
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.heading}>Skills Manager</h2>
        <button 
          style={styles.addBtn} 
          onClick={() => {
            setNewSkill({ name: '', percentage: '', type: 'technical' });
            setEditId(null);
            setShowForm(true);
          }}
        >
          <FaPlus style={styles.icon} /> Add Skill
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Percentage</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(skill => (
              <tr key={skill._id} style={styles.tr}>
                <td style={styles.td}>{skill.name}</td>
                <td style={styles.td}>{skill.percentage}%</td>
                <td style={styles.td}>{skill.type}</td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button 
                      style={styles.iconBtn} 
                      onClick={() => handleEdit(skill)} 
                      title="Edit"
                    >
                      <FaEdit style={styles.icon} />
                    </button>
                    <button 
                      style={styles.iconBtnRed} 
                      onClick={() => handleDelete(skill._id)} 
                      title="Delete"
                    >
                      <FaTrash style={styles.icon} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={styles.formBox}>
          <h3 style={styles.formTitle}>{editId ? "Edit Skill" : "Add New Skill"}</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Skill Name</label>
            <input
              style={styles.input}
              name="name"
              value={newSkill.name}
              onChange={handleChange}
              placeholder="e.g. JavaScript"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Percentage (0-100)</label>
            <input
              style={styles.input}
              name="percentage"
              type="number"
              value={newSkill.percentage}
              onChange={handleChange}
              placeholder="e.g. 80"
              min="0"
              max="100"
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Skill Type</label>
            <select
              style={styles.select}
              name="type"
              value={newSkill.type}
              onChange={handleChange}
            >
              <option value="technical">Technical</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <div style={styles.formButtons}>
            <button 
              style={styles.saveBtn} 
              onClick={handleSubmit}
            >
              {editId ? "Update Skill" : "Save Skill"}
            </button>
            <button 
              style={styles.cancelBtn} 
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    padding: '1.5rem',
    maxWidth: '1200px',
    margin: '2rem auto',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
    '@media (min-width: 768px)': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  heading: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0,
  },
  addBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '0.375rem',
    color: '#ffffff',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#2563eb',
    },
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
    borderRadius: '0.375rem',
    border: '1px solid #e2e8f0',
    marginBottom: '1.5rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
  },
  th: {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    fontWeight: '600',
    fontSize: '0.875rem',
    borderBottom: '1px solid #e2e8f0',
  },
  tr: {
    borderBottom: '1px solid #e2e8f0',
    ':hover': {
      backgroundColor: '#f8fafc',
    },
  },
  td: {
    padding: '1rem',
    fontSize: '0.875rem',
    color: '#334155',
  },
  actionButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  iconBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#e0f2fe',
    },
  },
  iconBtnRed: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ef4444',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '0.25rem',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#fee2e2',
    },
  },
  icon: {
    fontSize: '1rem',
  },
  formBox: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #e2e8f0',
    marginTop: '1.5rem',
  },
  formTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 0,
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#64748b',
  },
  input: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    color: '#1e293b',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    ':focus': {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
  },
  select: {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    color: '#1e293b',
    backgroundColor: '#ffffff',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    ':focus': {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
  },
  formButtons: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1.5rem',
  },
  saveBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#10b981',
    border: 'none',
    borderRadius: '0.375rem',
    color: '#ffffff',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#059669',
    },
  },
  cancelBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    color: '#64748b',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#f1f5f9',
    },
  },
  '@media (max-width: 640px)': {
    container: {
      padding: '1rem',
    },
    td: {
      padding: '0.75rem 0.5rem',
    },
    formBox: {
      padding: '1rem',
    },
  },
};

export default SkillManager;