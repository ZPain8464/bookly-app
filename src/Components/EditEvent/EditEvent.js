import React from "react";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";
import Context from "../../Context/context";

export default class EditEvent extends React.Component {
  static contextType = Context;
  state = {
    id: "",
    title: "",
    time_start: "",
    time_end: "",
    location: "",
    description: "",
    date: "",
  };

  componentDidMount() {
    const eventId =
      this.props.match && this.props.match.params.id
        ? Number(this.props.match.params.id)
        : 0;
    fetch(`${config.REACT_APP_API_BASE_URL}/events/${eventId}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
        return res.json();
      })
      .then((e) => {
        this.setState({
          id: e.id,
          title: e.title,
          time_start: e.time_start,
          time_end: e.time_end,
          location: e.location,
          description: e.description,
          date: e.date,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  handleUpdate = (e) => {
    e.preventDefault();
    const {
      id,
      title,
      time_start,
      time_end,
      location,
      description,
      date,
    } = this.state;
    const updateEvent = {
      id,
      title,
      time_start,
      time_end,
      location,
      description,
      date,
    };
    fetch(`${config.REACT_APP_API_BASE_URL}/events/${this.state.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(updateEvent),
    }).then((updatedEvent) => {
      this.resetFields();
      this.context.updateEvent(updateEvent);
      this.props.history.push(`/events/${this.props.match.params.id}`);
    });
  };

  resetFields = () => {
    this.setState({
      id: "",
      title: "",
      time_start: "",
      time_end: "",
      location: "",
      description: "",
      date: "",
    });
  };

  updateTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  updateTimeStart = (e) => {
    this.setState({
      time_start: e.target.value,
    });
  };

  updateTimeEnd = (e) => {
    this.setState({
      time_end: e.target.value,
    });
  };

  updateDate = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  updateLocation = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  updateDate = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  updateDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleCancel = () => {
    this.props.history.goBack("/events");
  };

  render() {
    const {
      title,
      time_start,
      time_end,
      location,
      description,
      date,
    } = this.state;
    return (
      <>
        <div className="edit-event-view">
          <h2>Edit Your Event</h2>
          <form
            onSubmit={(e) => this.handleUpdate(e)}
            className="edit-event-form"
          >
            <label>Edit event name:</label>
            <input
              onChange={(e) => this.updateTitle(e)}
              type="text"
              name="title"
              value={title}
            />
            <label>Change start time:</label>
            <input
              onChange={(e) => this.updateTimeStart(e)}
              type="time"
              name="time_start"
              value={time_start}
            />
            <label>Change end time:</label>
            <input
              onChange={(e) => this.updateTimeEnd(e)}
              type="time"
              name="time_end"
              value={time_end}
            />
            <label>Change date:</label>
            <input
              onChange={(e) => this.updateDate(e)}
              type="date"
              name="date"
              value={date}
            />
            <label>Change address:</label>
            <input
              onChange={(e) => this.updateLocation(e)}
              type="text"
              name="location"
              value={location}
            />
            <label>Change description:</label>
            <input
              onChange={(e) => this.updateDescription(e)}
              type="text"
              name="description"
              value={description}
            />
            <button type="submit">Update Event</button>
          </form>
          <div>
            <button className="cancel-button" onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }
}
