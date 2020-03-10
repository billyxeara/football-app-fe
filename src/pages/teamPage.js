import React from "react";
import { Table, Button } from "react-bootstrap";
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
    axios
      .get(
        `http://api.football-data.org/v2/teams?areas=${this.props.area.id}`,
        {
          headers: {
            "X-Auth-Token": "11b41dad4b1848968a2213d2e220c3d7"
          }
        }
      )
      .then(response => {
        this.setState({ data: response.data.teams });
      });
  };

  pushToStack = data => {
    this.props.pushToStack(data);
  };

  render() {
    return (
      <>
        <div>
          <h1>Team on {this.props.area && "area " + this.props.area.name}</h1>
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
                    <Button
                      onClick={() =>
                        this.pushToStack({ id: data.id, name: data.name })
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
      </>
    );
  }
}

export default teamPage;
