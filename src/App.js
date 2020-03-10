import React from "react";
import { Container, Button } from "react-bootstrap";
import AreaPage from "./pages/areaPage";
import TeamPage from "./pages/teamPage";
import ClubProfilePage from "./pages/clubProfilePage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageStack: []
    };
  }

  pushToStack = x => {
    let currentStack = [...this.state.pageStack];

    currentStack.push(x);
    this.setState({ pageStack: currentStack });
  };

  popFromStack = () => {
    let currentStack = [...this.state.pageStack];

    currentStack.pop();
    this.setState({ pageStack: currentStack });
  };

  render() {
    let pageStack = this.state.pageStack;
    return (
      <Container>
        {pageStack.length > 0 ? (
          <Button onClick={this.popFromStack}>Back</Button>
        ) : (
          ""
        )}
        {pageStack.length === 0 ? (
          <AreaPage pushToStack={this.pushToStack} />
        ) : pageStack.length === 1 ? (
          <TeamPage area={pageStack[0]} pushToStack={this.pushToStack} />
        ) : pageStack.length === 2 ? (
          <ClubProfilePage team={pageStack[1]} />
        ) : (
          ""
        )}
      </Container>
    );
  }
}

export default App;
