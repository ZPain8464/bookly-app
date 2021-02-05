import React from "react";
import AuthAPIService from "../../Services/AuthAPIService";

export default class Register extends React.Component {
  state = {
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      password,
      email,
      confirmPassword,
    } = e.target;
    this.setState({ error: null });
    AuthAPIService.postUser({
      first_name: first_name.value,
      last_name: last_name.value,
      password: password.value,
      email: email.value,
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
    return (
      <div className="register-section">
        <h2>Register for an account</h2>
        <form onSubmit={(e) => this.handleSubmit(e)} className="register-form">
          {this.state.error && <p className="error">{this.state.error}</p>}
          <label htmlFor="profile_image">Photo URL</label>
          <input id="profile_image" type="url" name="profile_image" />
          <label htmlFor="first_name">First name (required)</label>
          <input id="first_name" type="text" name="first_name" required />
          <label htmlFor="last_name">Last name (required)</label>
          <input id="last_name" type="text" name="last_name" required />
          <label htmlFor="email">Email (required)</label>
          <input id="email" type="text" name="email" required />
          <label htmlFor="phone_number">Phone number</label>
          <input id="phone_number" type="tel" name="phone_number" />
          <label htmlFor="password">Password (required)</label>
          <input id="password" type="password" name="password" required />
          <label htmlFor="confirmPassword">Confirm password (required)</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
