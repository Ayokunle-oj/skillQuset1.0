import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Navbar() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState<boolean>(false);
  const [button, setButton] = useState<boolean>(window.innerWidth > 960);
  const handleSign = () => navigate("./signup");
  const handleLogIn = () => navigate("./login");
  const closeMobileMenu = () => setMenu(false);
  const handleClick = () => setMenu((prev) => !prev);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  // Track viewport width for desktop buttons
  useEffect(() => {
    const handleResize = () => setButton(window.innerWidth > 960);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* 
        Overlay lives OUTSIDE <header> at the top level so it is
        position:fixed relative to the viewport — not the scroll container.
        This means it works correctly regardless of scroll position.
      */}
      {menu && (
        <div className="overlay" onClick={closeMobileMenu} aria-hidden="true" />
      )}

      <header className="header">
        <nav className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={closeMobileMenu}>
            SkillQuest
          </Link>

          {/* Hamburger / Close icon */}
          <div
            className="menu__icon"
            onClick={handleClick}
            role="button"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
          >
            <FontAwesomeIcon icon={menu ? faXmark : faBars} />
          </div>

          {/* Right side: nav links + buttons */}

          <ul className={menu ? "navbar__menu active" : "navbar__menu"}>
            <li className="navbar__item">
              <Link
                to="/discover"
                className="navbar__links"
                onClick={closeMobileMenu}
              >
                Discover
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                to="/about"
                className="navbar__links"
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                to="/whats-new"
                className="navbar__links"
                onClick={closeMobileMenu}
              >
                What's New
              </Link>
            </li>

            {/* Mobile-only CTA buttons inside the drawer */}
            <li className="navbar__item">
              <Link
                to="/signup"
                className="navbar__links__mobile"
                onClick={closeMobileMenu}
              >
                Sign up
              </Link>
            </li>
            <li className="navbar__item">
              <Link
                to="/login"
                className="navbar__links__mobile"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
            {/* Desktop buttons */}
            {button && (
              <button onClick={handleLogIn} className="btn__outline">
                Login
              </button>
            )}
            {button && (
              <button onClick={handleSign} className="btn__outline">
                Sign up
              </button>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
