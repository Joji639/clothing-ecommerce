import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_USERS = "http://localhost:5000/user";
const API_PRODUCTS = "http://localhost:5000/Products";

export default function DashBoard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, productsRes] = await Promise.all([
        axios.get(API_USERS),
        axios.get(API_PRODUCTS),
      ]);

      setUsers(usersRes.data);
      setProducts(productsRes.data);

      const allOrders = usersRes.data.flatMap((u) => u.orders || []);
      setOrders(allOrders);

      const totalRev = allOrders
        .filter((o) => o.status?.toLowerCase() === "delivered")
        .reduce((sum, o) => sum + (o.price * (o.quantity || 1)), 0);
      setRevenue(totalRev);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  const activeUsers = users.filter((u) => u.status === "user").length;
  const suspendedUsers = users.filter((u) => u.status === "suspend").length;

  const lineData = orders.map((o) => ({
    date: o.date,
    profit: o.price * (o.quantity || 1),
  }));

  const categoryCounts = orders.reduce((acc, o) => {
    if (o.category) {
      acc[o.category] = (acc[o.category] || 0) + 1;
    }
    return acc;
  }, {});

  const pieData = Object.entries(categoryCounts).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800"> Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Products" value={products.length} color="bg-blue-500" />
        <StatCard title="Total Users" value={users.length} color="bg-green-500" />
        <StatCard title="Active Users" value={activeUsers} color="bg-indigo-500" />
        <StatCard title="Suspended Users" value={suspendedUsers} color="bg-red-500" />
        <StatCard title="Total Orders" value={orders.length} color="bg-purple-500" />
        <StatCard title="Revenue" value={`₹${revenue}`} color="bg-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Orders Profit Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="profit" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Orders by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
function StatCard({ title, value, color }) {
  return (
    <div className={`p-6 rounded-xl shadow-md text-white ${color}`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
