import React from "react";
import ReactDOM from "react-dom";
import ProfilePic from "./ProfilePic";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ProfilePic />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
