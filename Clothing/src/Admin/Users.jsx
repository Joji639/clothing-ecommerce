import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Button } from "@mui/material";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin-api/users/");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const toggleStatus = async (id) => {
    try {
      await api.patch(`/admin-api/users/${id}/toggle-status/`);
      fetchUsers(); 
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  
  const filteredUsers = users.filter((u) => u.role !== "admin");
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");

  if (!confirmDelete) return;

  try {
    await api.delete(`/admin-api/users/${id}/delete/`);
    fetchUsers(); 
  } catch (error) {
    console.error("Delete error:", error);
  }
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      {loading ? (
        <p className="text-center text-lg">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow rounded">
            <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2 text-center">Status</th>
                <th className="border px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2 font-medium">
                      {user.username}
                    </td>
                    <td className="border px-4 py-2">{user.email}</td>

                    <td className="border px-4 py-2 text-center">
                      <Button
                        variant="outlined"
                        color={user.status === "user" ? "success" : "error"}
                        onClick={() => toggleStatus(user.id)}
                      >
                        {user.status === "user" ? "Active" : "Blocked"}
                      </Button>
                    </td>

                    <td className="border px-4 py-2 text-center">
                     <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                          Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserPage;