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
import TeamEventsList from "./Components/TeamEventsList/TeamEventsList";
import Event from "./Components/Event/Event";
import EditEvent from "./Components/EditEvent/EditEvent";
import TeamList from "./Components/TeamList/TeamList";
import TeamMember from "./Components/TeamMember/TeamMember";
import AddTeamMember from "./Components/AddTeamMember/AddTeamMember";
import InviteLandingPage from "./Components/InviteLandingPage/InviteLandingPage";
import CalendarView from "./Components/Calendar/Calendar";
import AddEvent from "./Components/AddEvent/AddEvent";
import TokenService from "./Services/TokenService";

export default class App extends React.Component {
  state = {
    events: [],
    tmsOnEvent: [],
    user: {
      user_id: "",
      email: "",
      firstName: "",
    },
    teams: [],
    teamMembers: [],
  };

  getTmsOnEvent = (tms) => {
    this.setState({
      tmsOnEvent: tms,
    });
  };

  setUser = (user) => {
    this.setState({
      user: {
        user_id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePic: user.profile_image,
        phoneNumber: user.phone_number,
      },
    });
  };

  createTeam = (newTeam) => {
    this.setState({
      teams: newTeam,
    });
  };

  setUserTeams = (teams) => {
    this.setState({
      teams: teams,
    });
  };

  // Gets team_members that are on your team roster
  setUserTeamMembers = (tmembers) => {
    this.setState({
      teamMembers: tmembers,
    });
  };

  createEvent = (event) => {
    this.setState({
      events: [...this.state.events, event],
    });
  };

  updateEvent = (updatedEvent) => {
    this.setState({
      events: this.state.events.map((e) =>
        e.id !== updatedEvent.id ? e : updatedEvent
      ),
    });
  };

  // Gets events created by you
  setUserEvents = (events) => {
    this.setState({
      events: events,
    });
  };

  handleLogout = () => {
    TokenService.clearAuthToken();
    this.setState({
      events: [],
      team: [],
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
            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <ProfileContactInfo
                  {...props}
                  {...this.state}
                  setUserEvents={this.setUserEvents}
                  setUser={this.setUser}
                  setUserTeams={this.setUserTeams}
                  setUserTeamMembers={this.setUserTeamMembers}
                />
              )}
            />
          </section>
          <section className="main-events">
            <Route
              exact
              path={["/events", "/events/:id", "/add-event"]}
              render={(props) => (
                <EventsList
                  getTmsOnEvent={this.getTmsOnEvent}
                  {...props}
                  {...this.state}
                />
              )}
            />
            <Route
              exact
              path={["/tm-events", "/tm-events/:id"]}
              render={(props) => <TeamEventsList {...props} {...this.state} />}
            />
            <Route
              exact
              path={["/events", "/events/:id", "/tm-events", "/tm-events/:id"]}
              render={(props) => <Event {...props} {...this.state} />}
            />
            <Route
              exact
              path="/add-event"
              render={(props) => (
                <AddEvent
                  {...this.state}
                  createEvent={this.createEvent}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/edit-event/:id"
              render={(props) => (
                <EditEvent {...props} updateEvent={this.updateEvent} />
              )}
            />
          </section>
          <section className="main-team">
            <Route
              exact
              path={["/teams", "/teams/team-member/:id"]}
              render={(props) => <TeamList {...props} {...this.state} />}
            />
            <Route
              exact
              path={["/teams", "/teams/team-member/:id"]}
              render={(props) => <TeamMember {...props} {...this.state} />}
            />
            <Route
              exact
              path="/add-team-member"
              render={(props) => <AddTeamMember {...props} {...this.state} />}
            />
            <Route
              exact
              path={["/invite-page", "/invite-page/:id"]}
              component={InviteLandingPage}
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
