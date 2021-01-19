import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default class CalendarView extends React.Component {
  render() {
    const allEvents = this.props.events;
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

// <FullCalendar
//   events={[
//     {
//       title: this.state.title,
//       date: this.state.date,
//     },
//     // {
//     //   title: this.props.events[1].title,
//     //   date: this.props.events[1].date,
//     // },
//   ]}
//   plugins={[dayGridPlugin]}
//   initialView="dayGridMonth"
// />
