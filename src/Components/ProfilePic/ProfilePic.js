import React from "react";

export default class ProfilePic extends React.Component {
  render() {
    const imageSrc = this.props.user.profilePic;

    return (
      <div className="profile-pic">
        <span className="profile-image">
          <img src={imageSrc} alt="profile-picture" />
        </span>
      </div>
    );
  }
}
