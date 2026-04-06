import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import SignUp from "./pages/Signup/SignUp";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import Home from "./pages/Home";

function AppContent() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/discover" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/signup" element={<SignUp />} />
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
