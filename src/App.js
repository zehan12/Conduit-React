import React from "react";
import Home from "./components/Home";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
      return [
        <Home />
      ]
  }
}

export default App;

