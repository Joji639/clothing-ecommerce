import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../Context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

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

  if (user && user.role === "admin") return <Navigate to="/admin" replace />;
  if (user && user.role === "user") return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;
