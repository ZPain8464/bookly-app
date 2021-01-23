import React from "react";
import ReactDOM from "react-dom";
import Event from "./Event";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Event />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
