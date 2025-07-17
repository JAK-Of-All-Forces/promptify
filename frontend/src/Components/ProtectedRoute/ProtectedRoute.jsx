import { Navigate } from "react-router-dom";

function ProtectedRoute({ token, children }) {
  if (token === undefined) {
    // Still loading — render nothing or a spinner
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
