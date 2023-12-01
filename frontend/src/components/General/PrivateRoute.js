import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const userLogin = useSelector((state) => state.userLogin);

  const { userData } = userLogin;

  return userData ? children : <Navigate to="/access/denied" />;
}

export default PrivateRoute;
