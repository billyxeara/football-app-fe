import React from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
    if (this.props.location.clubId) {
      axios
        .get(
          `http://api.football-data.org/v2/teams/${this.props.location.clubId}`,
          {
            headers: {
              "X-Auth-Token": "11b41dad4b1848968a2213d2e220c3d7"
            }
          }
        )
        .then(response => {
          this.setState({ data: response.data });
        });
    } else {
      this.props.history.push("/team");
    }
  };
  render() {
    let data = this.state.data;

    return (
      <>
        {this.state.data && (
          <>
            <Row>
              <Col lg={4}>
                <div>
                  <img src={data.crestUrl}></img>
                </div>
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
                      <th>Nationality</th>
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
                          <td>{data.nationality}</td>
                          <td>
                            <Link to={{ pathname: "/team", areaId: data }}>
                              <Button>
                                <FontAwesomeIcon icon={faSearch} />
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </>
    );
  }
}

export default clubProfile;
