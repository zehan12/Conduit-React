import React from "react";

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

        const username = this.username.current.value;
        const password = this.password.current.value;
        const formErrors = this.handleFormValidation(username, password);

        if (formErrors.length > 0) {
            this.setState({ formErrors });
            return;
        }
    };

    handleFormValidation = (username, password) => {
        const formErrors = [];

        if (username.length === 0) {
            formErrors.push("Empty username!");
        }

        if (password.length < 8) {
            formErrors.push("Make your password more than 8 charachters!");
        }

        return formErrors;
    };


    render() {
        const { formErrors } = this.state;
        return (
            <div style={{ width: "50%" }} className="text-center container">
                <h1 className="text-4xl my-2">Sign In</h1>
                <p className="text-green-400">Need an account?</p>
                <form onSubmit={this.handleFormSubmit}>
                    {formErrors.map(error => <p key={error}>{error}</p>)}
                    <input ref={this.email}
                        className="shadow appearance-none border 
                                         rounded w-full py-3 px-3 my-3
                                         text-gray-700 leading-tight 
                                         focus:outline-blue-300
                                          focus:shadow-outline"
                        type="text" placeholder="Username"
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
                                            py-2 px-4 rounded text-xl">
                        Sign in
                    </button>
                </form>
            </div>
        )
    }
}

export default SignIn;