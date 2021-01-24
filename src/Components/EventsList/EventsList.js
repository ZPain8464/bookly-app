import React from "react";
import { Link } from "react-router-dom";
import config from "../../Config/config";
import Context from "../../Context/context";

export default class EventsList extends React.Component {
  static contextType = Context;

  static defaultProps = {
    teams: [{ id: {} }],
    match: { params: {} },
  };

  // Gets event Id and passes into App.js state
  getEventIds = (eId) => {
    const eventId = eId;
    fetch(
      `${config.REACT_APP_API_BASE_URL}/team-members/team-members-events/get-users/${eventId}`
    )
      .then((res) => res.json())
      .then((tms) => {
        this.context.getTmsOnEvent(tms);
      });
  };

  render() {
    const teamId =
      this.context && this.context.teams.length ? this.context.teams[0].id : 0;
    const eventsList = this.context ? this.context.events : [];
    const myEvents = eventsList.filter((e) => e.team_id === teamId);

    return (
      <div className="mobile-hide">
        <aside className="event-sidebar">
          <h2>My Events</h2>
          <p>(events you created)</p>
          <div>
            <Link to="/add-event">
              <button>+ Event</button>
            </Link>
          </div>
          <ul>
            {myEvents.map((events, i) => (
              <li onClick={(e) => this.getEventIds(events.id)} key={i}>
                <div className="events-desktop">
                  <Link to={`/events/${events.id}`}>
                    <h3>{events.title}</h3>
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <Link to="/add-event">
              <button>+ Event</button>
            </Link>
          </div>
        </aside>
      </div>
    );
  }
}
