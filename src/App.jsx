import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ArticlePage from "./components/ArticlePage";
import url from "./utils/constants"
import NewPost from "./components/NewPost";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogedIn: false,
      user: null
    }
  }

  componentDidMount() {
    if ( !this.state.user && localStorage.getItem("user_token")) {
      this.getCurrentUser()
    }
  }

  getCurrentUser = async () => {
    const token = JSON.parse(localStorage.getItem('user_token'));
    let user = await this.isUserAuthorised(token)
    this.setState({
      isLogedIn: true,
      user: {
        username: user.username,
        email: user.email,
        image: user.image,
        token: user.token
      }
    })
    console.log(user, "user in app")
  }

  isUserAuthorised = async (token) => {
    let key = token;
    let res = await fetch(url.userVerify, {
      method: 'GET',
      headers: {
        authorization: `Token ${key}`
      }
    }
    )
    let data = await res.json()
    return data.user
  }

  isLogIn = (userInfo) => {
    this.setState(
      {
        isLogedIn: true,
        user:
        {
          username: userInfo.username,
          email: userInfo.email,
          image: userInfo.image,
          token: userInfo.token,
        }
      });
  }

  // ProtectedRoutes = ( { children, ...rest }) =>{
  //   return  (
  //     <Route { ...rest } render={()=>{
  //       return this.state.isLogedIn ? children : <Redirect to="/signin" /> 
  //     }} />
  //   )
  // }

  render() {
    return (
      <Router >
        <Header isLogedIn={this.state.isLogedIn} user={this.state.user} />
        <Switch>
          <Route exact path='/' children={<Home isLogedIn={this.state.isLogedIn} user={this.state.user} />} />
          <Route path="/signup" > <SignUp /> </Route>
          <Route path="/signin" children={this.state.isLogedIn ? <Redirect to="/" /> : <SignIn isLogIn={this.isLogIn} />} />
            <Route path="/settings"> "setting" </Route>
            <Route path="/editor"> <NewPost /> </Route>
            <Route path="/@profile">:profile:</Route>

          <Route Path="/article/:slug" component={ArticlePage} />
          <Route path="*"> <h1 className="text-center m-10 text-6xl font-semibold"> Page not found </h1> </Route>
        </Switch>
      </Router>
    )
  }
}





export default App;

