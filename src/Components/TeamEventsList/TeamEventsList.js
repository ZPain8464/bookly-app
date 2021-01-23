import React from "react";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";

export default class TeamEventsList extends React.Component {
  static contextType = Context;
  static defaultProps = {
    teams: [{ id: "" }],
    match: { url: "" },
  };
  render() {
    const teamId =
      this.context && this.context.teams.length ? this.context.teams[0].id : 0;

    const teamEventsList =
      this.contex && this.context.events.length
        ? this.context.events.filter((e) => e.team_id !== teamId)
        : [];

    return (
      <aside
        className={
          this.props.match.url === "/add-event"
            ? "event-sidebar-hidden"
            : "event-sidebar"
        }
      >
        <h2>Team Events</h2>
        <p>(events you've joined as a team member)</p>
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
