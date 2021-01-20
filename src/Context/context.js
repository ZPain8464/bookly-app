import React from "react";

const Context = React.createContext({
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
  setUser: () => {},
  setUserTeams: () => {},
  setUserTeamMembers: () => {},
  createEvent: () => {},
  updateEvent: () => {},
  deleteEvent: () => {},
  getTmsOnEvent: () => {},
  setUserEvents: () => {},
  updateProfile: () => {},
  handleLogout: () => {},
});

export default Context;