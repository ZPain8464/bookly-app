import React from "react";
import Context from "../../Context/Context";

export default class CalendarView extends React.Component {
  static contextType = Context;
  render() {
    const allEvents = this.context.events;
    const getDates = allEvents.map((e) => new Date(e.date));
    console.log(allEvents);
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
