import React from "react";
import Context from "../../Context/context";

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
          <div className="event-container">
            {team.map((t, i) =>
              t.id === Number(this.props.match.params.id) ? (
                <div className="tm-section" key={i}>
                  <div className="tm-details">
                    <img
                      className="member-photo"
                      alt=""
                      src={t.profile_image}
                    />
                  </div>
                  <div className="tm-details">
                    <div className="tm-info">
                      <h3 key={i}>{`${t.first_name} ${t.last_name}`}</h3>
                      <p>
                        <b>Email:</b> {t.email}
                      </p>
                      <p>
                        <b>Phone Number:</b> {t.phone_number}
                      </p>
                    </div>
                  </div>
                </div>
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
