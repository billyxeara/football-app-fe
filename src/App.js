import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import AreaPage from "./pages/areaPage";
import TeamPage from "./pages/teamPage";
import ClubProfilePage from "./pages/clubProfilePage";

class App extends React.Component {
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route path="/team" component={TeamPage}></Route>
            <Route path="/club" component={ClubProfilePage}></Route>
            <Route path="/" component={AreaPage}></Route>
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
