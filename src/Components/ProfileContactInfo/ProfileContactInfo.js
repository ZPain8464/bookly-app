import React from "react";
import { Link } from "react-router-dom";
import Context from "../../Context/context";

export default class ProfileContactInfo extends React.Component {
  static contextType = Context;

  render() {
    const firstName =
      this.context && this.context.user ? this.context.user.firstName : "";
    const lastName =
      this.context && this.context.user ? this.context.user.lastName : "";
    const email =
      this.context && this.context.user ? this.context.user.email : "";
    const phone =
      this.context && this.context.user ? this.context.user.phoneNumber : "";
    return (
      <div className="profile-details">
        <div className="contact-info">
          <h3>{`${firstName} ${lastName}`}</h3>
          <p>
            <b>Email:</b> {email}
          </p>
          <p>
            <b>Phone number:</b> {phone}
          </p>
        </div>
        <Link to="/edit-profile">
          <button className="edit-profile-button">
            Edit profile information
          </button>
        </Link>
      </div>
    );
  }
}
