import React from "react";
import PlayerProfilePage from "./playerProfilePage";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class clubProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      id: undefined,
      showModal: false
    };
  }

  componentDidMount() {
    this.fetchClubProfile();
  }

  fetchClubProfile = () => {
    axios
      .get(`http://api.football-data.org/v2/teams/${this.props.team.id}`, {
        headers: {
          "X-Auth-Token": "11b41dad4b1848968a2213d2e220c3d7"
        }
      })
      .then(response => {
        this.setState({ data: response.data });
      });
  };

  handleModal = action => {
    if (action.status === true) {
      this.setState({ id: action.id, showModal: action.status });
    } else {
      this.setState({ showModal: action });
    }
  };

  render() {
    let data = this.state.data;

    return (
      <>
        {data !== undefined ? (
          <>
            <Row>
              <Col lg={4}>
                <img alt={data.name} src={data.crestUrl}></img>
              </Col>
              <Col lg={8}>
                <h4>Name: {data.name}</h4>
                <h4>Address :{data.address}</h4>
                <h4>Phone:{data.phone}</h4>
                <h4>Website: {data.website}</h4>
                <h4>Email: {data.email}</h4>
                <h4>Founded: {data.founded}</h4>
              </Col>
            </Row>

            <Row>
              <Col>
                Squad:
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.squad.map(data => {
                      return (
                        <tr key={data.id}>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.position}</td>
                          <td>
                            <Button
                              onClick={() =>
                                this.handleModal({ status: true, id: data.id })
                              }
                            >
                              <FontAwesomeIcon icon={faSearch} />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        ) : (
          ""
        )}

        {this.state.showModal && (
          <PlayerProfilePage
            id={this.state.id}
            modalStatus={this.state.showModal}
            closeModal={this.handleModal}
          />
        )}
      </>
    );
  }
}

export default clubProfile;
