import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/user";

export default function OrdersAdminPage() {
  const [users, setUsers] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const toggleExpand = (userId, orderIdx) => {
    const key = `${userId}-${orderIdx}`;
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateStatus = async (userId, orderIdx, newStatus) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const currentOrder = user.orders[orderIdx];

    // Prevent moving backwards
    const statusOrder = ["Pending", "Shipping", "Delivered"];
    const currentIndex = statusOrder.indexOf(currentOrder.status);
    const newIndex = statusOrder.indexOf(newStatus);

    if (newIndex <= currentIndex) {
      alert("⚠️ Cannot move order back to previous status!");
      return;
    }

    // Update order
    const updatedOrders = [...user.orders];
    updatedOrders[orderIdx] = { ...currentOrder, status: newStatus };

    const updatedUser = { ...user, orders: updatedOrders };

    try {
      await axios.put(`${API}/${userId}`, updatedUser);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updatedUser : u)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📦 Orders Admin</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Order Title</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) =>
              user.orders?.map((order, idx) => {
                const key = `${user.id}-${idx}`;
                return (
                  <React.Fragment key={key}>
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium">{user.name}</td>
                      <td className="px-4 py-3">{order.title}</td>
                      <td className="px-4 py-3">₹{order.price}</td>
                      <td className="px-4 py-3">{order.quantity}</td>
                      <td className="px-4 py-3">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(user.id, idx, e.target.value)
                          }
                          className={`border px-2 py-1 rounded focus:outline-none ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "Shipping"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                          disabled={order.status === "Delivered"}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipping">Shipping</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleExpand(user.id, idx)}
                          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
                        >
                          {expanded[key] ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>

                    {expanded[key] && (
                      <tr>
                        <td colSpan={6} className="px-4 py-3 bg-gray-50">
                          <div className="flex gap-6">
                            <img
                              src={order.img}
                              alt={order.title}
                              className="w-24 h-24 object-cover rounded-md border"
                            />
                            <div>
                              <p className="font-semibold">{order.title}</p>
                              <p className="text-gray-600 text-sm">
                                Category: {order.category}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Date: {order.date} | Time: {order.time}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Buyer: {order.buyer?.fullName} (
                                {order.buyer?.email})
                              </p>
                              <p className="text-gray-600 text-sm">
                                Address: {order.buyer?.address}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Payment: {order.buyer?.payment}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
