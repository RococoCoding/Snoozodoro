import React from "react";
import Timer from "./components/timer"

class App extends React.Component {
  render() {
    return (
        <div>
          <header>
            <h1>Snoozodoro</h1>
          </header>
            <Timer />
        </div>
    )
  }
}

export default App;