import React from "react";
import Timer from "./components/timer"
import {BrowserRouter as Router, Route} from "react-router-dom";
import Prefs from "./components/preferences";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <header>
            <h1>Snoozodoro</h1>
          </header>
          <Route exact path="/">
            <Timer />
          </Route>
          <Route path="/prefs">
              <Prefs />
          </Route>
        </div>
      </Router>
    )
  }
}

export default App;