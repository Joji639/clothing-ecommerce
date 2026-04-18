import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin-api/orders/");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin-api/orders/${id}/status/`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Orders Management</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-xl p-5 mb-6 border"
          >
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Order #{order.id}
                </h2>
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span className="font-medium">{order.status}</span>
                </p>
              </div>

              
              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order.id, e.target.value)
                }
                className="border px-3 py-1 rounded"
              >
              
                <option value="confirmed">confirmed</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
              </select>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {order.items.map((item) => (
                <div
                  key={item.product}
                  className="border rounded-lg p-3 flex gap-3 items-center hover:shadow-md transition"
                >
                  
                  <img
                    src={item.img}
                    alt={item.product_name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  
                  <div>
                    <p className="font-semibold">
                      {item.product_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}