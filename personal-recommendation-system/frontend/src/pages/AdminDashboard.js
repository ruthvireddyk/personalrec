// src/pages/AdminDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>
          Recommend<span style={{ color: "#f39c12" }}>Admin</span>
        </h2>
        <div style={styles.navLinks}>
          <button
            style={styles.navButton}
            onClick={() => navigate("/admin-dashboard")}
          >
            Dashboard
          </button>
          <button
            style={{ ...styles.navButton, background: "#e74c3c" }}
            onClick={() => {
              localStorage.clear();
              navigate("/"); // redirect to landing page
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={styles.main}>
        <h1 style={styles.heading}> Welcome, Admin</h1>
        <p style={{ marginBottom: "30px", color: "#ddd" }}>
          Manage your users and recommendations below:
        </p>

        <div style={styles.cardContainer}>
          <div
            onClick={() => navigate("/manage-users")}
            style={{ ...styles.card, borderTop: "4px solid #f39c12" }}
          >
            <h2>👥 Manage Users</h2>
            <p>View, edit, and control user roles.</p>
          </div>
          <div
            onClick={() => navigate("/manage-recommendations")}
            style={{ ...styles.card, borderTop: "4px solid #3498db" }}
          >
            <h2>⚙️ Manage Recommendations</h2>
            <p>Oversee and fine-tune recommendations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    height: "100vh",
    overflow: "hidden",
    background: "linear-gradient(135deg, #1f1c2c, #928dab)",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    zIndex: 0,
  },
  navbar: {
    position: "sticky",
    top: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "rgba(0, 0, 0, 0.85)",
    zIndex: 2,
    flexWrap: "wrap", // ✅ ensures wrapping
    gap: "10px", // ✅ spacing when wrapped
  },
  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
  },
  navLinks: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "flex-end",
  },
  navButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    background: "#2ecc71",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap", // ✅ prevents text break
  },
  main: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    padding: "80px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "38px",
    marginBottom: "15px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "40px",
  },
  card: {
    flex: "1",
    minWidth: "250px",
    maxWidth: "350px",
    padding: "25px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.08)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "transform 0.3s ease, background 0.3s ease",
    textAlign: "center",
  },
};

export default AdminDashboard;
