import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Nav from "./Components/Nav/Nav";
import About from "./Components/About/About";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Header from "./Components/Header/Header";
import Features from "./Components/Features/Features";
import WhyBookly from "./Components/WhyBookly/WhyBookly";
import Footer from "./Components/Footer/Footer";
import ProfilePic from "./Components/ProfilePic/ProfilePic";
import ProfileContactInfo from "./Components/ProfileContactInfo/ProfileContactInfo";
import EventsList from "./Components/EventsList/EventsList";
import Event from "./Components/Event/Event";
import TeamList from "./Components/TeamList/TeamList";
import TeamMember from "./Components/TeamMember/TeamMember";
import CalendarView from "./Components/Calendar/Calendar";
// Cal events
// TokenService

export default class App extends React.Component {
  state = {
    isLoggedIn: false,
  };

  handleLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
    });
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={(props) => (
            <Nav {...props} {...this.state} handleLogout={this.handleLogout} />
          )}
        />

        <Route exact path="/" component={Header} />
        <Route exact path="/about" component={About} />
        <Route
          exact
          path="/login"
          render={(props) => (
            <Login {...props} handleLogin={this.handleLogin} />
          )}
        />

        <Route exact path="/register" component={Register} />
        <main>
          <section className="main-dashboard">
            <Route exact path="/dashboard" component={ProfilePic} />
            <Route exact path="/dashboard" component={ProfileContactInfo} />
          </section>
          <section className="main-events">
            <Route
              exact
              path={["/events", "/events/:id"]}
              component={EventsList}
            />
            <Route exact path={["/events", "/events/:id"]} component={Event} />
          </section>
          <section className="main-team">
            <Route exact path={["/teams", "/teams/:id"]} component={TeamList} />
            <Route
              exact
              path={["/teams", "/teams/:id"]}
              component={TeamMember}
            />
          </section>
          <section className="main-calendar">
            <Route exact path="/calendar" component={CalendarView} />
          </section>
          <Route exact path="/" component={Features} />
          <Route exact path="/" component={WhyBookly} />
          <Route path="/" component={Footer} />
        </main>
      </div>
    );
  }
}
