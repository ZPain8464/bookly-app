import React from "react";
import ReactDOM from "react-dom";
import AddTeamMember from "./AddTeamMember";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AddTeamMember />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
