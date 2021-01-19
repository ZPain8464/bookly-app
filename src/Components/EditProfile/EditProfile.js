import React from "react";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";
import { Link } from "react-router-dom";

export default class EditProfile extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    phone_number: "",
    profile_image: "",
  };

  componentDidMount() {
    const userId = this.props.user.user_id;
    fetch(`${config.REACT_APP_API_BASE_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        this.setState({
          first_name: user.first_name,
          last_name: user.last_name,
          phone_number: user.phone_number,
          profile_image: user.profile_image,
        });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const userId = this.props.user.user_id;
    const { first_name, last_name, phone_number, profile_image } = this.state;
    const updateProfile = {
      first_name,
      last_name,
      phone_number,
      profile_image,
    };
    fetch(`${config.REACT_APP_API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(updateProfile),
    }).then((updatedProfile) => {
      this.resetFields();
      this.props.updateProfile(updateProfile);
      this.props.history.push("/dashboard");
    });
  };

  resetFields = () => {
    this.setState({
      first_name: "",
      last_name: "",
      phone_number: "",
      profile_image: "",
    });
  };

  updateFirstName = (e) => {
    this.setState({
      first_name: e.target.value,
    });
  };

  updateLastName = (e) => {
    this.setState({
      last_name: e.target.value,
    });
  };

  updatePhoneNumber = (e) => {
    this.setState({
      phone_number: e.target.value,
    });
  };

  updateProfilePic = (e) => {
    this.setState({
      profile_image: e.target.value,
    });
  };

  render() {
    const { first_name, last_name, phone_number, profile_image } = this.state;

    return (
      <>
        <div className="edit-profile-view">
          <h2>Edit Your Profile</h2>
          <form
            onSubmit={(e) => this.handleSubmit(e)}
            className="edit-profile-form"
          >
            <label>Add your photo URL</label>
            <input
              onChange={(e) => this.updateProfilePic(e)}
              type="url"
              name="profile_image"
              value={profile_image}
            />
            <label>First name:</label>
            <input
              onChange={(e) => this.updateFirstName(e)}
              type="text"
              name="first_name"
              value={first_name}
            />
            <label>Last name:</label>
            <input
              onChange={(e) => this.updateLastName(e)}
              type="text"
              name="last_name"
              value={last_name}
            />
            <label>Phone number</label>
            <input
              onChange={(e) => this.updatePhoneNumber(e)}
              type="tel"
              name="phone_number"
              value={phone_number}
            />
            <button type="submit">Update profile</button>
          </form>
          <Link to="/dashboard">
            <button>Cancel</button>
          </Link>
        </div>
      </>
    );
  }
}
