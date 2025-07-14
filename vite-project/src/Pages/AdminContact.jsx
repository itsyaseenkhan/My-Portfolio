import React, { useEffect, useState } from 'react';
import { FaTrash, FaEnvelope, FaUser, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { FiMail, FiMessageSquare } from 'react-icons/fi';

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://my-portfolio-backends.onrender.com/api/contact");
      if (!res.ok) throw new Error('Failed to fetch messages');
      const data = await res.json();
      setMessages(data.reverse());
      setError(null);
    } catch (err) {
      console.error("Failed to fetch contact messages:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this message?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://my-portfolio-backends.onrender.com/api/contact/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Delete failed');
      
      setMessages(prev => prev.filter(msg => msg._id !== id));
      if (selectedMessage?._id === id) setSelectedMessage(null);
    } catch (err) {
      console.error("Delete failed:", err);
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <FaEnvelope style={styles.titleIcon} /> Contact Messages
        </h1>
        <button 
          style={styles.refreshButton}
          onClick={fetchMessages}
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div style={styles.error}>
          <FaInfoCircle style={styles.errorIcon} /> {error}
        </div>
      )}

      {loading ? (
        <div style={styles.loading}>Loading messages...</div>
      ) : messages.length === 0 ? (
        <div style={styles.empty}>
          <FiMail style={styles.emptyIcon} />
          <p>No messages received yet.</p>
        </div>
      ) : (
        <div style={styles.content}>
          <div style={styles.messageList}>
            {messages.map((msg) => (
              <div 
                key={msg._id} 
                style={{
                  ...styles.messageCard,
                  ...(selectedMessage?._id === msg._id && styles.selectedMessage)
                }}
                onClick={() => setSelectedMessage(msg)}
              >
                <div style={styles.messageHeader}>
                  <div style={styles.messageMeta}>
                    <FaUser style={styles.messageIcon} />
                    <span style={styles.messageName}>{msg.name}</span>
                    <span style={styles.messageSubject}>{msg.subject}</span>
                  </div>
                  <div style={styles.messageDate}>
                    <FaCalendarAlt style={styles.dateIcon} />
                    {formatDate(msg.createdAt)}
                  </div>
                </div>
                <p style={styles.messagePreview}>
                  {msg.message.substring(0, 60)}...
                </p>
                <button
                  style={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(msg._id);
                  }}
                  title="Delete message"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {selectedMessage && (
            <div style={styles.messageDetail}>
              <div style={styles.detailHeader}>
                <h3 style={styles.detailSubject}>
                  <FiMessageSquare style={styles.detailIcon} />
                  {selectedMessage.subject}
                </h3>
                <button
                  style={styles.closeDetail}
                  onClick={() => setSelectedMessage(null)}
                >
                  ×
                </button>
              </div>
              <div style={styles.detailMeta}>
                <p style={styles.detailEmail}>
                  <FiMail style={styles.detailMetaIcon} />
                  {selectedMessage.email}
                </p>
                <p style={styles.detailDate}>
                  <FaCalendarAlt style={styles.detailMetaIcon} />
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>
              <div style={styles.detailContent}>
                <p style={styles.detailMessage}>{selectedMessage.message}</p>
              </div>
              <div style={styles.detailFooter}>
                <button
                  style={styles.deleteDetailButton}
                  onClick={() => handleDelete(selectedMessage._id)}
                >
                  <FaTrash /> Delete Message
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    padding: '1.5rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  titleIcon: {
    color: '#3b82f6',
  },
  refreshButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    borderRadius: '0.375rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#2563eb',
    },
    ':disabled': {
      backgroundColor: '#94a3b8',
      cursor: 'not-allowed',
    },
  },
  error: {
    padding: '1rem',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    borderRadius: '0.375rem',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  errorIcon: {
    fontSize: '1.25rem',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    color: '#64748b',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    color: '#64748b',
    textAlign: 'center',
  },
  emptyIcon: {
    fontSize: '3rem',
    color: '#cbd5e1',
    marginBottom: '1rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    '@media (min-width: 1024px)': {
      flexDirection: 'row',
    },
  },
  messageList: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media (min-width: 1024px)': {
      maxWidth: '400px',
    },
  },
  messageCard: {
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
    ':hover': {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)',
    },
  },
  selectedMessage: {
    borderLeft: '4px solid #3b82f6',
    backgroundColor: '#f8fafc',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.5rem',
  },
  messageMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  messageIcon: {
    color: '#64748b',
    fontSize: '0.875rem',
  },
  messageName: {
    fontWeight: '500',
    color: '#1e293b',
  },
  messageSubject: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  messageDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    fontSize: '0.75rem',
    color: '#64748b',
  },
  dateIcon: {
    fontSize: '0.75rem',
  },
  messagePreview: {
    margin: '0.5rem 0 0',
    color: '#64748b',
    fontSize: '0.875rem',
    lineHeight: '1.5',
  },
  deleteButton: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
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
  messageDetail: {
    flex: 2,
    backgroundColor: '#ffffff',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    '@media (min-width: 1024px)': {
      position: 'sticky',
      top: '1.5rem',
      maxHeight: 'calc(100vh - 3rem)',
      overflowY: 'auto',
    },
  },
  detailHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e2e8f0',
  },
  detailSubject: {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  detailIcon: {
    color: '#3b82f6',
  },
  closeDetail: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#64748b',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0 0.5rem',
    ':hover': {
      color: '#1e293b',
    },
  },
  detailMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  detailEmail: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    margin: 0,
  },
  detailDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    margin: 0,
  },
  detailMetaIcon: {
    fontSize: '0.875rem',
  },
  detailContent: {
    marginBottom: '1.5rem',
  },
  detailMessage: {
    color: '#334155',
    lineHeight: '1.75',
    whiteSpace: 'pre-wrap',
  },
  detailFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  deleteDetailButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: 'none',
    borderRadius: '0.375rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: '#fecaca',
    },
  },
  '@media (max-width: 768px)': {
    container: {
      padding: '1rem',
    },
    title: {
      fontSize: '1.5rem',
    },
    messageDetail: {
      padding: '1rem',
    },
  },
};

export default AdminContact;