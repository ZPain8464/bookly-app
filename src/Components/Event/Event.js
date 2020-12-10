import React from "react";

import DummyStore from "../../DummyStore/DummyStore";

export default class Event extends React.Component {
  render() {
    const event = DummyStore.events;

    return (
      <section className="event-view">
        <div className="event-view-selected">
          {event.map((e, i) =>
            e.id === Number(this.props.match.params.id) ? (
              <>
                <h2 key={i}>{e.name}</h2>
                <h3>{e.location}</h3>
                <p>{e.description}</p>
                <div>
                  <button>+ Invite Team Members</button>
                </div>
                <div>
                  <button>+ Event</button>
                </div>
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
