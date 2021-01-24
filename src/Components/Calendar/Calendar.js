import React from "react";
import Context from "../../Context/context";

export default class CalendarView extends React.Component {
  static contextType = Context;

  static defaultProps = {
    events: [{}],
  };
  render() {
    const allEvents =
      this.context && this.context.events.length ? this.context.events : [];

    return (
      <div>
        <h2>Events Calendar</h2>
        <ul>
          {allEvents.map((e, i) => (
            <li key={i}>{`${e.title} Date: ${new Date(
              e.date
            ).toLocaleDateString()}`}</li>
          ))}
        </ul>
      </div>
    );
  }
}
