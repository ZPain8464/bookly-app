import React from "react";
import { Link } from "react-router-dom";

export default function WhyBookly() {
  return (
    <section className="why-section">
      <h3>Why use Bookly?</h3>
      <p>
        Bookly allows you to easily create and schedule events for your
        business, <br /> be it catering a wedding, booking models, or spring
        cleaning a client's office space. Need help to get the job done? <br />
        No problem. Bookly lets you send email invitations to team members and
        adds them to your team roster so you can invite them to upcoming events
        — all from your phone or desktop.
      </p>
      <div>
        <button className="cta-button">
          <Link to="/login">Try Bookly Now</Link>
        </button>
      </div>
    </section>
  );
}
