const { base, header } = require("../utils/constant")

const ArticleApi = {
    byAuthor: async ( author ) => {
        return await fetch( base+`/articles?author=${author}`,
        {
            method: "GET",
            headers:header()
        } )
    },
    ByFavorited: async ( user ) => {
        return await fetch( base+`/articles?favorited=${user}`,
        {
            method: "GET",
            headers:header()
        } ) 
    },

}

export default ArticleApi;