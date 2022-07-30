import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ArticlePage from "./components/ArticlePage";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render() {
      return (
        // <Home />
        // <SignUp />
        <Router>
          <Header />

          <Switch>

            <Route path="/signup" > <SignUp /> </Route>
            <Route path="/signin" > <SignIn /> </Route>
            {/* <Route Path="/article" > <ArticlePage /> </Route> */}
            <Route path="/" > <Home /> </Route>

          </Switch>

        </Router>
      )
  }
}

export default App;

