import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="hero">
          <h2>Booking Made Easy</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div>
            <button>
              <Link to="/login">Start Booking Now</Link>
            </button>
          </div>
        </div>
        <div className="hero">
          <span className="hero-image">Image</span>
        </div>
      </header>
    );
  }
}