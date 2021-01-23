import React from "react";
import ReactDOM from "react-dom";
import EditProfile from "./EditProfile";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <EditProfile />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
