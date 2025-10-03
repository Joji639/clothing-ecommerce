import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import DashboardBar from "./DashBoardBar";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(true); 
  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardBar  collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className={`flex-1 transition-all  duration-300 p-9 ${ collapsed ? "ml-0" : "ml-64" } mt-10`}>
        <Outlet />
      </main>
    </div>
  );
}

export default Admin