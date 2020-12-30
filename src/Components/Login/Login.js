import React from "react";
import AuthAPIService from "../../Services/AuthAPIService";
import TokenService from "../../Services/TokenService";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  state = {
    error: null,
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    this.setState({
      error: null,
    });
    const user = { email: email.value, password: password.value };
    AuthAPIService.loginUser(user)
      .then((loginResponse) => {
        TokenService.saveAuthToken(loginResponse.authToken);
        this.props.history.push("/dashboard");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login to Your Account</h1>
        <div className="login-form">
          <form className="login-form" onSubmit={(e) => this.handleLogin(e)}>
            {this.state.error && <p className="error">{this.state.error}</p>}
            <div className="login-section">
              <label className="email-label">Email</label>
              <input
                type="text"
                name="email"
                defaultValue="demo_user1@demo.com"
              />

              <label className="password-label">Password</label>
              <input
                type="password"
                name="password"
                defaultValue="Password#3"
              />
            </div>
            <div>
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
        <div className="create-account">
          <Link to="/register">Create an Account</Link>
        </div>
      </React.Fragment>
    );
  }
}
