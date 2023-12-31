import React from"react";
import PropTypes from "prop-types";

const Login = (props) => (
  <nav className="login">
    <h2> Login here</h2>
    <p>Sign in to manage your store's inventory</p>
    <button className="github"
	    onClick={() => props.authenticate("Github")}>
      Login with github
    </button>
    <button className="google"
	    onClick={() => props.authenticate("Google")}>
      Login with Google
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
}

export default Login;
