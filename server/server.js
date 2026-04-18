import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage({ setRole }) {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  const handleViewer = () => {
    setRole("viewer");
    navigate("/dashboard");
  };

  const handleJudge = () => {
    navigate("/register");
  };

  return (
    <div style={styles.container}>
      {/* Animated background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />

      <div style={{
        ...styles.card,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.8s ease"
      }}>

        {/* Badge */}
        <div style={styles.badge}>🚀 LIVE NOW</div>

        {/* IU Logo */}
        <div style={styles.iuBadge}>IU</div>

        {/* Title */}
        <h1 style={styles.title}>Luddy Hackathon</h1>
        <p style={styles.subtitle}>Indiana University's Premier Innovation Challenge</p>
        <p style={styles.tagline}>
          Build. Compete. Innovate. — Track your team's journey to the top in real time.
        </p>

        {/* Divider */}
        <div style={styles.divider} />

        <p style={styles.roleText}>Select your role to continue</p>

        {/* Buttons */}
        <div style={styles.buttonRow}>
          <button
            style={styles.viewerBtn}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            onClick={handleViewer}
          >
            👁 Viewer
          </button>
          <button
            style={styles.judgeBtn}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            onClick={handleJudge}
          >
            ⚖️ Judge
          </button>
        </div>

        {/* Footer */}
        <p style={styles.footer}>Powered by Luddy School of Informatics</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #7a0000 0%, #990000 50%, #b30000 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Segoe UI', sans-serif",
  },
  blob1: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(120,0,0,0.5), transparent)",
    top: "-150px",
    left: "-150px",
    animation: "pulse 4s ease-in-out infinite",
  },
  blob2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(80,0,0,0.4), transparent)",
    bottom: "-100px",
    right: "-100px",
    animation: "pulse 5s ease-in-out infinite",
  },
  blob3: {
    position: "absolute",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(180,0,0,0.3), transparent)",
    top: "50%",
    right: "5%",
    animation: "pulse 6s ease-in-out infinite",
  },
  card: {
    background: "#F5F0E8",
    borderRadius: "24px",
    padding: "60px 50px",
    textAlign: "center",
    maxWidth: "500px",
    width: "90%",
    zIndex: 1,
    boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
  },
  badge: {
    display: "inline-block",
    background: "#990000",
    color: "#F5F0E8",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    padding: "6px 16px",
    borderRadius: "20px",
    marginBottom: "20px",
  },
  iuBadge: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7a0000, #990000)",
    color: "#F5F0E8",
    fontSize: "24px",
    fontWeight: "900",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    boxShadow: "0 8px 20px rgba(153,0,0,0.4)",
  },
  title: {
    fontSize: "42px",
    fontWeight: "900",
    color: "#990000",
    margin: "0 0 8px",
    letterSpacing: "-1px",
  },
  subtitle: {
    fontSize: "13px",
    color: "#7a0000",
    margin: "0 0 16px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  tagline: {
    fontSize: "16px",
    color: "#4a4a4a",
    margin: "0 0 24px",
    lineHeight: "1.6",
  },
  divider: {
    width: "60px",
    height: "3px",
    background: "linear-gradient(90deg, #990000, #cc0000)",
    borderRadius: "2px",
    margin: "0 auto 24px",
  },
  roleText: {
    fontSize: "13px",
    color: "#888",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  buttonRow: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    marginBottom: "30px",
  },
  viewerBtn: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "700",
    border: "2px solid #990000",
    borderRadius: "12px",
    background: "transparent",
    color: "#990000",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  judgeBtn: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "700",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #7a0000, #990000)",
    color: "#F5F0E8",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    boxShadow: "0 8px 20px rgba(153,0,0,0.4)",
  },
  footer: {
    fontSize: "12px",
    color: "#aaa",
    margin: 0,
  },
};

export default LandingPage;