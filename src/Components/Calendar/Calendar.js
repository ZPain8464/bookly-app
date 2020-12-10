import React from "react";
import DummyStore from "../../DummyStore/DummyStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default class CalendarView extends React.Component {
  state = {
    events: DummyStore.events,
  };

  render() {
    return (
      <FullCalendar
        events={[
          { title: this.state.events[0].name, date: this.state.events[0].date },
          { title: this.state.events[1].name, date: this.state.events[1].date },
          { title: this.state.events[2].name, date: this.state.events[2].date },
        ]}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
      />
    );
  }
}
