import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashBoard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin-api/dashboard/");
      setStats(res.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const chartData = {
  labels: ["Users", "Products", "Orders"],
  datasets: [
    {
      label: "Analytics Overview",
      data: [stats.users, stats.products, stats.orders],

      
      backgroundColor: [
        "#3B82F6", 
        "#10B981", 
        "#8B5CF6", 
      ],

      borderRadius: 8,
    },
  ],
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500">
          Overview of your platform performance
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Total Users</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {stats.users}
          </h2>
        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Total Products</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {stats.products}
          </h2>
        </div>

        
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {stats.orders}
          </h2>
        </div>

      </div>

      
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Analytics Overview
        </h2>

        <div className="h-[350px]">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default DashBoard;