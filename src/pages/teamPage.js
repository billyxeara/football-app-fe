import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class teamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchTeam();
  }

  fetchTeam = () => {
    if (this.props.location.areaId) {
      axios
        .get(
          `http://api.football-data.org/v2/teams?areas=${this.props.location.areaId.id}`,
          {
            headers: {
              "X-Auth-Token": "11b41dad4b1848968a2213d2e220c3d7"
            }
          }
        )
        .then(response => {
          this.setState({ data: response.data.teams });
        });
    } else {
      axios
        .get(`http://api.football-data.org/v2/teams`, {
          headers: {
            "X-Auth-Token": "11b41dad4b1848968a2213d2e220c3d7"
          }
        })
        .then(response => {
          this.setState({ data: response.data.teams });
        });
    }
  };

  render() {
    return (
      <>
        <div>
          <h1>
            Team on{" "}
            {this.props.location.areaId
              ? "area " + this.props.location.areaId.name
              : "all area"}
          </h1>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(data => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.address}</td>
                  <td>{data.phone}</td>
                  <td>{data.website}</td>
                  <td>{data.email}</td>
                  <td>
                    <Link to={{ pathname: "/club", clubId: data.id }}>
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
      </>
    );
  }
}

export default teamPage;
