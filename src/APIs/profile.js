const { base, header } = require("../utils/constant")

const ProfileApi = {

    followUser: async (username) => {
        return await fetch(base + `/profiles/${username}/follow`,
            {
                method: "POST",
                headers: header()
            })
    },

    unfollowUser: async ( username ) => {
        return await fetch(base + `/profiles/${username}/follow`,
            {
                method: "DELETE",
                headers: header()
            })
    },
    getProfile: async ( username ) => {
        return await fetch( base + `/profiles/${username}`,
        {
            method:"GET",
            headers:header()
        })
    }
}

export default ProfileApi;