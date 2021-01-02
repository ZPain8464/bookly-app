import React from "react";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";

export default class AddEvent extends React.Component {
  handleAddEvent = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const time_start = e.target.time_start.value;
    const time_end = e.target.time_end.value;
    const location = e.target.location.value;
    const description = e.target.description.value;
    const date = e.target.date.value;
    const team_id = this.props.teams[0].id;

    fetch(`${config.REACT_APP_API_BASE_URL}/events`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title: title,
        time_start: time_start,
        time_end: time_end,
        location: location,
        description: description,
        date: date,
        team_id: team_id,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((event) => {
        this.props.createEvent(event);
        this.props.history.push("/events");
      });
  };

  handleCancel = () => {
    this.props.history.goBack("/events");
  };

  render() {
    return (
      <>
        <div className="add-event-view">
          <h2>Add a New Event</h2>
          <form
            onSubmit={(e) => this.handleAddEvent(e)}
            className="add-event-form"
          >
            <label>Name your event:</label>
            <input type="text" name="title" />
            <label>Your event starts at:</label>
            <input type="time" name="time_start" />
            <label>Your event ends at:</label>
            <input type="time" name="time_end" />
            <label>Pick a date:</label>
            <input type="date" name="date" />
            <label>Add an address:</label>
            <input type="text" name="location" />
            <label>Add a description:</label>
            <input type="text" name="description" />
            <button type="submit">Add Event</button>
          </form>
          <div>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        </div>
      </>
    );
  }
}
