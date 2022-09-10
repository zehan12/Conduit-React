const { base, header } = require("../utils/constant")

const UserApi = {
    createUser: async (username, email, password) => {
        const user = { username, email, password }
        return await fetch(base + "/users", {
            method: "POST",
            headers: header(),
            body: JSON.stringify({ user })
        })

    }, 

    loginUser: async ( email, password ) => {
        const user = { email, password }
        return await fetch( base + "/users/login", {
            method: "POST",
            headers: header(),
            body: JSON.stringify({ user })
        });
    },

    updateUser: async ( user ) => {
        console.log(user,"api")
        return await fetch( base + "/user", {
            method:"PUT",
            headers: header(),
            body: JSON.stringify({user})
        } )
    }
} 

export default UserApi;