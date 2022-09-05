import React from "react";
import url from "../utils/constants"
import { Link } from "react-router-dom"
import UserApi from "../APIs/user";
import { toast } from "react-toastify";



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


    handleFormSubmit = async (e) => {
        e.preventDefault();
        const email = this.email.current.value;
        const password = this.password.current.value;
        try {
            this.setState({ isLoading: true });
            const res = await UserApi.loginUser(email, password);
            const isJson = await res.headers.get('content-type')?.includes('application/json')
            const data = isJson && await res.json();
            console.log(data)
            if (data.errors) {
                this.setState({ errors: data.errors })
                for (const [key, value] of Object.entries(data.errors)) {
                    toast.error( key +" : " + value )
                }
            }
            if ( res.status === 200 && res.ok && data.user.token ) {
            localStorage.setItem("user_token", data.user.token);
            toast.success(`User ${data.user.username} Loged in Successfully`);
            this.props.isLogIn(data.user);
            }
            if (!res.ok) {
                toast.error(`${res.status}: ${res.statusText}`);
            }
            console.log("Result:",data)

        } catch (error) {
            toast.error( error.toString() || 'There was an error!' )
        } finally {
            this.setState((prevState) => ({ ...prevState, isLoading: false  }))
        }

        // fetch(url.login, {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         user:
        //         {
        //             "email": email,
        //             "password": password
        //         }
        //     })
        // }).then(async response => {
        //     const isJson = response.headers.get('content-type')?.includes('application/json');
        //     const data = isJson && await response.json();

        //     if (data.errors) {
        //         this.setState({ errors: data.errors })
        //     }

        //     if (response.status === 200 && response.ok && data.user.token) {
        //         localStorage.setItem("user_token", data.user.token);
        //         this.props.isLogIn(data.user);
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
            <div style={{ width: "50%" }} className="text-center container mt-44" data-testid="mainDiv" >
                <h1 className="text-4xl my-2">Sign In</h1>
                <Link to="/signup" className="text-green-400 p-1">Need an account?</Link>
                {
                this.state.errors && Object.keys(this.state.errors).map((key, i) => (
                    <p key={i} className="mt-5 p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
                        {key}: {this.state.errors[key]}
                    </p>))
                }
                <form onSubmit={this.handleFormSubmit}>
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
                    <button className=" my-2 float-right
                                            text-white bg-green-500
                                            py-2 px-4 rounded text-xl"
                    //  disabled={formErrors.length >= 1} 
                    >
                         {/* {
                            this.state.isLoading ? (
                                <div className="flex align-bottom"> <Icon /> Loading...</div>
                         ) : */}
                        Sign in
                            {/* } */}
                    </button>
                </form>
            </div>
        )
    }
}

export default SignIn;