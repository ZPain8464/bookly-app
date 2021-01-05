import React from "react";
import AuthAPIService from "../../Services/AuthAPIService";
import config from "../../Config/config";

export default class InviteLandingPage extends React.Component {
  state = {
    error: null,
    user: {
      firstName: "",
    },
  };

  componentDidMount() {
    const uniqueUrl = window.location.href;
    fetch(`${config.REACT_APP_API_BASE_URL}/emails?url=${uniqueUrl}`)
      .then((res) => res.json())
      .then((userData) => {
        const user = userData;

        fetch(
          `${config.REACT_APP_API_BASE_URL}/users/unregistered-user/sign-up?email=${user}`,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((unregisteredUser) => {
            this.setState({
              user: {
                ...this.state.user,
                id: unregisteredUser[0].id,
                firstName: unregisteredUser[0].first_name,
              },
            });
          });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.state.user.id;
    const { password, confirmPassword } = e.target;
    this.setState({ error: null });
    AuthAPIService.updateUserPassword({
      id: id,
      password: password.value,
      confirmPassword: confirmPassword.value,
    })
      .then((user) => {
        this.props.history.push("/login");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    // add new table to database for cold storage of uuid

    // if user has email address, show Log in. If not, just show register
    return (
      <div className="invite-page">
        <div>
          <h2>Welcome to Bookly!</h2>
        </div>
        <div className="invite-login-register">
          <h3>
            Hi, {this.state.user.firstName.trim()}! Set your password to join
            your team.
          </h3>
          <form
            onSubmit={(e) => this.handleSubmit(e)}
            className="unregistered-user-form"
          >
            {this.state.error && <p className="error">{this.state.error}</p>}
            <label>Password (required)</label>
            <input type="password" name="password" required />
            <label>Confirm Password (required)</label>
            <input type="password" name="confirmPassword" required />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
  }
}
