import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

class areaPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchArea();
  }

  fetchArea = () => {
    axios
      .get(`http://api.football-data.org/v2/areas/`, {
        headers: {
          "X-Auth-Token": "11b41dad4b1848968a2213d2e220c3d7"
        }
      })
      .then(response => {
        this.setState({ data: response.data.areas });
      });
  };

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Country Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(data => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.countryCode}</td>
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
    );
  }
}

export default areaPage;
