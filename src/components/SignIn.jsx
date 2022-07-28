import React from "react";

class SignIn extends React.Component {
    constructor(  ) {
        super();
        this.state = {

        };
    }

    render(){
        return(
            <div style={{width:"50%"}} className="text-center container">
                <h1>Sign Up</h1>
                <p className="text-green-400">Need an account?</p>
                <form>           
                        <input className="shadow appearance-none border 
                                         rounded w-full py-3 px-3 my-3
                                         text-gray-700 leading-tight 
                                         focus:outline-blue-300
                                          focus:shadow-outline" 
                                type="text" placeholder="Username"
                        />
                        <input className="shadow appearance-none border 
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