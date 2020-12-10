import React from "react";
import DummyStore from "../../DummyStore/DummyStore";

export default class ProfileContactInfo extends React.Component {
  render() {
    const firstName = DummyStore.users[0].first_name;
    const lastName = DummyStore.users[0].last_name;
    const email = DummyStore.users[0].email;
    const phone = DummyStore.users[0].phone_number;
    return (
      <div className="profile-details">
        <h3>{`${firstName} ${lastName}`}</h3>
        <h3>Email: {email}</h3>
        <h3>Phone number: {phone}</h3>
      </div>
    );
  }
}
