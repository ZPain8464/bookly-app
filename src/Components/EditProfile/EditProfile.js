import React from "react";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";
import { Link } from "react-router-dom";
import Context from "../../Context/context";

export default class EditProfile extends React.Component {
  static contextType = Context;

  static defaultProps = {
    user: {
      user_id: 0,
    },
  };

  state = {
    first_name: "",
    last_name: "",
    phone_number: "",
    profile_image: "",
  };

  componentDidMount() {
    const userId =
      this.context && this.context.user ? this.context.user.user_id : "";
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
    const userId = this.context.user.user_id;
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
      this.context.updateProfile(updateProfile);
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
            <label htmlFor="profile_image">Add your photo URL</label>
            <input
              onChange={(e) => this.updateProfilePic(e)}
              type="url"
              name="profile_image"
              id="profile_image"
              value={profile_image}
            />
            <label htmlFor="first_name">First name:</label>
            <input
              onChange={(e) => this.updateFirstName(e)}
              type="text"
              name="first_name"
              value={first_name}
              id="first_name"
            />
            <label htmlFor="last_name">Last name:</label>
            <input
              onChange={(e) => this.updateLastName(e)}
              type="text"
              name="last_name"
              id="last_name"
              value={last_name}
            />
            <label htmlFor="phone_number">Phone number</label>
            <input
              onChange={(e) => this.updatePhoneNumber(e)}
              type="tel"
              name="phone_number"
              id="phone_number"
              value={phone_number}
            />
            <button type="submit">Update profile</button>
          </form>
          <Link to="/dashboard">
            <button className="cancel-button">Cancel</button>
          </Link>
        </div>
      </>
    );
  }
}
