import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HRDashboard from "../components/HRDashboard";
import VendorDashboard from "../components/VendorDashboard";

function DashboardPage() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Simulating role extraction from token for demo
    const extractedRole = localStorage.getItem("role"); 
    setRole(extractedRole);
  }, [navigate]);

  if (!role) {
    return <div className="text-center text-blue-800">Loading...</div>;
  }

  return (
    <div>
      {role === "HR" && <HRDashboard />}
      {role === "VENDOR" && <VendorDashboard />}
    </div>
  );
}

export default DashboardPage;
