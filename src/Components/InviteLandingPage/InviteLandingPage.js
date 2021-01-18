import React from "react";
import AuthAPIService from "../../Services/AuthAPIService";
import TokenService from "../../Services/TokenService";
import { Redirect } from "react-router-dom";
import config from "../../Config/config";

export default class InviteLandingPage extends React.Component {
  state = {
    error: null,
    eventId: null,
    event: "",
    user: {
      id: "",
      firstName: "",
    },
    isLoggedIn: false,
    eventJoined: false,
  };

  componentDidMount() {
    const uniqueUrl = window.location.href;

    fetch(`${config.REACT_APP_API_BASE_URL}/emails?url=${uniqueUrl}`)
      .then((res) => res.json())
      .then((userData) => {
        const userEmail = userData.recipient;
        const eventId = userData.event_id;
        this.setState({
          eventId: eventId,
        });
        fetch(
          `${config.REACT_APP_API_BASE_URL}/users/unregistered-user/sign-up?email=${userEmail}`,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((unregisteredUser) => {
            this.setState({
              user: {
                ...this.state.user,
                id: unregisteredUser[0].id,
                firstName: unregisteredUser[0].first_name,
              },
            });
            const eventId = this.state.eventId;

            fetch(`${config.REACT_APP_API_BASE_URL}/events/${eventId}`)
              .then((res) => res.json())
              .then((event) => {
                this.setState({
                  event: event,
                });
              });
          });
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.state.user.id;
    const { password, confirmPassword } = e.target;
    this.setState({ error: null });
    AuthAPIService.updateUserPassword({
      id: id,
      password: password.value,
      confirmPassword: confirmPassword.value,
    })
      .then(
        fetch(`${config.REACT_APP_API_BASE_URL}/team-members/${id}`)
          .then((res) => res.json())
          .then((data) => {
            const accepted = data[0].accepted;
            const team_id = data[0].team_id;
            const user_id = data[0].user_id;

            fetch(`${config.REACT_APP_API_BASE_URL}/team-members/${id}`, {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                accepted: !accepted,
                team_id: team_id,
                user_id: user_id,
              }),
            });
            this.props.history.push("/login");
          })
      )
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };
  // PATCH works in BE; now implement in FE
  handleJoinEvent = (e) => {
    e.preventDefault();
    fetch(`${config.REACT_APP_API_BASE_URL}/team-members/${this.state.user.id}`)
      .then((res) => res.json())
      .then((tm) => {
        // finds team_member invited to event
        const team_member = tm.filter((t) => t.event_id === this.state.eventId);
        const user_id = this.state.user.id;
        const accepted = team_member[0].accepted;
        console.log(accepted);
        fetch(
          `${config.REACT_APP_API_BASE_URL}/team-members/join-event/${user_id}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              event_id: this.state.event.id,
              user_id: this.state.user.id,
              accepted: !accepted,
            }),
          }
        ).then((res) => {
          if (res.ok) {
            this.setState({
              eventJoined: true,
            });
          }
        });
      });
  };

  returnToDash = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    // if user has email address, show Log in. If not, just show register
    return (
      <div className="invite-page">
        {this.state.eventId === null ? (
          <>
            <div>
              <h2>Welcome to Bookly!</h2>
            </div>
            <div className="invite-login-register">
              <h3>
                Hi, {this.state.user.firstName.trim()}! Set your password to
                join your team.
              </h3>
              <form
                onSubmit={(e) => this.handleSubmit(e)}
                className="unregistered-user-form"
              >
                {this.state.error && (
                  <p className="error">{this.state.error}</p>
                )}
                <label>Password (required)</label>
                <input type="password" name="password" required />
                <label>Confirm Password (required)</label>
                <input type="password" name="confirmPassword" required />
                <button type="submit">Register</button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div>
              {TokenService.hasAuthToken() ? (
                <>
                  <h2>Hi, {this.state.user.firstName}!</h2>
                  <form onSubmit={(e) => this.handleJoinEvent(e)}>
                    {!this.state.eventJoined ? (
                      <>
                        <p>Join event {this.state.event.title}?</p>
                        <button type="submit">Join event</button>
                        <button onClick={this.returnToDash}>
                          Decline event
                        </button>
                      </>
                    ) : (
                      <>
                        <p>You joined the event!</p>
                        <button onClick={this.returnToDash}>
                          Return to dashboard
                        </button>
                      </>
                    )}
                  </form>
                </>
              ) : (
                <>
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: { referrer: window.location.href },
                    }}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}
