import React from "react";
import { Link } from "react-router-dom";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";
import TokenServices from "../../Services/TokenService";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        {!TokenServices.hasAuthToken() ? (
          <>
            <div className="hero">
              <h2>Booking Made Easy</h2>
              <p>Schedule events and get the help you need.</p>
              <div className="login-cred">
                <p>
                  <b>Quick login w/ demo account:</b>
                </p>
                <ul>
                  <li>
                    <b>Email:</b> z.painter45@gmail.com
                  </li>
                  <li>
                    <b>Password:</b> Password#3
                  </li>
                </ul>
              </div>
              <div>
                <button>
                  <Link to="/login">Start Booking Now</Link>
                </button>
              </div>
            </div>
            <div className="hero cal-icon">
              <span className="hero-image">
                <FontAwesomeIcon className="hero-cal" icon={faCalendarCheck} />
              </span>
            </div>
          </>
        ) : (
          <>
            <Redirect to="/dashboard" />
          </>
        )}
      </header>
    );
  }
}
