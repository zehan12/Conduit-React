import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ArticlePage from "./components/ArticlePage";
import url from "./utils/constants"
import NewPost from "./components/NewPost";
import ErrorBoundary from "./components/ErrorBoundary";
import { UserProvider } from "./components/userContext";
import Settings from "./components/Settings";
import Profile from "./components/Profile";


const ProtectedRoutes = ({ isAuth, children, ...rest }) => {
  return (
    <Route {...rest} render={() => {
      return isAuth ? children : <Redirect to="/signin" />
    }} />
  )
}

class App extends React.Component {
  state = {
    isLogedIn: false,
    user: null,
    isLoading: true
  }

  componentDidMount() {
    // console.log("iside CMD", this.state.user, localStorage.getItem("user_token"))
    console.log("componentDidMount")

    if (!this.state.user && localStorage.getItem("user_token")) {
      // console.log("is calling")
      this.getCurrentUser()
    } else {
      this.setState({ isLoading: false })
    }
  }

  // static getDerivedStateFromProps(props, state) { console.log("getDerivedStateFromProps") }
  // shouldComponentUpdate() { console.log("shouldComponentUpdate") }
  // componentDidUpdate() { console.log("componentDidUpdate") }
  // getSnapshotBeforeUpdate() { console.log("getSnapshotBeforeUpdate") }
  // componentWillUnmount() { console.log("componentWillUnmount") }
  // static getDerivedStateFromError() { console.log("getDerivedStateFromError") }
  // componentDidCatch() { console.log("componentDidCatch") }


  getCurrentUser = async () => {
    try {
      const token = localStorage.getItem('user_token');
      // console.log(token, "token")
      let user = await this.isUserAuthorised(token)
      // console.log(user)
      this.setState({
        isLogedIn: true,
        isLoading: false,
        user: {
          username: user.username,
          email: user.email,
          image: user.image,
          bio: user.bio,
          token: user.token
        }
      })
      // console.log(user, "user in app")
    } catch (err) {
      this.setState({ isLoading: false })
      console.log(err, "err")
    }
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
        isLoading: false,
        user:
        {
          username: userInfo.username,
          email: userInfo.email,
          image: userInfo.image,
          bio: userInfo.bio,
          token: userInfo.token,
        }
      });
  }

  updateUser = (user) => {
    // console.log(user, "updateUSER")
    this.setState({
      user:
      {
        username: user.username,
        email: user.email,
        image: user.image,
        bio: user.bio,
        token: user.token
      }
    })
  }

  handleLogout = () => {
    // console.log("OH ON MY Token", localStorage['user_token'])
    localStorage.removeItem('user_token');
    this.setState({
      isLogedIn: false,
      user: null
    })
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading ...</h1>
    }
    // const { location  } = this.props
    return (

      <Router >
        <ErrorBoundary>
          <Header isLogedIn={this.state.isLogedIn} user={this.state.user} />
        </ErrorBoundary>

        <ErrorBoundary>
          <UserProvider value={this.state} >
            <Switch>

              <Route exact path='/' children={<Home isLogedIn={this.state.isLogedIn} user={this.state.user} />} />
              <Route path="/article/:slug" component={ArticlePage} />

              <Route path="/signup" > <SignUp /> </Route>
              <Route path="/signin" children={this.state.isLogedIn ? <Redirect to="/" /> : <SignIn isLogIn={this.isLogIn} />} />



              <ProtectedRoutes isAuth={this.state.isLogedIn} path="/settings"> <Settings updateUser={this.updateUser} handleLogout={this.handleLogout} /> </ProtectedRoutes>
              <ProtectedRoutes isAuth={this.state.isLogedIn} path="/editor"> <NewPost /> </ProtectedRoutes>
              {/* <ProtectedRoutes isAuth={this.state.isLogedIn} path={location.pathname} exact > <Profile /> </ProtectedRoutes> */}

              <Route path="/profile/:username" exact > <Profile /> </Route>
              <Route path="/profile/:username/favorites" exact > <Profile /> </Route>
              <Route path="*" children={<h1 className="text-center m-10 text-6xl font-semibold"> Page not found </h1>} />

            </Switch>
          </UserProvider>
        </ErrorBoundary>

      </Router>
    )
  }
}





export default withRouter(App);

