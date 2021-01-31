import React from "react";

export default function About() {
  return (
    <div className="about-section">
      <h1>About Bookly</h1>
      <p>
        Bookly is a scheduling and planning app <br /> that allows you to create
        your own events and invite team members to help you.
      </p>
      <h2>How it works:</h2>
      <ol className="about-ol">
        <li>Create a profile to get started</li>
        <li>Create your first event</li>
        <li>
          Add a team member by providing their first and last name and email
          (they can edit their profile later)
        </li>
        <li>
          Once they accept your invite and create a profile, you can add them to
          your events{" "}
        </li>
      </ol>
      <h3>A few nice to knows:</h3>
      <p>
        Only you can see team members added to your roster, and only you can see{" "}
        <br />
        which team members are on your events.
      </p>
      <p>
        In v1, each user gets one default team upon registering. The ability to
        create multiple teams <br />
        and assign team members to specific teams will come in the next
        iteration.
      </p>
    </div>
  );
}
