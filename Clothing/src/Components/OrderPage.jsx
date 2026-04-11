import React, { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../Context/AuthContext";
import Nav from "../Main/Nav";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  

  const fetchOrders = async () => {
    try {
      

      const res = await api.get("orderpage/my-orders/");


      setOrders(res.data);
    } catch (error) {
      console.error("FULL ERROR:", error.response || error);
    }
  };

  fetchOrders();
}, []);

  return (
    <>
      <Nav />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">My Orders</h2>

        {orders.length === 0 ? (
          <p>
            No orders yet.{" "}
            <Link to="/AllProducts" className="text-blue-600">
              Shop Now
            </Link>
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {orders.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-xl p-4 border"
              >
                
                {item.image && (
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://127.0.0.1:8000${item.image}`
                    }
                    alt={item.product_name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}

                
                <h3 className="font-semibold mt-3 text-lg">
                  {item.product_name}
                </h3>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p className="font-bold text-lg mt-1">
                  ₹{item.price}
                </p>

                
                <div className="mt-3">
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      item.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : item.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPage;