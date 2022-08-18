import React from "react";
import { UserContext } from "./userContext";
import { withRouter } from "react-router-dom"

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            image: "",
            bio: "",
            errors:{

            }
        }
    }

    static contextType = UserContext;

    componentDidMount(){
        let { email, username, password, image, bio } = this.context.user
    }

    handleChange = ( { target } ) => {
        let { name,  value } = target;
        console.log( name, value );
    }

    handleSubmit = ( e ) => {
        e.preventDefault();
        console.log(this.state)
    }

    handleLogout = () => {
        console.log("click")
    }

    render() {
        console.log(this.context)
        let { email, username, password, image, bio } = this.state
        return (
            <div>
                <h1 className="text-4xl font-sans text-normal text-zinc-700">Your Settings</h1>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text" name="image" value={image} /> <br />
                    <input onChange={this.handleChange} type="text" name="username" value={username} /> <br />
                    <textarea onChange={this.handleChange} value={bio} name="bio" row="" col="4" /> <br />
                    <input onChange={this.handleChange} type="text" name="email" value={email} /> <br />
                    <input onChange={this.handleChange} type="password" name="password" value={password} /> <br />
                    <button type="submit">Update Settings</button>
                </form>
                <button onClick={ this.handleLogout }
                    className="border border-red-800 px-6 rounded
                     text-red-800 inline-block submit h-10
                     hover:bg-red-800 hover:text-white">
                    Or click here to logout
                </button>
            </div>
        )
    }
}

export default withRouter(Settings);