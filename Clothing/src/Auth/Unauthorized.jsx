import React from "react";
import { useNavigate } from "react-router-dom";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>🚫 Access Denied</h2>
      <p>You don't have permission to view this page.</p>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Go Back
      </button>
    </div>
  );
}

export default Unauthorized;
