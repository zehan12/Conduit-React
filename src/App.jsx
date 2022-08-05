import React from "react";
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ArticlePage from "./components/ArticlePage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogedIn: false,
      user: null
    }
  }

  componentDidMount() {
    console.log(this.getCurrentUser())
  }

  getCurrentUser = () => {
    // return JSON.parse(localStorage.getItem('user'));
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({ isLogedIn:true,
      user:{
        username: user.username,
        email: user.email,
        token: user.token
      }
    })
    console.log(user,"user in app")
  }

  isLogIn = (userInfo) => {
    this.setState(
      {
        isLogedIn: true,
        user:
            {
              username: userInfo.username,
              email: userInfo.email,
              token: userInfo.token
            }
      });
  }

  render() {
    return (
      <Router >
        <Header />
        <Switch>
          <Route exact path='/' children={<Home isLogedIn={this.state.isLogedIn} user={this.state.user} />} />
          <Route path="/signup" > <SignUp /> </Route>
          {/* <Route path="/signin" component={<SignIn />} />  */}
          <Route path="/signin" children={this.state.isLogedIn ? <Redirect to="/" /> : <SignIn isLogIn={this.isLogIn} />} />
          {/* /> </Route> */}
          <Route Path="/article/:slug" component={ArticlePage} />
          <ArticlePage />
          <Route path="*"> <h1 className="text-center m-10 text-6xl font-semibold"> Page not found </h1> </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;

