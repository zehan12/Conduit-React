import React from "react";
import Home from "./components/Home";
import SignUp from "./components/SignUp"


class App extends React.Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
      return [
        // <Home />
        <SignUp />
      ]
  }
}

export default App;

