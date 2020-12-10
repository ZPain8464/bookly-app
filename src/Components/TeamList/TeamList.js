import React from "react";
import DummyStore from "../../DummyStore/DummyStore";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

export default class TeamList extends React.Component {
  state = {
    show: false,
  };

  showModal = () => {
    this.setState({
      show: true,
    });
  };

  hideModal = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    const teamList = DummyStore.team;
    const teamMember = this.props.match.params.id
      ? DummyStore.team.find((t) => t.id === Number(this.props.match.params.id))
      : "";
    return (
      <aside className="team-sidebar">
        <ul>
          {teamList.map((team, i) => (
            <li key={i}>
              <div className="team-desktop">
                <Link to={`/teams/${team.id}`}>
                  <h3>{`${team.first_name} ${team.last_name}`}</h3>
                </Link>
              </div>
              <div className="view-modal">
                <Modal
                  teamMember={teamMember}
                  {...this.props}
                  show={this.state.show}
                  handleClose={this.hideModal}
                />
                <button onClick={this.showModal} className="view-modal-button">
                  <Link to={`/teams/${team.id}`}>
                    <h2>{`${team.first_name} ${team.last_name}`}</h2>
                  </Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
}
