import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('https://my-portfolio-backends.onrender.com/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const handleMouseEnter = (e) => {
    const card = e.currentTarget;
    const overlay = card.querySelector('.overlay');
    const img = card.querySelector('img');
    card.classList.add('hovered');
    if (overlay) overlay.style.transform = 'translateY(0)';
    if (img) img.style.transform = 'scale(1.1)';
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const overlay = card.querySelector('.overlay');
    const img = card.querySelector('img');
    card.classList.remove('hovered');
    if (overlay) overlay.style.transform = 'translateY(100%)';
    if (img) img.style.transform = 'scale(1)';
  };

  const styles = {
    section: {
      background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #434343 100%)",
      color: '#fff',
      padding: '60px 20px',
      textAlign: 'center',
      minHeight: '100vh',
    },
    h2: {
      fontSize: '36px',
      marginBottom: '40px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginTop: '40px',
      fontWeight: 'bold',
      color: '#e1e2e8',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
    },
    card: {
      position: 'relative',
      width: '380px',
      height: '280px',
      overflow: 'hidden',
      borderRadius: '15px',
      transition: 'transform 0.4s ease',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.4s ease',
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      background: 'rgba(0,0,0,0.7)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      transform: 'translateY(100%)',
      transition: 'transform 0.4s ease',
      textAlign: 'center',
    },
    link: {
      marginTop: '10px',
      color: '#06b6d4',
      fontSize: '22px',
      textDecoration: 'none',
    },
  };

  return (
    <>
      <style>{`
        .project-card.hovered {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(254, 245, 245, 0.5);
        }

        @media (max-width: 768px) {
          .project-card {
            width: 90% !important;
            height: 250px !important;
          }
        }

        @media (max-width: 480px) {
          .project-card {
            width: 100% !important;
            height: 230px !important;
          }
          .overlay h3 {
            font-size: 18px !important;
          }
          .overlay p {
            font-size: 14px !important;
          }
        }
      `}</style>

      <div className="admin-Project-form" id="Project"></div>

      <div style={styles.section}>
        <h2 style={styles.h2}>Latest Projects</h2>
        <div style={styles.container}>
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-card"
              style={styles.card}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={`https://my-portfolio-backends.onrender.com${project.image}?v=${Date.now()}`}
                alt="project"
                onError={(e) => (e.target.src = "/default-fallback.png")}
                style={styles.image}
              />
              <div className="overlay" style={styles.overlay}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  🔗 Visit
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;

// import React, { useEffect, useState } from 'react';

// const Projects = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/projects')
//       .then(res => res.json())
//       .then(data => setProjects(data));
//   }, []);

//   const handleMouseEnter = (e) => {
//     const card = e.currentTarget;
//     const overlay = card.querySelector('.overlay');
//     const img = card.querySelector('img');
//     card.classList.add('hovered');
//     if (overlay) overlay.style.transform = 'translateY(0)';
//     if (img) img.style.transform = 'scale(1.1)';
//   };

//   const handleMouseLeave = (e) => {
//     const card = e.currentTarget;
//     const overlay = card.querySelector('.overlay');
//     const img = card.querySelector('img');
//     card.classList.remove('hovered');
//     if (overlay) overlay.style.transform = 'translateY(100%)';
//     if (img) img.style.transform = 'scale(1)';
//   };

//   const styles = {
//     section: {
//       background: '#000',
//       color: '#fff',
//       padding: '60px 20px',
//       textAlign: 'center',
//       minHeight: '100vh',
//     },
//     h2: {
//       fontSize: '36px',
//       marginBottom: '40px',
//       textTransform: 'uppercase',
//       letterSpacing: '2px',
//       marginTop:'40px',
//       fontWeight: 'bold',
//       color: '#e1e2e8',
//     },
//     container: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       gap: '20px',
//       justifyContent: 'center',
//     },
//     card: {
//       position: 'relative',
//       width: '380px',
//       height: '280px',
//       overflow: 'hidden',
//       borderRadius: '15px',
//       transition: 'transform 0.4s ease',
//     },
//     image: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       transition: 'transform 0.4s ease',
//     },
//     overlay: {
//       position: 'absolute',
//       bottom: 0,
//       left: 0,
//       right: 0,
//       top: 0,
//       background: 'rgba(0,0,0,0.7)',
//       color: '#fff',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: '20px',
//       transform: 'translateY(100%)',
//       transition: 'transform 0.4s ease',
//       textAlign: 'center',
//     },
//     link: {
//       marginTop: '10px',
//       color: '#06b6d4',
//       fontSize: '22px',
//       textDecoration: 'none',
//     },
//   };

//   return (
//     <>
//       <style>{`
//         .project-card.hovered {
//           transform: translateY(-10px);
//           box-shadow: 0 15px 30px rgba(254, 245, 245, 0.5);
//         }

//         @media (max-width: 768px) {
//           .project-card {
//             width: 90% !important;
//             height: 250px !important;
//           }
//         }

//         @media (max-width: 480px) {
//           .project-card {
//             width: 100% !important;
//             height: 230px !important;
//           }
//           .overlay h3 {
//             font-size: 18px !important;
//           }
//           .overlay p {
//             font-size: 14px !important;
//           }
//         }
//       `}</style>

//       <div className="admin-Project-form" id="Project"></div>

//       <div style={styles.section}>
//         <h2 style={styles.h2}>Latest Projects</h2>
//         <div style={styles.container}>
//           {projects.map((project, i) => (
//             <div
//               key={i}
//               className="project-card"
//               style={styles.card}
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//             >
//               <img
//                 src={`http://localhost:5000${project.image}`}
//                 alt="project"
//                 style={styles.image}
//               />
//               <div className="overlay" style={styles.overlay}>
//                 <h3>{project.title}</h3>
//                 <p>{project.description}</p>
//                 <a
//                   href={project.link}
//                   target="_blank"
//                   rel="noreferrer"
//                   style={styles.link}
//                 >
//                   🔗 Visit
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Projects;