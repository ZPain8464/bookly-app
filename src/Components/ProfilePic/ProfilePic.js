import React from "react";
import Context from "../../Context/Context";

export default class ProfilePic extends React.Component {
  static contextType = Context;
  static defaultProps = {
    user: {
      profilePic: "",
    },
  };
  render() {
    const imageSrc = this.props.user.profilePic;
    const placeholder = "https://via.placeholder.com/350.jpg";
    return (
      <div className="profile-pic">
        <img
          className="profile-image"
          src={imageSrc === "" ? placeholder : imageSrc}
          alt="profile"
        />
      </div>
    );
  }
}
