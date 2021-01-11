import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ScoreHistory from "./scores/pages/ScoreHistory";
import TodayScore from "./scores/pages/TodayScore";
import NavBar from "./shared/components/NavBar";
import { CssBaseline } from "@material-ui/core";
import UpdateScore from "./scores/pages/UpdateScore";

function App() {
  let routes;

  routes = (
    <Switch>
      <Route path="/" exact>
        <TodayScore />
      </Route>
      <Route path="/history">
        <ScoreHistory />
      </Route>
      <Route path="/update/:scoreId">
        <UpdateScore />
      </Route>
    </Switch>
  );

  return (
    <Router>
      <CssBaseline />
      <NavBar />
      {routes}
    </Router>
  );
}

export default App;
