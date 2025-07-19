import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    technologies: '',
    featured: false
  });

  const API_BASE = 'http://localhost:5000/api';

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Upload project with image
  const handleProjectUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile || !formData.title || !formData.description) {
      alert('Please fill in all required fields and select an image');
      return;
    }

    setUploading(true);
    
    try {
      const projectFormData = new FormData();
      projectFormData.append('image', selectedFile);
      projectFormData.append('title', formData.title);
      projectFormData.append('description', formData.description);
      projectFormData.append('link', formData.link);
      projectFormData.append('technologies', JSON.stringify(formData.technologies.split(',').map(t => t.trim()).filter(t => t)));
      projectFormData.append('featured', formData.featured);

      const response = await axios.post(`${API_BASE}/projects`, projectFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedImage(response.data.project.image);
      alert('Project uploaded successfully!');
      
      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setFormData({
        title: '',
        description: '',
        link: '',
        technologies: '',
        featured: false
      });
      
      // Refresh projects list
      fetchProjects();
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE}/projects`);
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await axios.delete(`${API_BASE}/projects/${projectId}`);
      alert('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Delete failed: ' + (error.response?.data?.error || error.message));
    }
  };

  // Load projects on component mount
  React.useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="image-upload-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Portfolio Image Upload System</h2>
      
      {/* Upload Form */}
      <form onSubmit={handleProjectUpload} style={{ marginBottom: '40px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
        <h3>Add New Project</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Project Link
          </label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Technologies (comma separated)
          </label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleInputChange}
            placeholder="React, Node.js, MongoDB"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              style={{ marginRight: '8px' }}
            />
            Featured Project
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Project Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        {preview && (
          <div style={{ marginBottom: '15px' }}>
            <p>Preview:</p>
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'cover', borderRadius: '4px' }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          style={{
            backgroundColor: uploading ? '#ccc' : '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: uploading ? 'not-allowed' : 'pointer'
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Project'}
        </button>
      </form>

      {/* Upload Result */}
      {uploadedImage && (
        <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3>Last Uploaded Image:</h3>
          <img
            src={uploadedImage.url}
            alt="Uploaded"
            style={{ maxWidth: '400px', maxHeight: '300px', objectFit: 'cover', borderRadius: '4px' }}
          />
          <p><strong>Public ID:</strong> {uploadedImage.publicId}</p>
          <p><strong>Dimensions:</strong> {uploadedImage.width} x {uploadedImage.height}</p>
          <p><strong>Format:</strong> {uploadedImage.format}</p>
          <p><strong>Size:</strong> {(uploadedImage.bytes / 1024).toFixed(2)} KB</p>
        </div>
      )}

      {/* Projects List */}
      <div>
        <h3>All Projects ({projects.length})</h3>
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {projects.map((project) => (
              <div
                key={project._id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  display: 'flex',
                  gap: '15px'
                }}
              >
                {project.image && project.image.url && (
                  <img
                    src={project.image.url}
                    alt={project.title}
                    style={{
                      width: '150px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h4>{project.title} {project.featured && <span style={{ color: '#ffa500' }}>⭐</span>}</h4>
                  <p>{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <p><strong>Tech:</strong> {project.technologies.join(', ')}</p>
                  )}
                  {project.link && (
                    <p><a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a></p>
                  )}
                  <p><small>Created: {new Date(project.createdAt).toLocaleDateString()}</small></p>
                  <button
                    onClick={() => deleteProject(project._id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;