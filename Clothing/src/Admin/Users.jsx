//

import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { Button, ButtonGroup } from "@mui/material";
const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchUsers, 1000); // 2s delay for demo
  }, []);

  // Delete User Function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/user/${id}`);
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  // Toggle User Status
  const toggleStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/user/${id}`, {
        status: newStatus,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  // Skeleton rows
  const renderSkeletonRows = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <tr key={index} className="bg-white hover:bg-gray-50">
        <td className="border px-4 py-2">
          <Skeleton variant="text" width={40} />
        </td>
        <td className="border px-4 py-2">
          <Skeleton variant="text" width={100} />
        </td>
        <td className="border px-4 py-2">
          <Skeleton variant="text" width={160} />
        </td>
        <td className="border px-4 py-2">
          <Skeleton variant="rectangular" width={140} height={30} />
        </td>
        <td className="border px-4 py-2 text-center">
          <Skeleton variant="rectangular" width={80} height={30} />
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Management</h1>

      <div className="overflow-x-auto shadow-lg rounded-xl">
        <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700 uppercase text-sm">
              <th className="border px-4 py-3">ID</th>
              <th className="border px-4 py-3">Name</th>
              <th className="border px-4 py-3">Email</th>
              <th className="border px-4 py-3 text-center">Status</th>
              <th className="border px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? renderSkeletonRows()
              : users.map((user, idx) => (
                  <tr key={user.id}>
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2 font-medium text-gray-700">
                      {user.name}
                    </td>
                    <td className="border px-4 py-2 text-gray-600">
                      {user.email}
                    </td>

                    <td className="border py-2 text-center ">
                      <Button
                        color={user.status === "user" ? "success" : "error"}
                        onClick={() =>
                          toggleStatus(
                            user.id,
                            user.status === "user" ? "suspend" : "user"
                          )
                        }
                        style={{
                          border: "1px solid black",
                          borderRadius: "5px",
                          padding: "2px 3py ",
                        }}
                      >
                        {user.status === "user" ? "User" : "Suspend"}
                      </Button>
                    </td>

                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className=" border-[1px] bg-white text-black   px-4 py-1 rounded text-sm hover:bg-red-400 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPage;
