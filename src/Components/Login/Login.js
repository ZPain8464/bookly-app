import React from "react";
import AuthAPIService from "../../Services/AuthAPIService";
import TokenService from "../../Services/TokenService";
import { Link } from "react-router-dom";
import Context from "../../Context/context";
import config from "../../Config/config";

export default class Login extends React.Component {
  static contextType = Context;

  static defaultProps = {
    location: {
      state: "",
    },
  };

  state = {
    error: null,
    referrerLink: "",
    parameter: "",
  };

  componentDidMount() {
    const referrerLink = this.props.location.state;
    this.setState({
      referrerLink: referrerLink,
    });
    if (!this.state.referrerLink === undefined) {
      fetch(
        `${config.REACT_APP_API_BASE_URL}/emails/event-invite?url=${referrerLink.referrer}`
      )
        .then((res) => res.json())
        .then((data) => {
          const param = data.parameter;
          console.log(param);
          this.setState({
            parameter: param,
          });
        });
    }
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
          this.context.getData();
          this.props.history.push("/dashboard");
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    } else {
      const urlSlug = this.state.referrerLink.parameter;

      AuthAPIService.loginUser(user)
        .then((loginResponse) => {
          TokenService.saveAuthToken(loginResponse.authToken);
          this.props.history.push(`/invite-page/${urlSlug}`);
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
  };

  render() {
    return (
      <div className="login">
        <h1>Login to your account</h1>
        {this.state.referrerLink !== undefined ? (
          <p className="error">You must log in first to join your event</p>
        ) : (
          ""
        )}
        <div className="login-section">
          <form className="login-form" onSubmit={(e) => this.handleLogin(e)}>
            {this.state.error && <p className="error">{this.state.error}</p>}
            <div className="login-section">
              <label htmlFor="email" className="login-label">
                Email
              </label>
              <input type="text" name="email" id="email" />

              <label htmlFor="password" className="login-label">
                Password
              </label>
              <input type="password" id="password" name="password" />
            </div>
            <div>
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
        <div className="create-account">
          <Link to="/register">Create an Account</Link>
        </div>
      </div>
    );
  }
}
