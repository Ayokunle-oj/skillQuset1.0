import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { saveRedirectPath } from "../../utils/redirectUtils";

// ============================================================
// ProtectedRoute — single source of truth for route protection.
//
// Wrap any route in App.tsx that requires authentication.
// If the user is unauthenticated, it saves the current path to
// sessionStorage and redirects to /login.
//
// Usage in App.tsx:
//   <Route path="/course/:id" element={
//     <ProtectedRoute><CoursePage /></ProtectedRoute>
//   } />
// ============================================================

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Wait until auth state is resolved before making a decision.
    if (isLoading) return;

    if (!isLoggedIn) {
      // Save where the user was trying to go.
      saveRedirectPath(location.pathname + location.search);
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate, location]);

  // While auth state is loading, render nothing (or a spinner if you prefer).
  if (isLoading) return null;

  // If not logged in, render nothing — the useEffect above handles the redirect.
  if (!isLoggedIn) return null;

  return <>{children}</>;
}
