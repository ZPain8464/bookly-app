import React from "react";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";

export default class TeamEventsList extends React.Component {
  static contextType = Context;
  render() {
    const teamId = this.context.teams[0].id;
    const eventsList = this.context.events;
    const teamEventsList = this.context.events.filter(
      (e) => e.team_id !== teamId
    );

    return (
      <aside
        className={
          this.props.match.url === "/add-event"
            ? "event-sidebar-hidden"
            : "event-sidebar"
        }
      >
        <h2>Team Events</h2>
        <p>(events where you're a team member)</p>
        <ul>
          {teamEventsList.map((events, i) => (
            <li key={i}>
              <div className="events-desktop">
                <Link to={`/tm-events/${events.id}`}>
                  <h3>{events.title}</h3>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}
