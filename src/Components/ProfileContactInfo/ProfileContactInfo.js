import React from "react";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";

export default class ProfileContactInfo extends React.Component {
  static contextType = Context;
  componentDidMount() {
    fetch(`${config.REACT_APP_API_BASE_URL}/users`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        this.context.setUser(user);
      });
    fetch(`${config.REACT_APP_API_BASE_URL}/events`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((events) => {
        const myEvents = events;

        fetch(`${config.REACT_APP_API_BASE_URL}/events/team-members/events`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${TokenService.getAuthToken()}`,
          },
        })
          .then((res) => res.json())
          .then((tmEvents) => {
            const teamEvents = tmEvents;
            const allEvents = myEvents.concat(teamEvents);
            this.context.setUserEvents(allEvents);
          });
      });
    fetch(`${config.REACT_APP_API_BASE_URL}/teams`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((teams) => {
        this.context.setUserTeams(teams);
      });
    fetch(`${config.REACT_APP_API_BASE_URL}/team-members`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((tmembers) => {
        this.context.setUserTeamMembers(tmembers);
      });
  }
  render() {
    const firstName = this.context.user.firstName;
    const lastName = this.context.user.lastName;
    const email = this.context.user.email;
    const phone = this.context.user.phoneNumber;
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
