import React from "react";
import { Link } from "react-router-dom"
 
class SignIn extends React.Component {
    constructor() {
        super();
        this.email = React.createRef();
        this.password = React.createRef();
        this.state = {
            formErrors: []
        };
    }


    handleFormSubmit = (e) => {
        e.preventDefault();

        // const email = this.email.current.value;
        // const password = this.password.current.value;
        // const formErrors = this.handleFormValidation(email, password);
        // if (formErrors.length > 0) {
        //     this.setState({ formErrors });
        //     return;
        // }
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

    handleChange = () => {
        
        const email = this.email.current.value;
        const password = this.password.current.value;
        const formErrors = this.handleFormValidation(email, password);
        if (formErrors.length > 0) {
            this.setState({ formErrors });
            return;
        }
    }

    render() {
        const { formErrors } = this.state;
        console.log(formErrors)
        return (
            <div style={{ width: "50%" }} className="text-center container">
                <h1 className="text-4xl my-2">Sign In</h1>
                <Link to="/signup" className="text-green-400">Need an account?</Link>
                <form onSubmit={this.handleFormSubmit}>
                    {formErrors.map(error => <p key={error}>{error}</p>)}
                    <input ref={this.email}
                        onChange={this.handleChange}
                        className="shadow appearance-none border 
                                         rounded w-full py-3 px-3 my-3
                                         text-gray-700 leading-tight 
                                         focus:outline-blue-300
                                          focus:shadow-outline"
                        type="text" placeholder="Email"
                    />
                    <input ref={this.password}
                        className="shadow appearance-none border 
                                         rounded w-full py-3 px-3 my-3
                                         text-gray-700 leading-tight 
                                         focus:outline-blue-300
                                         focus:shadow-outline"
                        type="password" placeholder="password"
                    />
                    <button className="relative left-48 my-2
                                            text-white bg-green-500
                                            py-2 px-4 rounded text-xl"
                                     disabled={formErrors.length >= 1} 
                            >
                        Sign in
                    </button>
                </form>
            </div>
        )
    }
}

export default SignIn;