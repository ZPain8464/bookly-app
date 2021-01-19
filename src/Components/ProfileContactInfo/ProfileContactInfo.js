import React from "react";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";
import { Link } from "react-router-dom";

export default class ProfileContactInfo extends React.Component {
  componentDidMount() {
    fetch(`${config.REACT_APP_API_BASE_URL}/users`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        this.props.setUser(user);
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
            this.props.setUserEvents(allEvents);
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
        this.props.setUserTeams(teams);
      });
    fetch(`${config.REACT_APP_API_BASE_URL}/team-members`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((tmembers) => {
        this.props.setUserTeamMembers(tmembers);
      });
  }
  render() {
    const firstName = this.props.user.firstName;
    const lastName = this.props.user.lastName;
    const email = this.props.user.email;
    const phone = this.props.user.phoneNumber;
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
