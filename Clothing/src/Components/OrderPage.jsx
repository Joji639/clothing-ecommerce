import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { AuthContext } from "../Context/AuthContext";
import Nav from "../Main/Nav";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      try {
        const res = await axios.get(`http://localhost:5000/user/${user.id}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <>
      <Nav />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">
            You don’t have any orders yet.{" "}
            <Link to="/AllProducts" className="text-amber-600 font-semibold hover:underline">
              Start shopping
            </Link>
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((item, index) => (
              <div
                key={index}
                className="border rounded-2xl shadow-md bg-white p-6 flex justify-center items-center gap-10 h-56"
              >
                <div className="mt-4 space-y-3">
                  
                    <div
                      key={index}
                      className="flex items-center gap-4 border-b pb-3 last:border-none"
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-2">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity || 1}
                        </p>
                        <p className="font-bold">₹{item.price}</p>
                      </div>
                    </div>
                  
                </div>


                
                <p className="text-sm text-gray-500">
                  Placed on {item.date} at {item.time}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                 {item.buyer?.fullName} ({item.buyer?.email})
                </p>

               

                <div className="mt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{item.price*item.quantity}</span>
                </div>
                <div className="flex justify-between items-center mb-4 ">
                  <span
                    className={`px-3 py-1 text-sm rounded-lg ${
                      item.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderPage;
