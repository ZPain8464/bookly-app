import React from "react";
import { Link } from "react-router-dom";

export default function WhyBookly() {
  return (
    <section className="why-section">
      <h2>Why use Bookly?</h2>
      <p>
        Bookly allows you to easily create and schedule events for your
        business, be it catering a wedding to spring cleaning an office space
        and more.
      </p>
      <p>
        Send email invitations to team members and add them to your team roster
        to get the job done faster — all from your phone or desktop.
      </p>
      <div>
        <button className="cta-button">
          <Link to="/login">Try Bookly Now</Link>
        </button>
      </div>
    </section>
  );
}
