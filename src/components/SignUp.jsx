import React from "react";
import { Link, withRouter } from "react-router-dom";
import UserApi from "../APIs/user";
import { toast } from "react-toastify"

import url from "../utils/constants"

const Icon = () => {
    return <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
    </svg>
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef()
        this.state = {
            username: "",
            email: "",
            password: "",
            errors: "",
            isLoading: "",
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

    handelSubmit = async (event) => {
        event.preventDefault();
        if (this.state.isLoading) return
        try {
            this.setState({ isLoading: true });
            const res = await UserApi.createUser(
                this.state.username,
                this.state.email,
                this.state.password
            );
            const data = await res.json();

            if (res.status === 200 && res.ok) {
                toast.success("User Register Successfully");
                this.props.history.push("/signin");
            }
            if (data.errors) {
                let count = 0;
                for (const [key, value] of Object.entries(data.errors)) {
                    toast.error(key + " : " + value);
                    if (value === "is already taken.") {
                        count += 1;
                    }
                    if (count === 2) {
                        toast.warn("login here with your details");
                        return this.props.history.push("/signin");
                    }
                }
            }
            if (!res.ok) {
                toast.error(`${res.status}: ${res.statusText}`);
            }
            console.log("Result:", data)
        } catch (err) {
            toast.error(err)
        } finally {
            this.setState((prevState) => ({ ...prevState, isLoading: false }))
        }
        // fetch(url.register, {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         user:
        //         {
        //             "username": this.state.username,
        //             "email": this.state.email,
        //             "password": this.state.password
        //         }
        //     })
        // }).then(async response => {
        //     const isJson = response.headers.get('content-type')?.includes('application/json');
        //     const data = isJson && await response.json();
        //     // const errors =  Object.keys(data.errors);
        //     console.log(response);
        //     console.log(data, "data");

        //     if (data.errors) {
        //         let count = 0
        //         for (const [key, value] of Object.entries(data.errors)) {
        //             if (value === "is already taken") count += 1;
        //         }
        //         if (count === 2) {
        //             this.props.history.push("/signin")
        //             console.log("go to login")
        //         }
        //         console.log(count)
        //     }

        //     if (response.status === 200 && response.ok) {
        //         this.props.history.push("/signin")
        //         console.log("switch to login")
        //     }
        //     if (!response.ok) {
        //         const errors = (data && data.message) || response.status;
        //         return Promise.reject(errors);
        //     }
        // })
        //     .catch(error => {
        //         this.setState({ errorMessage: error.toString() });
        //         console.error('There was an error!', error);
        //     });
    };


    render() {
        let { username, email, password } = this.state.error;
        console.log(this.state.error)
        return (
            <div style={{ width: "50%" }} className="text-center container pt-20 mt-20">
                <h1 className="text-4xl my-2">Sign Up</h1>
                <div className="flex flex-col">
                    <Link to="signin" className="text-green-400">Have an account?</Link><br />
                    {
                        (username || email || password) ? <span
                            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" >
                            {username || email || password} </span>
                            : ""
                    }
                </div>
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
                    <p className="flex align-middle">
                        <svg
                            className="p-2"
                            class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        Please enter your details
                    </p>
                    <button disabled={this.state.isLoading}
                        className="relative left-48 my-2
                                            text-white bg-green-500
                                            py-2 px-4 rounded text-xl ">
                        {
                            this.state.isLoading ? (
                                <div className="flex align-bottom"> <Icon /> Loading...</div>
                            ) : "Sign Up"
                        }

                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(SignUp);