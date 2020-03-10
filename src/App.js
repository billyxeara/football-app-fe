import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AreaPage from "./pages/areaPage";
import TeamPage from "./pages/teamPage";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header"></header>

          <Switch>
            <Route path="/team" component={TeamPage}></Route>
            <Route path="/" component={AreaPage}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
