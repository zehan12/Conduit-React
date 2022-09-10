const { base, header } = require("../utils/constant")

const CommentApi =  {
    getSingleArticleComment: async ( articleSlug ) => {
        return await fetch( `${base}/articles/${articleSlug}/comments`, {
            method:"GET",
            headers: header()
        } );
    },

    createComment: async ( body, articleSlug ) => {
        const comment = {body}
        return await fetch( `${base}/articles/${articleSlug}/comments`, {
            method: "POST",
            headers: header(),
            body: JSON.stringify({comment})
        } );
    },

    deleteComment: async ( articleSlug, id ) => {
        return await  fetch ( `${base}/articles/${articleSlug}/comments/${id}`,  {
            method: "DELETE",
            headers:header()
        } )
    }
}

export default CommentApi;
