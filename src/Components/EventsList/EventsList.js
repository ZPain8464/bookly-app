import React from "react";
import { Link } from "react-router-dom";
import DummyStore from "../../DummyStore/DummyStore";
import Modal from "../Modal/Modal";

export default class EventsList extends React.Component {
  state = {
    show: false,
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
    const eventsList = DummyStore.events;
    const event = this.props.match.params.id
      ? DummyStore.events.find(
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
        <ul>
          {eventsList.map((events, i) => (
            <li key={i}>
              <div className="events-desktop">
                <Link to={`/events/${events.id}`}>
                  <h3>{events.name}</h3>
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
