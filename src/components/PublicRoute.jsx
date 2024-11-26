import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, is_logged }) => {
  const userIsLogged = is_logged;

  return userIsLogged ? <Navigate to="/" /> : children;
};

export default PublicRoute;
