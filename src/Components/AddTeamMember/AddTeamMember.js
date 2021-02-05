import React from "react";
import { Link } from "react-router-dom";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";
import AuthAPIService from "../../Services/AuthAPIService";
import { v4 as uuidv4 } from "uuid";
import Context from "../../Context/context";

export default class AddTeamMember extends React.Component {
  static contextType = Context;

  static defaultProps = {
    user: {
      firstName: "",
      email: "",
    },
  };

  state = {
    // sender's name
    senderName: "",
    recipient: "",
    // sender email address
    sender: "",
    inviteStatusMessage: "",
    sent: false,
    // new team member's info
    teamMember: {
      firstName: "",
      lastName: "",
    },
  };

  componentDidMount() {
    this.setState({
      senderName:
        this.context && this.context.user ? this.context.user.firstName : "",
      sender: this.context && this.context.user ? this.context.user.email : "",
    });
  }

  handleAddTeamMember = (e) => {
    e.preventDefault();
    const url = `${config.INVITE_URL}` + uuidv4();
    const recipient = this.state.recipient;
    const sender = this.state.sender;
    const name = this.state.senderName;
    const email = { recipient, sender, name, url };
    const firstName = this.state.teamMember.firstName;
    const lastName = this.state.teamMember.lastName;

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
          inviteStatusMessage: `Your invite to ${recipient} was sent successfully!`,
          sent: true,
        });
        const tempPassword = "TempPass#3";

        AuthAPIService.postUser({
          first_name: firstName,
          last_name: lastName,
          password: tempPassword,
          confirmPassword: tempPassword,
          email: email.recipient,
        }).then((newUser) => {
          const userId = newUser.user.id;
          const teamId = this.context.teams[0].id;

          fetch(`${config.REACT_APP_API_BASE_URL}/team-members`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
              invite_date: new Date(),
              user_id: userId,
              team_id: teamId,
            }),
          });
        });
      } else {
        this.setState({
          inviteStatusMessage:
            "Please enter a valid email address (e.g. joe@example.com)",
        });
      }
    });
  };

  getFirstName = (e) => {
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        firstName: e.target.value,
      },
    });
  };

  getLastName = (e) => {
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        lastName: e.target.value,
      },
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
        {this.state.sent === false ? (
          <div className="add-team-member-view">
            <h2>Add a Team Member</h2>
            <p>Team members can only see events they've joined.</p>
            <p>
              Once your team member creates an account, you can <br /> send them
              an invitation to your event.
            </p>
            <form
              onSubmit={(e) => this.handleAddTeamMember(e)}
              className="add-team-member-form"
            >
              <label htmlFor="first_name">First name:</label>
              <input
                onChange={(e) => this.getFirstName(e)}
                type="text"
                name="first_name"
                id="first_name"
              />
              <label htmlFor="last_name">Last name:</label>
              <input
                onChange={(e) => this.getLastName(e)}
                type="text"
                name="last_name"
                id="last_name"
              />
              <label htmlFor="email">Email address:</label>
              {this.state.inviteStatusMessage && (
                <p className="error">{this.state.inviteStatusMessage}</p>
              )}
              <input
                onChange={(e) => this.getTeamMemberEmail(e)}
                type="text"
                name="email"
                id="email"
              />
              <button type="submit">Send email invitation</button>
            </form>
            <div>
              <button className="cancel-button" onClick={this.handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="add-team-member-view">
              <h2>Invitation sent!</h2>
              <p>{this.state.inviteStatusMessage}</p>
              <Link to="/dashboard">
                <button>Return to dashboard</button>
              </Link>
            </div>
          </>
        )}
      </>
    );
  }
}
