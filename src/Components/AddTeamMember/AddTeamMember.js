import React from "react";
import { Link } from "react-router-dom";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";

export default class AddTeamMember extends React.Component {
  state = {
    senderName: "",
    recipient: "",
    sender: "",
    inviteSentMessage: "",
    sent: false,
  };

  componentDidMount() {
    this.setState({
      senderName: this.props.user.firstName,
      sender: "z.painter45@gmail.com",
      // sender: this.props.user.email,
    });
  }

  handleAddTeamMember = (e) => {
    e.preventDefault();
    // const recipient = this.state.recipient;
    const recipient = "z.painter45@gmail.com";
    const sender = this.state.sender;
    const name = this.state.senderName;
    const email = { recipient, sender, name };

    fetch(`${config.REACT_APP_API_BASE_URL}/emails`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(email),
    }).then((res) => {
      if (res.ok) {
        this.setState({
          inviteSentMessage: `Your invite to ${recipient} was sent successfully!`,
          sent: true,
        });
      }
    });
  };

  getTeamMemberEmail = (e) => {
    const teamMemberEmail = e.target.value;
    this.setState({
      recipient: teamMemberEmail,
    });
  };

  handleCancel = () => {
    this.props.history.goBack("/teams");
  };

  render() {
    return (
      <>
        <div className="add-team-member-view">
          <h2>Add a Team Member</h2>
          <p>Team members can only see events they've joined.</p>
          <p>
            Once your team member creates an account, you can <br /> send them
            an invitation to your event.
          </p>
          {this.state.sent === true ? (
            <>
              <p>{this.state.inviteSentMessage}</p>
              <Link to="/dashboard">
                <button>Return to dashboard</button>
              </Link>
            </>
          ) : (
            ""
          )}
          <form
            onSubmit={(e) => this.handleAddTeamMember(e)}
            className="add-team-member-form"
          >
            <label>Email address</label>
            <input
              onChange={(e) => this.getTeamMemberEmail(e)}
              type="text"
              name="email"
            />
            <button type="submit">Send email invitation</button>
          </form>
          <div>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        </div>
      </>
    );
  }
}
