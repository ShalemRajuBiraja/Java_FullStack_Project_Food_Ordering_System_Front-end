import "./LoginModal.css";

// Props:
// show   -> boolean, controls whether modal is visible
// onClose -> function, called when modal should close (backdrop click, X button, cancel)
const LoginModal = ({ show, onClose, onSwitchToSignup  }) => {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Step 1 - read form values (email, password)
    // TODO: Step 2 - validate fields
    // TODO: Step 3 - call POST /api/auth/login
    // TODO: Step 4 - on success: store token/user in localStorage,
    //                dispatch "authChange" event, close modal
    // TODO: Step 5 - on failure: show error message
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop-custom" onClick={onClose}></div>

      {/* Modal */}
      <div className="login-modal-wrapper">
        <div className="login-modal-box shadow">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold mb-0">Login 🚀</h4>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          {/* TODO: server error message will go here */}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                name="email"
                placeholder="you@example.com"
              />
              {/* TODO: field error message will go here */}
            </div>

            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                name="password"
                placeholder="Enter your password"
              />
              {/* TODO: field error message will go here */}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>

          <p className="text-center text-secondary mt-3 mb-0 small">
                Don't have an account?{" "}
                <button
                    type="button"
                    className="btn btn-link p-0 align-baseline"
                    onClick={onSwitchToSignup}
                >
        Sign up
      </button>
    </p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
