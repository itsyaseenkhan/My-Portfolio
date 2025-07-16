// import React, { useEffect, useState, useRef } from 'react';
// import Typed from 'typed.js';
// import '../Pages/Hero.css'; 
// import Navbar from '../components/Navbar';
// import About from '../components/About';
// import Skill from '../components/Skill';
// import Project from '../components/Project';
// import Education from '../components/Education';
// import Contact from './Contact';

// const Home = () => {
//   const [data, setData] = useState(null);
//   const typedRef = useRef(null);

//   useEffect(() => {
//     fetch("https://my-portfolio-backends.onrender.com/api/adminhome")
//       .then(res => res.json())
//       .then(data => setData(data));
//   }, []);

//   useEffect(() => {
//     if (!data?.roles) return;
//     const typed = new Typed(typedRef.current, {
//       strings: data.roles,
//       typeSpeed: 50,
//       backSpeed: 30,
//       loop: true,
//     });

//     return () => typed.destroy();
//   }, [data]);

//   if (!data) return <div style={{textAlign: "center", marginTop: "100px"}}>Loading...</div>;

//   const { name, bio, imageUrl, cvLink } = data;

//   return (
//     <>
//     <div className="admin-Home-form" id="Home"></div>
//     <div className="hero-container">
//       <Navbar/>
   
//       <div className="hero-text">
//         <h1>Hello, I am <br /> <span>{name}</span></h1>
//         <h2>I am a <span ref={typedRef} className="typed-span" /></h2>
//         <p>{bio}</p>
//         {cvLink && (
//           <a href={cvLink} target="_blank" rel="noreferrer">
//             <button className="download-btn">Download CV</button>
//           </a>
//         )}
//       </div>
//       <div className="hero-image"> 
//         <div className="image-border">
//           <img 
//             src={`https://my-portfolio-backends.onrender.com/${imageUrl}`} 
//             alt="Profile" 
//           />
//         </div>
//       </div> 
//     </div>
//       <About/>
//       <Skill/>
//       <Project/>
//       <Education/>
//       <Contact/>
//      </>
//   );
// };

// export default Home;

import React, { useEffect, useState, useRef } from 'react';
import Typed from 'typed.js';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Skill from '../components/Skill';
import Project from '../components/Project';
import Education from '../components/Education';
import Contact from './Contact';

const Home = () => {
  const [data, setData] = useState(null);
  const typedRef = useRef(null);

  // Fetch home data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://my-portfolio-backends.onrender.com/api/adminhome");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching home data:", err);
      }
    };

    fetchData();
  }, []);

  // Initialize Typed.js after data is loaded
  useEffect(() => {
    if (!data?.roles || !typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: data.roles,
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy();
  }, [data]);

  if (!data) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", fontSize: "1.2rem" }}>
        Loading...
      </div>
    );
  }

  const { name, bio, imageUrl, cvLink } = data;

  return (
    <>
      <div id="Home" style={styles.section}></div>

      <div style={styles.heroContainer}>
        <Navbar />

        <div style={styles.heroText}>
          <h1 style={styles.h1}>
            Hello, I am <br /> <span style={styles.name}>{name}</span>
          </h1>
          <h2 style={styles.h2}>
            I am a <span ref={typedRef} style={styles.typedSpan} />
          </h2>
          <p style={styles.bio}>{bio}</p>

          {cvLink && (
            <a href={cvLink} target="_blank" rel="noreferrer">
              <button style={styles.downloadBtn}>Download CV</button>
            </a>
          )}
        </div>

        <div style={styles.heroImage}>
          <div style={styles.imageBorder}>
            <img
              src={
                imageUrl?.startsWith("http")
                  ? imageUrl
                  : `https://my-portfolio-backends.onrender.com/${imageUrl}`
              }
              alt="Profile"
              style={styles.image}
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <About />
      <Skill />
      <Project />
      <Education />
      <Contact />
    </>
  );
};

// Internal CSS
const styles = {
  section: {
    padding: "40px 0",
  },
  heroContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "80px 40px",
    background: "radial-gradient(circle at top left, #2a2a72, #009ffd)",
    color: "white",
  },
  heroText: {
    flex: "1",
    minWidth: "300px",
    paddingRight: "40px",
  },
  h1: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    lineHeight: "1.3",
  },
  name: {
    color: "#00ffd5",
  },
  h2: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  typedSpan: {
    color: "#ffeb3b",
    fontWeight: "600",
  },
  bio: {
    fontSize: "1rem",
    marginBottom: "1.5rem",
    lineHeight: "1.6",
  },
  downloadBtn: {
    backgroundColor: "#4f46e5",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  },
  heroImage: {
    flex: "1",
    minWidth: "250px",
    display: "flex",
    justifyContent: "center",
  },
  imageBorder: {
    padding: "10px",
    borderRadius: "50%",
    background: "white",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
  },
  image: {
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "5px solid #4f46e5",
  }
};

export default Home;

