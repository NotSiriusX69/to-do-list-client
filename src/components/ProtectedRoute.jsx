import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, is_logged }) => {
  const userIsLoggedIn = is_logged;

  return userIsLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
