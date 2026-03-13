import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Context/AuthContext";

const ProtectedRouteAdmin = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "24px"
      }}>
        Loading...
      </div>
    );
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.role !== "admin") return <Navigate to="/unauthorized" replace />;

  return children;
};
export default ProtectedRouteAdmin;