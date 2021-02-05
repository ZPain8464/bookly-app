import React from "react";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";
import Context from "../../Context/context";
import ValidationError from "../Validation/ValidationError";

export default class AddEvent extends React.Component {
  static contextType = Context;

  static defaultProps = {
    match: {
      params: {
        id: "",
      },
    },
  };

  state = {
    title: {
      value: "",
      touched: false,
    },
  };

  setTitle = (title) => {
    this.setState({
      title: {
        value: title,
        touched: true,
      },
    });
  };

  validateTitle = () => {
    const eventTitle = this.state.title.value.trim();
    if (eventTitle.title === 0) {
      return "Give your event a title";
    } else if (eventTitle.length < 5) {
      return "Your title must be at least 5 characters long";
    } else if (eventTitle.length > 25) {
      return "Your title can't exceed 25 characters";
    }
  };

  handleAddEvent = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const time_start = e.target.time_start.value;
    const time_end = e.target.time_end.value;
    const location = e.target.location.value;
    const description = e.target.description.value;
    const date = e.target.date.value;
    const team_id = this.context.teams[0].id;

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
        this.context.createEvent(event);
        this.props.history.push("/events");
      });
  };

  handleCancel = () => {
    this.props.history.goBack("/events");
  };

  render() {
    const submissionError = this.validateTitle();

    return (
      <React.Fragment>
        <div className="add-event-view" id="add-event-view">
          <div className="add-event-section">
            <div className="add-event-container">
              <h2>Add a New Event</h2>
              <div className="add-event-form-section">
                <form
                  onSubmit={(e) => this.handleAddEvent(e)}
                  className="add-event-form"
                >
                  <label htmlFor="title">Name your event:</label>
                  <input
                    onChange={(e) => this.setTitle(e.target.value)}
                    type="text"
                    id="title"
                    name="title"
                  />
                  <label htmlFor="time_start">
                    Your event starts at: (required)
                  </label>
                  <input
                    id="time_start"
                    type="time"
                    name="time_start"
                    required
                  />
                  <label htmlFor="time_end">
                    Your event ends at: (required)
                  </label>
                  <input id="time_end" type="time" name="time_end" required />
                  <label htmlFor="date">Pick a date: (required)</label>
                  <input id="date" type="date" name="date" required />
                  <label htmlFor="location">Add an address: </label>
                  <input id="location" type="text" name="location" />
                  <label htmlFor="description">Add a description: </label>
                  <input id="description" type="textarea" name="description" />
                  {this.state.title.touched && (
                    <ValidationError message={submissionError} />
                  )}
                  <button disabled={this.validateTitle()} type="submit">
                    Add Event
                  </button>
                </form>
              </div>
              <div>
                <button className="cancel-button" onClick={this.handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
