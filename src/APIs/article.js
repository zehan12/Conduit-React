const { base, header } = require("../utils/constant")

const ArticleApi = {

    getAllArticle: async (limit = 10, offset = 0) => {
        return fetch(base + `/articles?limit=${limit}&offset=${offset}`,
            {
                method: "GET",
                headers: header()
            })
    },

    byPagination: async (offset = 0, limit = 10) => {
        return fetch(base + `/articles?limit=${limit}&offset=${offset}`,
            {
                method: "GET",
                headers: header()
            })
    },

    byTags: async (tags) => {
        return fetch(base + `/articles?offset=limit=10&tags=${tags}`)
    },

    byFeed: async () => {
        return fetch(base + "/articles/feed", {
            method: "GET",
            headers: header()
        })
    },

    byAuthor: async (author) => {
        return await fetch(base + `/articles?author=${author}`,
            {
                method: "GET",
                headers: header()
            })
    },
    ByFavorited: async (user) => {
        return await fetch(base + `/articles?favorited=${user}`,
            {
                method: "GET",
                headers: header()
            })
    },

    likeArticle: async (slug) => {
        return await fetch(base + `/articles/${slug}/favorite`,
            {
                method: "POST",
                headers: header()
            })
    },

    dislikeArticle: async (slug) => {
        return await fetch(base + `/articles/${slug}/favorite`,
            {
                method: "DELETE",
                headers: header()
            })
    },

    createArticle: async ( title, description, body, tagList ) => {
        const article = { title, description, body, tagList };
        return await fetch( base+`/articles`,
        {
            method:"POST",
            headers:header(),
            body: JSON.stringify( { article } )
        }
         )
    },

    updateArticle: async ( title, description, body, tagList, slug ) => {
        const article =  { title, description, body, tagList };
        return  await fetch( base+`/articles/${slug}`,{
            method:"PUT",
            headers:header(),
            body: JSON.stringify( {article} )
        } );
    },

    getSingleArticle: async ( slug ) =>{ 
        return  await fetch( base+`/articles/${slug}`, {
            method: "GET",
            headers: header()
        } );
    },

    deleteArticle: async ( slug ) => {
        return await fetch( base+`/articles/${slug}`,
        {
            method: "DELETE",
            headers: header()
        } );
    }

}

export default ArticleApi;