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
        <h3>{`${firstName} ${lastName}`}</h3>
        <h3>Email: {email}</h3>
        <h3>Phone number: {phone}</h3>
        <Link to="/edit-profile">
          <button>Edit profile information</button>
        </Link>
      </div>
    );
  }
}
