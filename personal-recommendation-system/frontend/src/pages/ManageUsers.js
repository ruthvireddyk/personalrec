// src/pages/ManageUsers.js
import React, { useEffect, useState } from "react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setMessage("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update role
  const updateRole = async (id, role) => {
    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      setMessage(`Role updated to "${role}" successfully!`);
      fetchUsers(); // Refresh table
    } catch (err) {
      console.error(err);
      setMessage("Error updating role.");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      setMessage("User deleted successfully!");
      fetchUsers(); // Refresh table
    } catch (err) {
      console.error(err);
      setMessage("Error deleting user.");
    }
  };

  return (
    <div style={{ padding: "40px", color: "#fff", background: "#1f1c2c", minHeight: "100vh" }}>
      <h1>👥 Manage Users</h1>
      {message && (
        <p style={{ background: "#2ecc71", padding: "10px", borderRadius: "6px" }}>{message}</p>
      )}
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#333" }}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id || u.email} style={{ background: "#2c2c54", textAlign: "center" }}>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>{u.role}</td>
                <td style={styles.td}>
                  <button
                    style={styles.btn}
                    onClick={() =>
                      updateRole(u._id, u.role === "user" ? "admin" : "user")
                    }
                  >
                    Toggle Role
                  </button>
                  <button
                    style={{ ...styles.btn, background: "red" }}
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  th: { padding: "10px", border: "1px solid #444" },
  td: { padding: "10px", border: "1px solid #444" },
  btn: {
    margin: "5px",
    padding: "5px 10px",
    border: "none",
    borderRadius: "6px",
    background: "#3498db",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default ManageUsers;
