import React from "react";
import { UserContext } from "./userContext";
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import url from "../utils/constants"
import UserApi from "../APIs/user";

class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            username: "",
            password: "",
            image: "",
            bio: "",
            errors: {},
            message: ""
        }
    }

    static contextType = UserContext;

    componentDidMount() {
        let { email, username, image, bio } = this.context.user
        this.setState({ email, username, image, bio })
    }

    handleChange = ({ target }) => {
        let { name, value } = target;
        this.setState({ [name]: value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { updateUser } = this.props
            let { username, email, password, bio, image } = this.state;
            let userBody = { user: { username, email, bio, image } };
            if (password) userBody = { user: { username, email, password, bio, image } };
            console.log(userBody,
                
                "body")
            const res = await UserApi.updateUser( userBody )
            const data = await res.json()
            if (data.errors) {
                if (data.errors.message) {
                    this.setState({ message: data.errors.message })
                } else {
                    this.setState({ errors: data.errors })

                }
            }
            if (res.status === 200 && res.ok) {
                localStorage.clear();
                localStorage.setItem("user_token", data.user.token);
                updateUser(data.user)
                this.props.history.push("/");
            }
            if (!res.ok) {
            console.log(res,"er");
            }
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        console.log("render")
        console.log(this.context,this.props)
        let { email, username, password, image, bio } = this.state

        return (
            <div className="mx-auto p-7" style={{ width: "40%" }}>
                <h1 className="text-4xl font-sans text-normal text-center text-zinc-700">Your Settings</h1>
                {this.state.message && <h2 className="text-red-700 text-3xl">{this.state.message + " !!!"}</h2>}
                {Object.entries(this.state.errors)?.map((ele) => <h2 key={ele} className="text-red-700 text-3xl m-2">{ele.join(" : ")} </h2>)}
                <form onSubmit={this.handleSubmit}>
                    <input className="border py-4 w-full m-2 px-2 pl-2 h-10" onChange={this.handleChange} type="text" name="image" value={image} placeholder="URL of profile picture" /> <br />
                    <input className="border py-4 w-full m-2 px-2 pl-2 h-10" onChange={this.handleChange} type="text" name="username" value={username} placeholder="Username" /> <br />
                    <textarea className="border py-4 w-full m-2 px-2 pl-2 h-48" onChange={this.handleChange} value={bio} name="bio" row="" col="4" placeholder="Short bio about you" /> <br />
                    <input className="border py-4 w-full m-2 px-2 pl-2 h-10" onChange={this.handleChange} type="text" name="email" value={email} placeholder="Email" /> <br />
                    <input className="border py-4 w-full m-2 px-2 pl-2 h-10" onChange={this.handleChange} type="password" name="password" value={password} placeholder="New Password" /> <br />
                    <button className="text-right  my-2 px-6 rounded text-white h-10 bg-green-700 btn btn-small btn-secondary" type="submit">Update Settings</button>
                </form>
                <div className="border-black border-b-2 my-4"></div>
                <button onClick={this.props.handleLogout}
                    className="border border-red-800 px-6 rounded
                     text-red-800 inline-block submit h-10
                     hover:bg-red-800 hover:text-white">
                    Or click here to logout
                </button>
            </div>
        ) 
    }
}

Settings.propTypes = {
    updateUser: PropTypes.func,
    handleLogout: PropTypes.func

}

export default withRouter(Settings);