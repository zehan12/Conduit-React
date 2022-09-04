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
        return await fetch();
    }
} 

export default UserApi;