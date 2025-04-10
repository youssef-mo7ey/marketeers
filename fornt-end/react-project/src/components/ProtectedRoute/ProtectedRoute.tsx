import { Navigate } from "react-router";

// ProtectedRoute component
const ProtectedRoute = ({ element,route }: any) => {
  const isAuthenticated = localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return element;
};

export default ProtectedRoute;
