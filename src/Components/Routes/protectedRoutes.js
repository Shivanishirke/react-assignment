import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { isAuthorized } = useSelector((state) => state.login);
  console.log("isAuthorized", isAuthorized);
  return <div>{isAuthorized ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default ProtectedRoute;
