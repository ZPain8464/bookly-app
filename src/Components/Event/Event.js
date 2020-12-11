import React from "react";

import DummyStore from "../../DummyStore/DummyStore";

export default class Event extends React.Component {
  handleInvites = () => {
    alert(
      `Email invites were sent to ${DummyStore.team[0].first_name} and ${DummyStore.team[1].first_name}!`
    );
  };

  render() {
    const event = DummyStore.events;

    return (
      <section className="event-view">
        <div className="event-view-selected">
          {event.map((e, i) =>
            e.id === Number(this.props.match.params.id) ? (
              <React.Fragment key={i}>
                <h2 key={i}>{e.name}</h2>
                <h3>{e.location}</h3>
                <p>{e.description}</p>
                <div>
                  <button onClick={this.handleInvites}>
                    + Invite Team Members
                  </button>
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
