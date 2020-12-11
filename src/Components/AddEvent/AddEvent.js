import React from "react";

export default class AddEvent extends React.Component {
  handleAddCal = () => {
    this.props.history.push("/events");
  };

  handleCancel = () => {
    this.props.history.goBack("/events");
  };

  render() {
    return (
      <>
        <div className="add-event-view">
          <h2>Add a New Event</h2>
          <form className="add-event-form">
            <label>What time is your event?</label>
            <p>My event starts at:</p>
            <input type="time" name="start_time" />
            <p>My event ends at:</p>
            <input type="time" name="end_time" />
            <label>Add an address:</label>
            <input type="text" />
            <label>Add a description:</label>
            <input type="text" />
          </form>

          <button onClick={this.handleAddCal}>Add to Calendar</button>
          <div>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        </div>
      </>
    );
  }
}
