import React, { useEffect, useState, useRef } from 'react';

const Skill = () => {
  const [skills, setSkills] = useState({ technical: [], professional: [] });
  const [loading, setLoading] = useState(true);
  const [visibleCircles, setVisibleCircles] = useState({});
  const [visibleBars, setVisibleBars] = useState({});
  const observerCircle = useRef(null);
  const observerBar = useRef(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/skillFoam');
        const data = await res.json();
        setSkills(data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching skills:", err);
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    observerCircle.current = new IntersectionObserver(
      (entries) => {
        const updates = {};
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            updates[index] = true;
          }
        });
        setVisibleCircles((prev) => ({ ...prev, ...updates }));
      },
      { threshold: 0.6 }
    );

    observerBar.current = new IntersectionObserver(
      (entries) => {
        const updates = {};
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            updates[index] = true;
          }
        });
        setVisibleBars((prev) => ({ ...prev, ...updates }));
      },
      { threshold: 0.6 }
    );
  }, []);

  if (loading) return <p style={styles.loading}>Loading skills...</p>;

  return (
    <div className="admin-Skills-form" id="Skills">
      <div style={styles.container}>
        <h2 style={styles.title}>
          My <span style={styles.highlight}>Skills</span>
        </h2>
        <div style={styles.sections}>
          {/* Technical Skills */}
          <div style={styles.column}>
            <h3 style={styles.subtitle}>Technical Skills</h3>
            {skills.technical.map((skill, index) => (
              <div
                key={index}
                data-index={index}
                ref={(el) => el && observerBar.current?.observe(el)}
                style={styles.skillBarContainer}
              >
                <div style={styles.skillLabel}>
                  <span>{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div style={styles.barBackground}>
                  <div
                    style={{
                      ...styles.barFill,
                      width: visibleBars[index] ? `${skill.percentage}%` : '0%',
                      transition: 'width 1s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Professional Skills */}
          <div style={styles.column}>
            <h3 style={styles.subtitle}>Professional Skills</h3>
            <div style={styles.circleGrid}>
              {skills.professional.map((skill, index) => {
                const radius = 35;
                const circumference = 2 * Math.PI * radius;
                const offset = visibleCircles[index]
                  ? circumference * (1 - skill.percentage / 100)
                  : circumference;

                return (
                  <div
                    key={index}
                    data-index={index}
                    ref={(el) => el && observerCircle.current?.observe(el)}
                    style={styles.circleWrapper}
                  >
                    <svg width="80" height="80">
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#222"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#06b6d4"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 40 40)"
                        style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
                      />
                      <text
                        x="40"
                        y="45"
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {skill.percentage}%
                      </text>
                    </svg>
                    <div style={{ marginTop: 5 }}>{skill.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#134f5c',
    color: '#ffffff',
    padding: '40px 20px',
    minHeight: '95vh',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    fontSize: '42px',
    fontWeight: 'bold',
    marginBottom: '40px',
    marginTop: '40px'
  },
  highlight: {
    color: '#06b6d4'
  },
  sections: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
    justifyContent: 'center'
  },
  column: {
    flex: '1 1 300px',
    margin: '0 50px'
  },
  subtitle: {
    fontSize: '26px',
    borderBottom: '2px solid #fff',
    marginBottom: '20px'
  },
  skillBarContainer: {
    marginBottom: '16px'
  },
  skillLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px'
  },
  barBackground: {
    backgroundColor: '#1e293b',
    borderRadius: '6px',
    overflow: 'hidden',
    height: '10px'
  },
  barFill: {
    height: '10px',
    backgroundColor: '#06b6d4'
  },
  circleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '10px'
  },
  circleWrapper: {
    textAlign: 'center'
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: '50px'
  }
};

export default Skill;
