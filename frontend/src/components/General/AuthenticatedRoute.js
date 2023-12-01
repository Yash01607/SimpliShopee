import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);

  const { userData } = userLogin;

  return userData ? children : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
