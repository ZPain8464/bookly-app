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
    const teamMembersToInvite = this.state.tmUsers;
    const currentTms =
      this.context && this.context.tmsOnEvent.length
        ? this.context.tmsOnEvent
        : [];

    return (
      <section className="event-view">
        <div className="event-view-selected">
          {event.map((e, i) =>
            e.id === Number(this.props.match.params.id) ? (
              <React.Fragment key={i}>
                <h2 key={i}>{e.title}</h2>

                <p>
                  This event is scheduled for{" "}
                  {new Date(e.date).toLocaleDateString()} <br />
                  from {e.time_start} to {e.time_end}
                </p>
                <h3>Address / Location</h3>
                <p>{e.location}</p>
                <h3>Event details:</h3>
                <p className="event-desc">{e.description}</p>

                <div
                  className={
                    this.props.location.pathname === `/events/${e.id}`
                      ? "my-events"
                      : "tm-events"
                  }
                >
                  <h3>Invite team members to your event:</h3>
                  <div className="event-team-list">
                    <div className="uninvited-team">
                      <ul>
                        {teamMembersToInvite.map((tm, i) => (
                          <li key={i}>
                            {`${tm.first_name} ${tm.last_name}`}
                            <button onClick={(e) => this.sendInvite(tm)}>
                              + Invite
                            </button>
                          </li>
                        ))}
                      </ul>
                      {this.state.teamMember.inviteSent === true ? (
                        <p>
                          You invited {this.state.teamMember.name} to your
                          event!
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="current-team">
                      <h3>Team members on this event:</h3>
                      <ul>
                        {currentTms.map((tm, i) => (
                          <li key={i}>{`${tm.first_name} ${tm.last_name}`}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <Link to={`/edit-event/${e.id}`}>
                      <button>Edit Event</button>
                    </Link>
                  </div>
                  <div>
                    <button
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
              </React.Fragment>
            ) : (
              ""
            )
          )}
        </div>
      </section>
    );
  }
}
