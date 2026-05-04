import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Discover from "./pages/Discover/Discover";
import GetStarted from "./component/Get_started/GetStarted";
import WhatsNew from "./pages/whats__new/WhatsNew";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import TermsOfService from "./component/terms/TermsOfService";
import ScrollToTop from "./component/ScrollToTop/ScrollToTop";
import PrivacyPolicy from "./component/privacy/PrivacyPolicy";
import Home from "./pages/Home";
// import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";

// ⚠️ DEV STUB — Import CoursePage when it exists:
// import CoursePage from "./pages/Course/CoursePage";

function AppContent() {
  const location = useLocation();

  // Routes where the global Navbar should be hidden.
  const hideNavbar = [
    "/discover",
    "/getStarted",
    "/terms",
    "/privacy",
    "/dashboard",
    "/signup",
    "/login",
  ].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ── Public routes ─────────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/whats-new" element={<WhatsNew />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* ── Protected routes ──────────────────────────────── */}
        {/* Any route here requires authentication. Unauthenticated visitors
            are redirected to /login, and the destination is saved so they
            land here automatically after signing in.                      */}

        {/* ⚠️ DEV STUB — Uncomment when CoursePage component is ready:
        <Route
          path="/course/:id"
          element={
            <ProtectedRoute>
              <CoursePage />
            </ProtectedRoute>
          }
        />
        */}

        {/* <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } /> */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
