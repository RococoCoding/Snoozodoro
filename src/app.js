import React from "react";
import Timer from "./components/timer"
import styled from "styled-components";

const PageContainer = styled.div`
  text-align:center;
`

class App extends React.Component {
  render() {
    return (
        <PageContainer>
          <header>
            <h1>Snoozodoro</h1>
          </header>
            <Timer />
        </PageContainer>
    )
  }
}

export default App;