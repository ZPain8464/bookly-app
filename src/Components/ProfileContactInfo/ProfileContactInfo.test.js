import React from "react";
import ReactDOM from "react-dom";
import ProfileContactInfo from "./ProfileContactInfo";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ProfileContactInfo />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
