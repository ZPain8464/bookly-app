import React from "react";

export default class TeamMember extends React.Component {
  render() {
    const team = this.props.teamMembers.teamMemberData;
    return (
      <section className="team-view">
        <div className="team-member-selected">
          {team.map((t, i) =>
            t.id === Number(this.props.match.params.id) ? (
              <>
                <img className="member-photo" alt="" src={t.profile_image} />
                <h2 key={i}>{`${t.first_name} ${t.last_name}`}</h2>
                <h3>Email: {t.email}</h3>
                <h3>Phone Number: {t.phone_number}</h3>
              </>
            ) : (
              ""
            )
          )}
        </div>
      </section>
    );
  }
}
