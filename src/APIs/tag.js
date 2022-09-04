const { base, header } = require("../utils/constant")

console.log(base,header())

const TagApi = {
    getAll: async() => {
       return fetch( `${base}/tags`, 
       {
        method:"GET",
        headers:header()
       });

    }
}

export default TagApi;