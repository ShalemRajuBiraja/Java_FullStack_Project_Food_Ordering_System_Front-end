import  { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleSwitchToSignup = () => {
  setShowLoginModal(false);
  setShowSignupModal(true);
};

 const handleSwitchToLogin = () => {
  setShowSignupModal(false);
  setShowLoginModal(true);
};

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    // Fires when localStorage changes in ANOTHER tab
    window.addEventListener("storage", syncAuthState);
    // Custom event we dispatch ourselves after login/logout in THIS tab
    window.addEventListener("authChange", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("authChange", syncAuthState);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    // Tell every listening component (including this one) that auth changed
    window.dispatchEvent(new Event("authChange"));

    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm custom-header">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          FoodApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#headerNavbar"
          aria-controls="headerNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="headerNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reviews">
                Reviews
              </Link>
            </li>

            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-lg-center">
            {!isLoggedIn ? (
              <>
                <li className="nav-item me-lg-2 mb-2 mb-lg-0">
                  <button
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => setShowSignupModal(true)}
                  >
                    Signup
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item me-lg-3 mb-2 mb-lg-0">
                  <Link to="/profile" className="nav-link p-0" title="My Profile">
                    <i className="bi bi-person-circle fs-4 text-dark"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger btn-sm w-100"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <SignupModal show={showSignupModal} onClose={() => setShowSignupModal(false)} />
        <LoginModal
            show={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onSwitchToSignup={handleSwitchToSignup}
        />

      <SignupModal
        show={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </nav>
  );
};

export default Header;
