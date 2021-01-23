import React from "react";
import ReactDOM from "react-dom";
import TeamMember from "./TeamMember";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <TeamMember />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
