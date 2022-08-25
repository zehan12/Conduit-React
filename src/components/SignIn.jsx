import React from "react";
import url from "../utils/constants"
import { Link } from "react-router-dom"



class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.email = React.createRef();
        this.password = React.createRef();
        this.state = {
            formErrors: [],
            errors: ""
        };
    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        const email = this.email.current.value;
        const password = this.password.current.value;
        // const formErrors = this.handleFormValidation(email, password);
        // if (formErrors.length > 0) {
        //     this.setState({ formErrors });
        //     return;
        // }

        fetch(url.login, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:
                {
                    "email": email,
                    "password": password
                }
            })
        }).then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (data.errors) {
                this.setState({ errors: data.errors })
            }

            if (response.status === 200 && response.ok && data.user.token) {
                localStorage.setItem("user_token", data.user.token);
                this.props.isLogIn(data.user);
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

    handleBlur = (e) => {
        console.log(this.email.current.value);
    };


    handleFormValidation = (email, password) => {
        const formErrors = [];

        if (email.length === 0) {
            formErrors.push("Empty email!");
        }

        if (password.length < 8) {
            formErrors.push("Make your password more than 8 charachters!");
        }

        return formErrors;
    };


    render() {
        const { formErrors } = this.state;
        console.log(this.props)
        return (
            <div style={{ width: "50%" }} className="text-center container" data-testid="mainDiv" >
                <h1 className="text-4xl my-2">Sign In</h1>
                <Link to="/signup" className="text-green-400">Need an account?</Link>

                <form onSubmit={this.handleFormSubmit}>
                    {/* {this.state.errors && <p className="text-red">{this.state.errors}</p>} */}
                    {formErrors.map(error => <p key={error}>{error}</p>)}
                    <input ref={this.email}
                        onBlur={this.handleBlur}
                        className="shadow appearance-none border 
                                         rounded w-full py-3 px-3 my-3
                                         text-gray-700 leading-tight 
                                         focus:outline-blue-300
                                          focus:shadow-outline"
                        type="text" placeholder="Email"
                    />
                    <input ref={this.password}
                        onBlur={(e) => this.handleBlur(e)}
                        className="shadow appearance-none border 
                                         rounded w-full py-3 px-3 my-3
                                         text-gray-700 leading-tight 
                                         focus:outline-blue-300
                                         focus:shadow-outline"
                        type="password" placeholder="Password"
                    />
                    <button className="relative left-48 my-2
                                            text-white bg-green-500
                                            py-2 px-4 rounded text-xl"
                    //  disabled={formErrors.length >= 1} 
                    >
                        Sign in
                    </button>
                </form>
            </div>
        )
    }
}

export default SignIn;