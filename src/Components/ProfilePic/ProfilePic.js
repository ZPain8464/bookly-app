import React from "react";
import Context from "../../Context/Context";

export default class ProfilePic extends React.Component {
  static contextType = Context;
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
