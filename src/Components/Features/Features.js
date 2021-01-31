import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Features() {
  return (
    <React.Fragment>
      <section className="features">
        <div className="feature-1">
          <span>
            <FontAwesomeIcon className="feature-icon" icon={faCalendarAlt} />
          </span>
          <p>Create and schedule your own events</p>
        </div>
        <div className="feature-2">
          <span>
            <FontAwesomeIcon className="feature-icon" icon={faUserPlus} />
          </span>
          <p>Add team members, or join other teams</p>
        </div>
        <div className="feature-3">
          <span>
            <FontAwesomeIcon className="feature-icon" icon={faPaperPlane} />
          </span>
          <p>Invite your team to events via email</p>
        </div>
      </section>
    </React.Fragment>
  );
}
