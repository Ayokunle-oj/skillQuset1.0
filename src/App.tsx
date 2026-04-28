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
import PrivacyPolicy from "./component/privacy/PrivacyPolicy";
import Home from "./pages/Home";

function AppContent() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/discover" &&
        location.pathname !== "/getStarted" &&
        location.pathname !== "/terms" &&
        location.pathname !== "/privacy" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route path="/terms" element={<TermsOfService />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/whats-new" element={<WhatsNew />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        {/* <ScrollToTop /> */}
        <AppContent />
      </Router>
    </>
  );
}

export default App;
