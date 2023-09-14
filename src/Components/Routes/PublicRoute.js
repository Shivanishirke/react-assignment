import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicRoute = () => {
  const { isAuthorized } = useSelector((state) => state.login);
  
  return <div>{!isAuthorized ? <Outlet /> : <Navigate to="/myTask" />}</div>;
};

export default PublicRoute;
