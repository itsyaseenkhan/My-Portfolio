// import React, { useEffect, useState, useRef } from 'react';
// import Typed from 'typed.js';
// import '../Pages/Hero.css'; // Spinner CSS bhi yahin mein add karna hoga
// import Navbar from '../components/Navbar';
// import About from '../components/About';
// import Skill from '../components/Skill';
// import Project from '../components/Project';
// import Education from '../components/Education';
// import Contact from './Contact';

// const Home = () => {
//   const [data, setData] = useState(null);
//   const typedRef = useRef(null);

//   // Fetch home data
//   useEffect(() => {
//     fetch("https://my-portfolio-backends.onrender.com/api/adminhome")
//       .then(res => res.json())
//       .then(data => setData(data))
//       .catch(err => console.error("Fetch error:", err));
//   }, []);

//   // Initialize typed.js
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

//   // Spinner while loading
//   if (!data) {
//     return (
//       <div className="spinner-container">
//         <div className="loader"></div>
//       </div>
//     );
//   }

//   const { name, bio, imageUrl, cvLink } = data;

//   return (
//     <>
//       <div className="admin-Home-form" id="Home"></div>

//       <div className="hero-container">
//         <Navbar />

//         <div className="hero-text">
//           <h1>
//             Hello, I am <br /> <span>{name}</span>
//           </h1>
//           <h2>
//             I am a <span ref={typedRef} className="typed-span" />
//           </h2>
//           <p>{bio}</p>

//           {cvLink && (
//             <a href={cvLink} target="_blank" rel="noreferrer">
//               <button className="download-btn">Download CV</button>
//             </a>
//           )}
//         </div>

//         <div className="hero-image">
//           <div className="image-border">
//             <img
//               src={
//                 imageUrl?.startsWith("http")
//                   ? imageUrl
//                   : `https://my-portfolio-backends.onrender.com/${imageUrl}`
//               }
//               alt="Profile"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Other Sections */}
//       <About />
//       <Skill />
//       <Project />
//       <Education />
//       <Contact />
//     </>
//   );
// };

// export default Home;

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
//     fetch("http://localhost:5000/api/adminhome")
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
//             src={`http://localhost:5000/${imageUrl}`} 
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
import '../Pages/Hero.css';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Skill from '../components/Skill';
import Project from '../components/Project';
import Education from '../components/Education';
import Contact from './Contact';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const typedRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://my-portfolio-backends.onrender.com/api/adminhome");
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!data?.roles) return;

    const typed = new Typed(typedRef.current, {
      strings: data.roles,
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy();
  }, [data]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!data) {
    return <div>Error loading data. Please try again later.</div>;
  }

  return (
    <>
      <div className="hero-container">
        <Navbar />
        <div className="hero-text">
          <h1>Hello, I am <br /> <span>{data.name}</span></h1>
          <h2>I am a <span ref={typedRef} className="typed-span" /></h2>
          <p>{data.bio}</p>
          {data.cvLink && (
            <a href={data.cvLink} target="_blank" rel="noreferrer">
              <button className="download-btn">Download CV</button>
            </a>
          )}
        </div>
        <div className="hero-image">
          <div className="image-border">
            <img 
              src={data.imageUrl} 
              alt="Profile" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-profile.jpg';
              }}
            />
          </div>
        </div>
      </div>
      <About />
      <Skill />
      <Project />
      <Education />
      <Contact />
    </>
  );
};

export default Home;