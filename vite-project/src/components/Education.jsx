import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Education = () => {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await axios.get("https://my-portfolio-backends.onrender.com/api/AdminEducation");
        setEducations(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch education:", err);
      }
    };
    fetchEducation();
  }, []);

  return (
    <>
      <div className="Admin-Education-Foam" id="Education"></div>
      <div style={styles.wrapper}>
        <h2 style={styles.heading}>
          🎓 My <span style={styles.highlight}>Education</span>
        </h2>

        {educations.length === 0 ? (
          <p style={styles.loading}>No records found.</p>
        ) : (
          <div style={styles.timeline}>
            {educations.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                style={styles.timelineItem}
              >
                <div style={styles.timelineDot}></div>
                <div style={styles.card}>
                  <img src={edu.image} alt="edu" style={styles.image} />
                  <div>
                    <h3 style={styles.degree}>{edu.degree}</h3>
                    <p style={styles.institute}>{edu.institute}</p>
                    <p style={styles.board}><b>Board:</b> {edu.board}</p>
                    <p style={styles.year}>{edu.year}</p>
                    <p style={styles.grade}>{edu.grade}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div style={styles.timelineLine}></div>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  wrapper: {
  background: "linear-gradient(135deg, #0a192f 0%, #112240 50%, #1c3b5a 100%)",
  color: "#ffffff",
  padding: "80px 20px",
  fontFamily: "Segoe UI, sans-serif",
  minHeight: "100vh",
  position: "relative",
  zIndex: 1,
  overflow: "hidden",
},

heading: {
  fontSize: "42px",
  fontWeight: "800",
  marginBottom: "80px",
  borderBottom: "4px solid #00ffff",
  display: "inline-block",
  paddingBottom: "12px",
  color: "#fff",
  marginLeft: "80px", // ✅ added
},

  highlight: {
    color: "#00ffff",
  },
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#aaa",
  },
  timeline: {
    position: "relative",
    maxWidth: "900px",
    margin: "0 auto",
    paddingLeft: "40px",
  },
  timelineLine: {
    position: "absolute",
    top: 0,
    left: "30px",
    width: "4px",
    height: "100%",
    background: "linear-gradient(to bottom, #00ffff, transparent)",
    zIndex: 0,
  },
  timelineItem: {
    position: "relative",
    marginBottom: "60px",
    zIndex: 1,
  },
  timelineDot: {
    position: "absolute",
    left: "-5px",
    top: "12px",
    width: "20px",
    height: "20px",
    backgroundColor: "#00ffff",
    borderRadius: "50%",
    boxShadow: "0 0 10px #00ffff, 0 0 30px #00ffff",
    zIndex: 2,
  },
  card: {
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(0,255,255,0.2)",
    borderRadius: "18px",
    padding: "25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 8px 28px rgba(0,255,255,0.12)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    transform: "perspective(800px) rotateX(0deg)",
    cursor: "pointer",
  },
  image: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    border: "3px solid #00ffff",
    objectFit: "cover",
    boxShadow: "0 0 15px rgba(0,255,255,0.4)",
  },
  degree: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#00ffff",
    marginBottom: "6px",
    textShadow: "0 0 5px #00ffff80",
  },
  institute: {
    fontSize: "15px",
    color: "#ccc",
    marginBottom: "2px",
  },
  board: {
    fontSize: "14px",
    color: "#aaf0ff",
    marginBottom: "2px",
  },
  year: {
    fontSize: "14px",
    color: "#aaa",
    marginBottom: "2px",
  },
  grade: {
    fontSize: "15px",
    color: "#fff",
    fontWeight: "bold",
    marginTop: "6px",
  },
};

export default Education;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// const Education = () => {
//   const [educations, setEducations] = useState([]);

//   useEffect(() => {
//     const fetchEducation = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/AdminEducation");
//         setEducations(res.data);
//       } catch (err) {
//         console.error("❌ Failed to fetch education:", err);
//       }
//     };
//     fetchEducation();
//   }, []);

//   return (
//     <>
//       <div className="Admin-Education-Foam" id="Education"></div>
//       <div style={styles.wrapper}>
//         <h2 style={styles.heading}>
//           🎓 My <span style={styles.highlight}>Education</span>
//         </h2>

