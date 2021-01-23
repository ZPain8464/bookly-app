import React from "react";
import Context from "../../Context/Context";

export default class TeamMember extends React.Component {
  static contextType = Context;
  render() {
    const team =
      this.context && this.context.teamMembers.teamMemberData
        ? this.context.teamMembers.teamMemberData
        : [];
    return (
      <section className="team-view">
        <div className="team-member-selected">
          {team.map((t, i) =>
            t.id === Number(this.props.match.params.id) ? (
              <React.Fragment key={i}>
                <img className="member-photo" alt="" src={t.profile_image} />
                <h2 key={i}>{`${t.first_name} ${t.last_name}`}</h2>
                <h3>Email: {t.email}</h3>
                <h3>Phone Number: {t.phone_number}</h3>
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
