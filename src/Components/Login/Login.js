import React from "react";
import AuthAPIService from "../../Services/AuthAPIService";
import TokenService from "../../Services/TokenService";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";

export default class Login extends React.Component {
  static contextType = Context;

  state = {
    error: null,
    referrerLink: "",
  };

  componentDidMount() {
    const referrerLink = this.props.location.state;
    this.setState({
      referrerLink: referrerLink,
    });
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    this.setState({
      error: null,
    });
    const user = { email: email.value, password: password.value };
    if (this.state.referrerLink === undefined) {
      AuthAPIService.loginUser(user)
        .then((loginResponse) => {
          TokenService.saveAuthToken(loginResponse.authToken);
          this.props.history.push("/dashboard");
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    } else {
      const url = this.state.referrerLink.referrer;
      const newUrlSlug = url.slice(34);
      AuthAPIService.loginUser(user)
        .then((loginResponse) => {
          TokenService.saveAuthToken(loginResponse.authToken);
          this.props.history.push(`/invite-page/${newUrlSlug}`);
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Login to Your Account</h1>
        {this.state.referrerLink !== undefined ? (
          <p>You must log in first to join your event</p>
        ) : (
          ""
        )}
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
