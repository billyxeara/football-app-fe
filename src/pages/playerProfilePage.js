import React from "react";
import { Table, Modal } from "react-bootstrap";
import axios from "axios";

class clubProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
  }

  componentDidMount() {
    this.fetchClubProfile();
  }

  fetchClubProfile = () => {
    axios
      .get(`http://api.football-data.org/v2/players/${this.props.id}`, {
        headers: {
          "X-Auth-Token": "11b41dad4b1848968a2213d2e220c3d7"
        }
      })
      .then(response => {
        this.setState({ data: response.data });
      });
  };

  render() {
    let data = this.state.data;

    return (
      <>
        <Modal
          show={this.props.modalStatus}
          onHide={() => this.props.closeModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Player Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Table borderless>
              {data && (
                <tbody>
                  <tr>
                    <td>#</td>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <td>Birthdate</td>
                    <td>{data.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <td>Nationality</td>
                    <td>{data.nationality}</td>
                  </tr>
                  <tr>
                    <td>Position</td>
                    <td>{data.position}</td>
                  </tr>
                  <tr>
                    <td>Shirt number</td>
                    <td>{data.shirtNumber ? data.shirtNumber : "-"}</td>
                  </tr>
                </tbody>
              )}
            </Table>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default clubProfile;
