import React from "react";
import { Link } from "react-router-dom";
import Context from "../../Context/Context";

export default class TeamList extends React.Component {
  static contextType = Context;

  static defaultProps = {
    match: { params: {} },
  };

  render() {
    const teamMembers =
      this.context && this.context.teamMembers.teamMemberData
        ? this.context.teamMembers.teamMemberData
        : [];

    return (
      <aside className="team-sidebar">
        <ul>
          {teamMembers.map((team, i) => (
            <li key={i}>
              <div className="team-desktop">
                <Link to={`/teams/team-member/${team.id}`}>
                  <h3>{`${team.first_name} ${team.last_name}`}</h3>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/add-team-member">
          <button>+ Add Team Member</button>
        </Link>
      </aside>
    );
  }
}
