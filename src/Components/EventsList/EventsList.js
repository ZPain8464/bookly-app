import React from "react";
import { Link } from "react-router-dom";
import config from "../../Config/config";
import Modal from "../Modal/Modal";
import Context from "../../Context/Context";

export default class EventsList extends React.Component {
  static contextType = Context;

  state = {
    show: false,
  };
  // Gets event Id and passes into App.js state
  getEventIds = (eId) => {
    const eventId = eId;
    fetch(
      `${config.REACT_APP_API_BASE_URL}/team-members/team-members-events/get-users/${eventId}`
    )
      .then((res) => res.json())
      .then((tms) => {
        this.context.getTmsOnEvent(tms);
      });
  };

  showModal = () => {
    this.setState({
      show: true,
    });
  };

  hideModal = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const teamId = this.context.teams[0].id;
    const eventsList = this.context.events;
    const myEvents = eventsList.filter((e) => e.team_id === teamId);
    const event = this.props.match.params.id
      ? this.context.events.find(
          (e) => e.id === Number(this.props.match.params.id)
        )
      : "";

    return (
      <aside
        className={
          this.props.match.url === "/add-event"
            ? "event-sidebar-hidden"
            : "event-sidebar"
        }
      >
        <h2>My Events</h2>
        <p>(events you created)</p>
        <ul>
          {myEvents.map((events, i) => (
            <li onClick={(e) => this.getEventIds(events.id)} key={i}>
              <div className="events-desktop">
                <Link to={`/events/${events.id}`}>
                  <h3>{events.title}</h3>
                </Link>
              </div>
              <div className="view-modal">
                <Modal
                  event={event}
                  {...this.props}
                  show={this.state.show}
                  handleClose={this.hideModal}
                />
                <button onClick={this.showModal} className="view-modal-button">
                  <Link to={`/events/${events.id}`}>
                    <h2>{events.name}</h2>
                  </Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <Link to="/add-event">
            <button>+ Event</button>
          </Link>
        </div>
      </aside>
    );
  }
}
