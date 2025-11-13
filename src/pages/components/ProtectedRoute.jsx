import { Navigate } from "react-router-dom";
import { authHooks } from "../../api/hooks/auth.hooks";
import { ImSpinner9 } from "react-icons/im";

export default function ProtectedRoute({ element }) {
  const { isAuthenticated, isLoading } = authHooks();

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ImSpinner9 />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  // Check if user has required roles

  return element;
}
