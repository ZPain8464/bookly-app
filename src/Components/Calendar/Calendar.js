import React from "react";
import Context from "../../Context/context";
import { Link } from "react-router-dom";

export default class CalendarView extends React.Component {
  static contextType = Context;

  static defaultProps = {
    events: [{}],
  };
  render() {
    const allEvents =
      this.context && this.context.events.length ? this.context.events : [];

    return (
      <>
        <div className="cal-desktop">
          <div className="calendar-view">
            <h2>Events Calendar</h2>
            <div className="all-events">
              <div className="cal-date-time">
                <h3>Title</h3>
                <ul>
                  {allEvents.map((e, i) => (
                    <li key={i}>{`${e.title}`}</li>
                  ))}
                </ul>
              </div>
              <div className="cal-date-time">
                <h3>Date</h3>
                <ul>
                  {allEvents.map((e, i) => (
                    <li>{`${new Date(e.date).toLocaleDateString()}`}</li>
                  ))}
                </ul>
              </div>
              <div className="cal-date-time">
                <h3>Duration</h3>
                <ul>
                  {allEvents.map((e, i) => (
                    <li>{`${e.time_start} - ${e.time_end}`}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <Link to="/add-event">
                <button className="add-event-button">+ Event</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="cal-mobile">
          <div className="calendar-mobile-view">
            <h2>Events Calendar</h2>
            <ul>
              {allEvents.map((e, i) => (
                <li>
                  <h3>{e.title}</h3>
                  <div className="cal-mobile-details">
                    <p>
                      <b>Date:</b> {new Date(e.date).toLocaleDateString()}
                    </p>
                    <p>
                      <b>Duration:</b> {`${e.time_start} - ${e.time_end}`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <Link to="/add-event">
                <button className="add-event-button">+ Event</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