//         {educations.length === 0 ? (
//           <p style={styles.loading}>No records found.</p>
//         ) : (
//           <div style={styles.timeline}>
//             {educations.map((edu, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 style={styles.timelineItem}
//               >
//                 <div style={styles.timelineDot}></div>
//                 <div style={styles.card}>
//                   <img src={edu.image} alt="edu" style={styles.image} />
//                   <div>
//                     <h3 style={styles.degree}>{edu.degree}</h3>
//                     <p style={styles.institute}>{edu.institute}</p>
//                     <p style={styles.board}><b>Board:</b> {edu.board}</p>
//                     <p style={styles.year}>{edu.year}</p>
//                     <p style={styles.grade}>{edu.grade}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//             <div style={styles.timelineLine}></div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// const styles = {
//   wrapper: {
//   background: "linear-gradient(135deg, #0a192f 0%, #112240 50%, #1c3b5a 100%)",
//   color: "#ffffff",
//   padding: "80px 20px",
//   fontFamily: "Segoe UI, sans-serif",
//   minHeight: "100vh",
//   position: "relative",
//   zIndex: 1,
//   overflow: "hidden",
// },

// heading: {
//   fontSize: "42px",
//   fontWeight: "800",
//   marginBottom: "80px",
//   borderBottom: "4px solid #00ffff",
//   display: "inline-block",
//   paddingBottom: "12px",
//   color: "#fff",
//   marginLeft: "80px", // ✅ added
// },

//   highlight: {
//     color: "#00ffff",
//   },
//   loading: {
//     textAlign: "center",
//     fontSize: "18px",
//     color: "#aaa",
//   },
//   timeline: {
//     position: "relative",
//     maxWidth: "900px",
//     margin: "0 auto",
//     paddingLeft: "40px",
//   },
//   timelineLine: {
//     position: "absolute",
//     top: 0,
//     left: "30px",
//     width: "4px",
//     height: "100%",
//     background: "linear-gradient(to bottom, #00ffff, transparent)",
//     zIndex: 0,
//   },
//   timelineItem: {
//     position: "relative",
//     marginBottom: "60px",
//     zIndex: 1,
//   },
//   timelineDot: {
//     position: "absolute",
//     left: "-5px",
//     top: "12px",
//     width: "20px",
//     height: "20px",
//     backgroundColor: "#00ffff",
//     borderRadius: "50%",
//     boxShadow: "0 0 10px #00ffff, 0 0 30px #00ffff",
//     zIndex: 2,
//   },
//   card: {
//     background: "rgba(255, 255, 255, 0.06)",
//     backdropFilter: "blur(20px)",
//     border: "1px solid rgba(0,255,255,0.2)",
//     borderRadius: "18px",
//     padding: "25px",
//     display: "flex",
//     alignItems: "center",
//     gap: "20px",
//     boxShadow: "0 8px 28px rgba(0,255,255,0.12)",
//     transition: "transform 0.3s ease, box-shadow 0.3s ease",
//     transform: "perspective(800px) rotateX(0deg)",
//     cursor: "pointer",
//   },
//   image: {
//     width: "90px",
//     height: "90px",
//     borderRadius: "50%",
//     border: "3px solid #00ffff",
//     objectFit: "cover",
//     boxShadow: "0 0 15px rgba(0,255,255,0.4)",
//   },
//   degree: {
//     fontSize: "20px",
//     fontWeight: "bold",
//     color: "#00ffff",
//     marginBottom: "6px",
//     textShadow: "0 0 5px #00ffff80",
//   },
//   institute: {
//     fontSize: "15px",
//     color: "#ccc",
//     marginBottom: "2px",
//   },
//   board: {
//     fontSize: "14px",
//     color: "#aaf0ff",
//     marginBottom: "2px",
//   },
//   year: {
//     fontSize: "14px",
//     color: "#aaa",
//     marginBottom: "2px",
//   },
//   grade: {
//     fontSize: "15px",
//     color: "#fff",
//     fontWeight: "bold",
//     marginTop: "6px",
//   },
// };

// export default Education;