import React from "react";
import DummyStore from "../../DummyStore/DummyStore";

function Modal(props) {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";
  const id = Number(props.match.params.id);

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {props.match.url === `/events/${id}` ? (
          <>
            <h2>{props.event.name}</h2>
            <h3>{`${props.event.time_start} ${props.event.time_end}`}</h3>
            <h3>{props.event.location}</h3>
            <h3>{props.event.description}</h3>
            <div>
              <button>+ Event</button>
            </div>
          </>
        ) : (
          ""
        )}{" "}
        {props.match.url === `/teams/${id}` ? (
          <>
            <h2>{`${props.teamMember.first_name} ${props.teamMember.last_name}`}</h2>
            <img className="modal-photo" src={props.teamMember.profile_image} />
            <h3>Email: {props.teamMember.email}</h3>
            <h3>Phone Number: {props.teamMember.phone_number}</h3>
          </>
        ) : (
          ""
        )}
        <button className="close-button" onClick={props.handleClose}>
          Close
        </button>
      </section>
    </div>
  );
}

export default Modal;
