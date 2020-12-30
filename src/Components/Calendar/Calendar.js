import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default class CalendarView extends React.Component {
  render() {
    // https://dev.to/lberge17/fullcalendar-with-react-3hnl
    return (
      <FullCalendar
        events={[
          {
            title: this.props.events[0].title,
            date: this.props.events[0].date,
          },
          {
            title: this.props.events[1].title,
            date: this.props.events[1].date,
          },
        ]}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    );
  }
}
