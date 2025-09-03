import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [email, setEmail] = useState("");
  const [Subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now();

    try {
      const res = await axios.post(
        "https://my-portfolio-q3dv.onrender.com/api/v1/message/send",
        { senderName, Subject, message, email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const elapsed = Date.now() - startTime;
      if (elapsed < 1000) {
        await new Promise((resolve) => setTimeout(resolve, 1000 - elapsed));
      }

      toast.success(res.data.message);
      setSenderName("");
      setSubject("");
      setMessage("");
      setEmail("");
    } catch (error) {
      const elapsed = Date.now() - startTime;
      if (elapsed < 1000) {
        await new Promise((resolve) => setTimeout(resolve, 1000 - elapsed));
      }

      toast.error(error.response?.data?.message || "No connection to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper" id="Contact">
      {/* Big Separate Header */}
      <h1 className="contact-main-title">Contact Us</h1>

      <div className="contact-card">
        {/* Left: Form */}
        <div className="contact-left">
          <h2>
            Get in <span>Touch</span>
          </h2>
          <form onSubmit={handleMessage} noValidate>
            <div className="input-group">
              <input
                type="text"
                placeholder="Your Name"
                value={senderName}
                required
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Subject"
                value={Subject}
                required
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <textarea
              placeholder="Message"
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
            />
            {!loading ? (
              <button type="submit" className="send-btn">
                Send Message
              </button>
            ) : (
              <button type="button" className="send-btn loading" disabled>
                <span className="spinner" />
                Sending...
              </button>
            )}
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="contact-right">
          <img
            src="https://res.cloudinary.com/dtddd5qh3/image/upload/v1755041449/PORTFOLIO%20PROJECT%20IMAGES/ddzulqkxughmr8wvojzw.png"
            alt="Contact"
          />
        </div>
      </div>

      <style>{`
        .contact-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: radial-gradient(circle at 100%, #333, #333 70%, #333 95%);
          padding: 40px 20px;
        }
        .contact-main-title {
          font-size: 3rem;
          font-weight: 900;
          margin-top: 35px; 
          color: white;
          text-align: center;
          margin-bottom: 40px;
          letter-spacing: 1px;
        }
         
        .contact-card {
          display: flex;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          max-width: 1000px;
          width: 100%;
        }
        .contact-left {
          flex: 1;
          padding: 40px;
        }
        .contact-left h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #0f172a;
        }
        .contact-left h2 span {
          color: #3b82f6;
        }
        .input-group {
          display: flex;
          align-items: center;
          background: #f1f5f9;
          border-radius: 50px;
          padding: 10px 15px;
          margin-bottom: 15px;
          transition: all 0.2s ease;
        }
        .input-group:hover {
          background: #e2e8f0;
          box-shadow: 0 0 0 2px #06b6d4;
        }
        .input-group input {
          border: none;
          outline: none;
          background: transparent;
          flex: 1;
          font-size: 1rem;
          color: #0f172a;
        }
        textarea {
          width: 100%;
          padding: 15px;
          border-radius: 15px;
          border: none;
          background: #f1f5f9;
          resize: none;
          margin-bottom: 15px;
          font-size: 1rem;
          color: #0f172a;
          transition: all 0.2s ease;
        }
        textarea:hover {
          background: #e2e8f0;
          box-shadow: 0 0 0 2px #06b6d4;
        }
        .send-btn {
          background: #06b6d4;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 50px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .send-btn:hover {
          background: #0891b2;
        }
        .send-btn.loading {
          background-color: #cbd5e1;
          color: #475569;
          cursor: not-allowed;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 3px solid #ccc;
          border-top: 3px solid #1e40af;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .contact-right {
          flex: 1;
          background: #e0f2fe;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .contact-right img {
          max-width: 90%;
          height: auto;
        }

        /* Tablet adjustments */
        @media (max-width: 1024px) {
          .contact-card {
            max-width: 90%;
          }
          .contact-left {
            padding: 30px;
          }
          .contact-main-title {
            font-size: 2.5rem;
          }
        }

        /* Mobile adjustments */
        @media (max-width: 768px) {
          .contact-card {
            flex-direction: column;
            max-width: 95%;
          }
          .contact-right {
            order: -1;
            padding: 15px;
          }
          .contact-left {
            padding: 20px;
          }
          .contact-left h2 {
            font-size: 1.6rem;
            text-align: center;
          }
          form {
            max-width: 100%;
          }
          .input-group {
            padding: 8px 12px;
          }
          textarea {
            font-size: 0.95rem;
          }
          .send-btn {
            width: 100%;
          }
        }

        /* Small phones */
        @media (max-width: 480px) {
          .contact-main-title {
            font-size: 2rem;
          }
          .contact-left h2 {
            font-size: 1.4rem;
          }
          .input-group input, textarea {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
