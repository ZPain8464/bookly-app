import React from "react";
import { Link } from "react-router-dom";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";
import Context from "../../Context/context";
import { v4 as uuidv4 } from "uuid";

export default class Event extends React.Component {
  static contextType = Context;
  state = {
    error: null,
    teamMembers: [],
    tmUsers: [],
    teamMember: {
      email: "",
      inviteSent: false,
    },
  };
  componentDidMount() {
    fetch(`${config.REACT_APP_API_BASE_URL}/team-members`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => res.json())
      .then((team) => {
        this.setState({
          teamMembers: team.teamMembers,
          tmUsers: team.teamMemberData,
        });
      });
  }

  handleDelete = (eventId, cb) => {
    fetch(`${config.REACT_APP_API_BASE_URL}/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res;
      })
      .then(() => {
        cb(eventId);
        this.props.history.push("/events");
      })
      .catch((error) => {});
  };

  sendInvite = (tm) => {
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        name: tm.first_name,
        email: tm.email,
      },
    });
    const userId = tm.id;
    const teamId = this.context.teams[0].id;
    const inviteDate = new Date();
    const eventId = Number(this.props.match.params.id);

    fetch(`${config.REACT_APP_API_BASE_URL}/team-members`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        team_id: teamId,
        user_id: userId,
        invite_date: inviteDate,
        event_id: eventId,
      }),
    })
      .then((res) => res.json())
      .then((teamMember) => {
        const selEvent = this.context.events.filter((e) => e.id === eventId);
        const recipient = this.state.teamMember.email;
        const sender = this.context.user.email;
        const sender_name = this.context.user.firstName;
        const event = selEvent[0];
        // creates unique Event invite URL w/ separate URL param
        // param is saved in DB w/ invite_url and fetched on Login for re-routing back to invite landing page
        const parameter = uuidv4();
        const url = `${config.INVITE_URL}` + parameter;

        const email = {
          recipient,
          sender,
          event,
          sender_name,
          url,
          parameter,
        };
        fetch(`${config.REACT_APP_API_BASE_URL}/emails/event-invite`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${TokenService.getAuthToken()}`,
          },
          body: JSON.stringify(email),
        }).then((res) => {
          if (res.ok) {
            this.setState({
              teamMember: {
                ...this.state.teamMember,
                inviteSent: true,
              },
            });
          }
        });
      });
  };

  render() {
    const event =
      this.context && this.context.events.length ? this.context.events : [];
    const currentTeamMembers = this.state.tmUsers;

    return (
      <section className="event-view">
        <div className="event-view-selected">
          <div className="event-container">
            {event.map((e, i) =>
              e.id === Number(this.props.match.params.id) ? (
                <React.Fragment key={i}>
                  <div className="e-title">
                    <h2 key={i}>{e.title}</h2>
                  </div>
                  <div className="edda-containter">
                    <div className="edda-details">
                      <p>
                        <b>Date:</b> {new Date(e.date).toLocaleDateString()}{" "}
                      </p>
                      <p>
                        <b>Duration:</b> {e.time_start} - {e.time_end}
                      </p>

                      <p>
                        <b>Address:</b> {e.location}
                      </p>

                      <div className="e-details">
                        <p>
                          <b>Details:</b>
                        </p>
                        <p className="event-desc">{e.description}</p>
                      </div>
                      <div
                        className={
                          this.props.location.pathname === `/events/${e.id}`
                            ? "my-events"
                            : "tm-events"
                        }
                      >
                        <h3>Active team members:</h3>
                        <div className="event-team-list">
                          <div className="uninvited-team">
                            <ul>
                              {currentTeamMembers.map((tm, i) => (
                                <li key={i}>
                                  <span className="invite-member">
                                    <p>{`${tm.first_name} ${tm.last_name}`} </p>
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="event-buttons">
                          <Link to={`/edit-event/${e.id}`}>
                            <button className="edit-event-button">
                              Edit Event
                            </button>
                          </Link>

                          <div className="event-buttons">
                            <button
                              className="delete-event-button"
                              onClick={(e) =>
                                this.handleDelete(
                                  Number(this.props.match.params.id),
                                  this.context.deleteEvent
                                )
                              }
                            >
                              Delete Event
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </section>
    );
  }
}
