import React from "react";
import { Route } from "react-router-dom";
import "./App.css";

import Context from "./Context/Context";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";

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
import EditProfile from "./Components/EditProfile/EditProfile";
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
      lastName: "",
      phoneNumber: "",
      profilePic: "",
    },
    teams: [],
    teamMembers: [],
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

  // Sets your team; v1 version each user gets one default team created as they register
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

  deleteEvent = (eventId) => {
    const newEvents = this.state.events.filter((eid) => eid.id !== eventId);
    this.setState({
      events: newEvents,
    });
  };

  // Gets team_members that have accepted event invite
  getTmsOnEvent = (tms) => {
    this.setState({
      tmsOnEvent: tms,
    });
  };

  // Merges events you create/d and events you're a team_member of
  setUserEvents = (events) => {
    this.setState({
      events: events,
    });
  };

  updateProfile = (uP) => {
    const fName = uP.first_name;
    const lName = uP.last_name;
    const pNum = uP.phone_number;
    const pPic = uP.profile_image;
    this.setState({
      user: {
        ...this.state.user.firstName,
        firstName: fName,
        ...this.state.user.lastName,
        lastName: lName,
        ...this.state.user.phoneNumber,
        phoneNumber: pNum,
        ...this.state.user.profilePic,
        profilePic: pPic,
      },
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
    const contextValue = {
      events: this.state.events,
      tmsOnEvent: this.state.tmsOnEvent,
      user: this.state.user,
      teams: this.state.teams,
      teamMembers: this.state.teamMembers,
      setUser: this.setUser,
      setUserTeams: this.setUserTeams,
      setUserTeamMembers: this.setUserTeamMembers,
      createEvent: this.createEvent,
      updateEvent: this.updateEvent,
      deleteEvent: this.deleteEvent,
      getTmsOnEvent: this.getTmsOnEvent,
      setUserEvents: this.setUserEvents,
      updateProfile: this.updateProfile,
      handleLogout: this.handleLogout,
    };
    return (
      <Context.Provider value={contextValue}>
        <ErrorBoundary>
          <div className="App">
            <Route path="/" component={Nav} />

            <Route exact path="/" component={Header} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/register" component={Register} />
            <main>
              <section className="main-dashboard">
                <Route
                  exact
                  path="/dashboard"
                  render={(props) => <ProfilePic {...props} {...this.state} />}
                />

                <Route exact path="/dashboard" component={ProfileContactInfo} />
                <Route exact path="/edit-profile" component={EditProfile} />
              </section>
              <section className="main-events">
                <Route
                  exact
                  path={["/events", "/events/:id", "/add-event"]}
                  component={EventsList}
                />
                <Route
                  exact
                  path={["/tm-events", "/tm-events/:id"]}
                  component={TeamEventsList}
                />
                <Route
                  exact
                  path={[
                    "/events",
                    "/events/:id",
                    "/tm-events",
                    "/tm-events/:id",
                  ]}
                  component={Event}
                />
                <Route exact path="/add-event" component={AddEvent} />
                <Route exact path="/edit-event/:id" component={EditEvent} />
              </section>
              <section className="main-team">
                <Route
                  exact
                  path={["/teams", "/teams/team-member/:id"]}
                  component={TeamList}
                />
                <Route
                  exact
                  path={["/teams", "/teams/team-member/:id"]}
                  component={TeamMember}
                />
                <Route
                  exact
                  path="/add-team-member"
                  component={AddTeamMember}
                />
                <Route
                  exact
                  path={["/invite-page", "/invite-page/:id"]}
                  component={InviteLandingPage}
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
        </ErrorBoundary>
      </Context.Provider>
    );
  }
}
