import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(data);
    } catch (error) {
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Change role
  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      await API.put(`/admin/users/${id}/role`, { role: newRole });
      fetchUsers();
    } catch (error) {
      alert("Failed to update role");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  if (loading) return <p style={{color: 'white', padding: '20px'}}>Loading users...</p>;

  return (
    <div className="admin-users">
      <h2>Users Management</h2>

      {users.length === 0 ? (
        <p className="empty">No users found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {/* Applies .admin or .user class based on role */}
                  <span className={user.role === "admin" ? "admin" : "user"}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <button
                    className="role-btn"
                    onClick={() => toggleRole(user._id, user.role)}
                  >
                    Make {user.role === "admin" ? "User" : "Admin"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user._id)}
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
};

export default AdminUsers;