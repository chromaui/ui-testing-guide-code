import PropTypes from "prop-types";
import "./Loginscreen.css";
const LoginForm = ({ onSubmit, ...props }) => (
  <form
    className="login-form-container"
    onSubmit={(event) => {
      event.preventDefault();
      const elementsArray = [...event.target.elements];
      const formData = elementsArray.reduce((acc, elem) => {
        if (elem.id) {
          acc[elem.id] = elem.value;
        }

        return acc;
      }, {});

      onSubmit(formData);
    }}
    {...props}
  >
    <div className="login-form-wrapper">
      <div role="group" className="login-form-group">
        <label htmlFor="email" id="email-label" className="login-form-label">
          Email address
        </label>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          className="login-form-input"
        />
      </div>
    </div>
    <div role="group" className="login-form-group">
      <label
        id="password-label"
        htmlFor="password"
        className="login-form-label"
      >
        Password
      </label>
      <input
        name="password"
        type="password"
        id="password"
        required
        aria-required="true"
        className="login-form-input"
      />
    </div>
    <button type="submit" className="submit-button">
      Sign in
    </button>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default function LoginScreen({ onLogIn }) {
  return (
    <div className="page lists-show">
      <div className="loginscreen">
        <div className="login-screen-container">
          <header className="loginscreen-header">
            <h1 className="loginscreen-heading">Taskbox</h1>
            <p className="loginscreen-text">Sign in to your account</p>
          </header>
          <LoginForm onSubmit={onLogIn} />
        </div>
      </div>
    </div>
  );
}

LoginScreen.propTypes = {
  onLogIn: PropTypes.func.isRequired,
};
