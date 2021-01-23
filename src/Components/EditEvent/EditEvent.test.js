import React from "react";
import ReactDOM from "react-dom";
import EditEvent from "./EditEvent";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <EditEvent />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
