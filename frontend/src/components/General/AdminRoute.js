import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const userLogin = useSelector((state) => state.userLogin);

  const { userData } = userLogin;

  return userData && userData.isAdmin ? (
    children
  ) : (
    <Navigate to="/access/denied" />
  );
}

export default AdminRoute;
