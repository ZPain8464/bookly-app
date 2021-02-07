import React from "react";
import TokenService from "../../Services/TokenService";
import { Link } from "react-router-dom";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from "../../Context/context";

export default class Nav extends React.Component {
  static contextType = Context;

  state = {
    show: false,
  };

  toggleMenu = () => {
    const currentState = this.state.show;
    this.setState({
      show: !currentState,
    });
  };

  handleLogout = (e) => {
    e.preventDefault();
    this.context.handleLogout(e);
    this.props.history.push("/");
  };

  render() {
    return (
      <nav>
        {!TokenService.hasAuthToken() ? (
          <>
            <div className="nav-home">
              <div className="nav-logo">
                <h1>
                  <Link to="/">
                    <span>
                      {" "}
                      <span>
                        <FontAwesomeIcon icon={faBlog} />
                      </span>{" "}
                    </span>{" "}
                    Bookly
                  </Link>
                </h1>
              </div>
              <div className="nav-links">
                <button
                  onClick={this.toggleMenu}
                  className="hamburger"
                  id="hamburger"
                >
                  <div className="bars" />
                  <div className="bars" />
                  <div className="bars" />
                </button>
                <ul
                  className={this.state.show ? "nav-ul show" : "nav-ul"}
                  id="nav-ul"
                >
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="nav-container">
            <div id="main-menu" className="dashboard-menu">
              <h1>
                <Link to="/dashboard">
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faBlog} />
                  </span>
                  Bookly
                </Link>
              </h1>
              <button
                onClick={this.toggleMenu}
                className="hamburger"
                id="hamburger"
              >
                <div className="bars" />
                <div className="bars" />
                <div className="bars" />
              </button>
              <ul
                className={this.state.show ? "nav-ul show" : "nav-ul"}
                id="nav-ul"
              >
                <li>
                  <h2>
                    <Link to="/dashboard">Home</Link>
                  </h2>
                </li>
                <li>
                  <h2>
                    <Link to="/calendar">Calendar</Link>
                  </h2>
                </li>

                <li>
                  <h2>
                    <Link to="/events">Events</Link>
                  </h2>
                </li>

                <li>
                  <h2>
                    <Link to="/tm-events">Team events</Link>
                  </h2>
                </li>

                <li>
                  <h2>
                    <Link to="/teams">Team</Link>
                  </h2>
                </li>
                <li>
                  <h2>
                    <button onClick={(e) => this.handleLogout(e)}>
                      <b>Log out</b>
                    </button>
                  </h2>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    );
  }
}
