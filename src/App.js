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
import AddEvent from "./Components/AddEvent/AddEvent";
import TokenService from "./Services/TokenService";

export default class App extends React.Component {
  state = {
    isLoggedIn: false,
    events: [],
  };

  createEvent = (event) => {
    console.log(event);
  };

  setUserEvents = (events) => {
    this.setState({
      events: events,
    });
  };

  handleLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  handleLogout = () => {
    TokenService.clearAuthToken();
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
            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <ProfileContactInfo
                  {...props}
                  {...this.state}
                  setUserEvents={this.setUserEvents}
                />
              )}
            />
          </section>
          <section className="main-events">
            <Route
              exact
              path={["/events", "/events/:id", "/add-event"]}
              render={(props) => <EventsList {...props} {...this.state} />}
            />
            <Route
              exact
              path={["/events", "/events/:id"]}
              render={(props) => <Event {...props} {...this.state} />}
            />
            <Route
              exact
              path="/add-event"
              render={(props) => (
                <AddEvent createEvet={this.createEvent} {...props} />
              )}
            />
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
            <Route
              exact
              path="/calendar"
              render={(props) => <CalendarView {...props} {...this.state} />}
            />
          </section>

          <Route exact path="/" component={Features} />
          <Route exact path="/" component={WhyBookly} />
          <Route path="/" component={Footer} />
        </main>
      </div>
    );
  }
}
