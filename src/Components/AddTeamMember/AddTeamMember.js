import React from "react";
import config from "../../Config/config";
import TokenService from "../../Services/TokenService";

export default function AddTeamMember() {
  return (
    <>
      <div className="add-event-view">
        <h2>Add a Team Member</h2>
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
