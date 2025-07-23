import { Navigate } from "react-router-dom";

function ProtectedRoute({ token, children }) {
  if (token === undefined) {
    return null;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
