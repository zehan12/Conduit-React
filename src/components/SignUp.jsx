import React from "react";
import { Link, withRouter } from "react-router-dom";
import url from "../utils/constants"

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef()
        this.state = {
            username: "",
            email: "",
            password: "",
            errors: "",
            error: {
                username: "",
                email: "",
                password: ""
            }
        };
    }


    componentDidMount() {
        this.ref.current.focus()
    }

    handelChange = ({ target }) => {
        let { name, value } = target;
        let error = this.state.error;
        switch (name) {
            case "username":
                error.username = value.trim().length !== 0 ? "" : "Username  not be empty"
                break;
            case "email":
                error.email = /\S+@\S+\.\S+/.test(value) ? "" : "Email is not valid";
                break;
            case "password":
                error.password = value.length > 4 && typeof value === 'string' ? "" : "Password is not less than 5 character";
                break;
            default:
                break;
        }
        this.setState({ [name]: value });
    }

    handelSubmit = (event) => {
        event.preventDefault();
        fetch(url.register, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:
                {
                    "username": this.state.username,
                    "email": this.state.email,
                    "password": this.state.password
                }
            })
        }).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            // const errors =  Object.keys(data.errors);
            console.log(response);
            console.log(data, "data");

            if (data.errors) {
                let count = 0
                for (const [key, value] of Object.entries(data.errors)) {
                    if (value === "is already taken") count += 1;
                }
                if (count === 2){
                    this.props.history.push("/signin")
                    console.log("go to login") 
                }
                console.log(count)
            }

            if (response.status === 200 && response.ok) {
                this.props.history.push("/signin")
                console.log("switch to login")
            }
            if (!response.ok) {
                const errors = (data && data.message) || response.status;
                return Promise.reject(errors);
            }
        })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    };


    render() {
        let { username, email, password } = this.state.error;
        console.log(this.props)
        return (
            <div style={{ width: "50%" }} className="text-center container">
                <h1 className="text-4xl my-2">Sign Up</h1>
                <Link to="signin" className="text-green-400">Have an account?</Link>
                {
                    this.state.errors &&
                    console.log(this.state.errors, "errors in jsx")
                }
                {
                    this.state.error && <span className="text-red-600" > {username || email || password} </span>
                }
                <form onSubmit={this.handelSubmit}>
                    <input ref={this.ref} name="username"
                        onChange={this.handelChange}
                        value={this.state.username}
                        className="shadow appearance-none border 
                                         rounded w-full py-3 px-3 my-3
                                         text-gray-700 leading-tight 
                                         focus:outline-blue-300
                                          focus:shadow-outline text-xl"
                        type="text" placeholder="Username"
                    />
                    <input name="email" value={this.state.email}
                        onChange={this.handelChange}
                        className="shadow appearance-none border 
                                         rounded w-full py-3 px-3 my-3
                                         text-gray-700 leading-tight 
                                         focus:outline-blue-300
                                         focus:shadow-outline text-xl"
                        type="email" placeholder="Email"
                    />
                    <input name="password" value={this.state.password}
                        onChange={this.handelChange}
                        className="shadow appearance-none border 
                                         rounded w-full py-3 px-3 my-3
                                         text-gray-700 leading-tight 
                                         focus:outline-blue-300
                                         focus:shadow-outline text-xl"
                        type="password" placeholder="Password"
                    />
                    <button className="relative left-48 my-2
                                            text-white bg-green-500
                                            py-2 px-4 rounded text-xl">
                        {/* <svg
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg> */}
                        Sign up
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(SignUp);