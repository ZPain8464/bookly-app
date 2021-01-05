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
        <form onSubmit={(e) => this.handleSubmit(e)} className="register-form">
          {this.state.error && <p className="error">{this.state.error}</p>}
          <label>Type in your photo URL</label>
          <input type="url" name="profile_image" />
          <label>First Name (required)</label>
          <input type="text" name="first_name" required />
          <label>Last Name (required)</label>
          <input type="text" name="last_name" required />
          <label>Email (required)</label>
          <input type="text" name="email" required />
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" name="phone_number" />
          <label>Password (required)</label>
          <input type="password" name="password" required />
          <label>Confirm Password (required)</label>
          <input type="password" name="confirmPassword" required />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
